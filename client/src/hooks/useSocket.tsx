import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_CHAT_URL

const useSocket = () => {
  const socketRef = useRef<Socket | null>(null); 

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket'],
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const emitEvent = (event: string, data?: any) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  };

  const onEvent = (event: string, callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  };

  const offEvent = (event: string, callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.off(event, callback);
    }
  };

  return { emitEvent, onEvent, offEvent };
};

export default useSocket;


// import { useEffect, useRef } from 'react';
// import { io, Socket } from 'socket.io-client';

// const SOCKET_URL = import.meta.env.VITE_CHAT_URL;

// const useSocket = (namespace: string) => {
//   const socketRef = useRef<Socket | null>(null); 

//   useEffect(() => {
//     socketRef.current = io(`${SOCKET_URL}/${namespace}`, {
//       transports: ['websocket'],
//     });

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, [namespace]);

//   const emitEvent = (event: string, data?: any) => {
//     if (socketRef.current) {
//       socketRef.current.emit(event, data);
//     }
//   };

//   const onEvent = (event: string, callback: (data: any) => void) => {
//     if (socketRef.current) {
//       socketRef.current.on(event, callback);
//     }
//   };

//   const offEvent = (event: string, callback: (data: any) => void) => {
//     if (socketRef.current) {
//       socketRef.current.off(event, callback);
//     }
//   };

//   return { emitEvent, onEvent, offEvent };
// };

// export default useSocket;
