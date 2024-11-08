import store from "@/store";
import * as wss from "./wss"
import Peer from "simple-peer"
import { setMessages, setShowOverlay } from "@/store/meetSlice";
import { fetchTURNCredentials, getTurnIceServers } from "./turn";


const defaultConstraints = {
    audio: true,
    video: true,
}

const onlyAudioConstraints = {
    audio: true,
    video: false
}

let localStream: any;
let streams: any[] = [];

export const getLocalPreviewAndInitRoomConnection = async (
    isRoomHost: boolean,
    identity: string,
    roomId: null | string = null,
    onlyAudio: boolean
) =>{
    await fetchTURNCredentials();
    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints).then(stream => {
            console.log("Received local stream successfully");
            localStream = stream;
            showLocalVideoPreview(localStream);
            store.dispatch(setShowOverlay(false));
            isRoomHost ? wss.createNewRoom(identity, onlyAudio) : wss.joinRoom(identity, roomId as string, onlyAudio);
        }).catch((error: any) => {
            console.error("Error occurred when trying to get access to local stream:", error);
        });
    } else {
        console.error("navigator.mediaDevices.getUserMedia is not supported or undefined");
    }
}



let peers: any = {};

const getConfiguration = () =>{
    const turnIceServers = getTurnIceServers();

    if(turnIceServers){
        console.log("Turn server credentila fetched..........>", turnIceServers);
        return {
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302'
                },
                ...turnIceServers
            ]
        }
    }else{
        console.warn("Using only stun server")
        return {
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302'
                }
            ]
        }
    }
}

const messngerChannel = "messenger"

export const prepareNewPeerConnection = (connUserSocketId: any, isInitiator: boolean) => {
    try {
        if (!localStream) {
            console.error("localStream is not initialized!");
            return;
        }

        console.log("prepareNewPeerConnection function", connUserSocketId, isInitiator);

        if (window.RTCPeerConnection && window.crypto && (window.crypto as any).getRandomValues) {
            // WebRTC and secure random numbers are supported
        } else {
            console.error("Your browser does not support WebRTC or secure random number generation.");
        }
        

        const configuration = getConfiguration();

        // Initialize the Peer object
        peers[connUserSocketId] = new Peer({
            initiator: isInitiator,
            config: configuration,
            stream: localStream,
            channelName: messngerChannel
        });

        
        peers[connUserSocketId].on("signal", (data: any) => {
            const signalData = {
                signal: data,
                connUserSocketId: connUserSocketId
            };
            wss.signalPeerData(signalData);
        });

        peers[connUserSocketId].on("stream", (stream: any) => {
            console.log("new stream received");
            
            addStream(stream, connUserSocketId);
            streams.push(stream);
        });

        peers[connUserSocketId].on("data", (data: any)=>{
            const messageData = JSON.parse(data)
            appendNewMessage(messageData)
        })
    } catch (error) {
        console.error("Error creating Peer object:", error);
    }
};


export const handleSignalingDatam = ( data: any) =>{
    //add signaling data to peer connection
    console.log("Received signaling data", data);
    peers[data.connUserSocketId]?.signal(data.signal)
    console.log("added signaling data to peer connection...........")
}

export const removePeerConnection = (data: any) =>{
    const {socketId} = data;
    const videoContainer = document.getElementById(socketId);
    const videoElement = document.getElementById(`${socketId}-video`) as HTMLVideoElement;

    if(videoContainer && videoElement && videoElement.srcObject){
        const tracks = (videoElement.srcObject as MediaStream).getTracks();

        tracks.forEach(t => t.stop());

        videoElement.srcObject = null;
        videoContainer.removeChild(videoElement);

        videoContainer.parentNode?.removeChild(videoContainer);

        if(peers[socketId]){
            peers[socketId].destroy();
        }
        delete peers[socketId]
    }
}

//////////////////////////////handling UI here///////////////////
const showLocalVideoPreview = (stream: any) =>{
    const videosContainer = document.getElementById("videos_portal");
    videosContainer?.classList.add("videos_portal_styles");

    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video_track_container");
    const videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.srcObject = stream;

   // Check if the stream is a screen share or a camera feed
   const isScreenSharingStream = stream.getVideoTracks()[0]?.getSettings()?.displaySurface !== undefined;

   // Apply the transform to flip the camera video horizontally, but not the screen sharing
   if (!isScreenSharingStream) {
     videoElement.style.transform = "scaleX(-1)"; // Flips the video horizontally
   }

    videoElement.onloadedmetadata = () =>{
        videoElement.play()
    };

    videoContainer.appendChild(videoElement);

    const {connectOnlyWithAudio} = store.getState().meet
    if(connectOnlyWithAudio){
        videoContainer.appendChild(getAudioOnlyLabel("You"))
    }
    videosContainer?.appendChild(videoContainer);
}

const addStream = (stream: any, connectedUserSocketId: string) =>{
    //display incoming stream
    const videosContainer = document.getElementById("videos_portal");
    const videoContainer = document.createElement("div");
    videoContainer.id = connectedUserSocketId;

    videoContainer.classList.add("video_track_container");
    const videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.srcObject = stream;
    videoElement.id = `${connectedUserSocketId}-video`

   // Check if the stream is a screen share or a camera feed
  const isScreenSharingStream = stream.getVideoTracks()[0]?.getSettings()?.displaySurface !== undefined;

  // Apply the transform to flip the camera video horizontally, but not the screen sharing
  if (!isScreenSharingStream) {
    videoElement.style.transform = "scaleX(-1)"; // Flips the video horizontally
  }

   videoElement.addEventListener("click", () =>{
    if(videoElement.classList.contains("full_screen")){
        videoElement.classList.remove("full_screen");
    }else{
        videoElement.classList.add("full_screen");
    }
   })

   videoElement.onloadedmetadata = () =>{
       videoElement.play()
   };

   videoContainer.appendChild(videoElement);

   //check if the user connected only with audio
   const {participants} = store.getState().meet;
   const participant = participants.find((p: any) => p.socketId === connectedUserSocketId);

   if(participant?.onlyAudio){
    videoContainer.appendChild(getAudioOnlyLabel(participant.identity));
   }else{
    videoContainer.style.position = "static"
   }
   videosContainer?.appendChild(videoContainer);
}

const getAudioOnlyLabel = (identity = "") =>{
    const labelContainer = document.createElement("div");
    labelContainer.classList.add("label_only_audio_container");

    const label = document.createElement("p");
    label.classList.add("label_only_text_audio");
    label.innerHTML = `Only Audio ${identity}`;

    labelContainer.appendChild(label);
    return labelContainer;
}


//////////////////////////////Buttons logic///////////////////

export const toggleMic = (isMuted: boolean) =>{
    localStream.getAudioTracks()[0].enabled = isMuted ? true : false;
}

export const toggleCamera = (isDisbled: boolean) =>{
    localStream.getVideoTracks()[0].enabled = isDisbled ? true : false;
}

export const toggleScreenShare = (isScreenSharingActive: boolean, screenSharingStream: any = null) =>{
    if(isScreenSharingActive){
        switchVideoTracks(localStream)
    }else{
        switchVideoTracks(screenSharingStream)
    }
}

export const switchVideoTracks = (stream: any) =>{
    for(let socket_id in peers){
        for(let index in peers[socket_id].streams[0].getTracks()){
            for(let index2 in stream.getTracks()){
                if(peers[socket_id].streams[0].getTracks()[index].kind === stream.getTracks()[index2].kind){
                    peers[socket_id].replaceTrack(
                        peers[socket_id].streams[0].getTracks()[index],
                        stream.getTracks()[index2],
                        peers[socket_id].streams[0]
                    ); 
                    break;
                }
            }
        }
    }
}


////////////////////////// Messages //////////////////////////////////
const appendNewMessage = (messageData: any) =>{
    const {messages = []} = store.getState().meet
    console.log("----------------", messages)
    store.dispatch(setMessages([...messages, messageData]))
}

export const sendMessageUsingDataSignal = (messageConent: string) =>{
    //append this message locally
    const {identity} = store.getState().meet;

    const localMessageData = {
        content: messageConent,
        identity,
        messageCreatedByMe: true
    }
    appendNewMessage(localMessageData);

    const messageData = {
        content: messageConent,
        identity
    }
    const stringifiedMessageData = JSON.stringify(messageData)

    for(let socketId in peers){
        peers[socketId].send(stringifiedMessageData);
    }
}