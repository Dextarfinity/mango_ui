import { useState } from 'react';

export const useCamera = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [stream, setStream] = useState(null);

  const requestPermission = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      setHasPermission(true);
      return mediaStream;
    } catch (error) {
      console.error('Camera access denied:', error);
      setHasPermission(false);
      return null;
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  return {
    hasPermission,
    stream,
    requestPermission,
    stopCamera
  };
};
