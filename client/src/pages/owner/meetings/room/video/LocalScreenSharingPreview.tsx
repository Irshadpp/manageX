import React, { useEffect, useRef } from 'react';

const LocalScreenSharingPreview = ({ stream }: { stream: MediaStream }) => {
  const localPreviewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = localPreviewRef.current;
    if (video) {
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play();
      };
    }
  }, [stream]);

  return (
    <div className="local_screen_share_preview">
      <video
        muted
        autoPlay
        ref={localPreviewRef}
        className="w-full h-full object-cover"
        style={{
          transform: 'none',
        }}
      ></video>
    </div>
  );
};

export default LocalScreenSharingPreview;
