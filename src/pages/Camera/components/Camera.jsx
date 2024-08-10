import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user'
}

const Camera = ({ onCapture }) => {
  const webcamRef = useRef(null);

    const capturePhoto = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc);
    }, [onCapture]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1980}
        videoConstraints={{videoConstraints}}
      />
      <button onClick={capturePhoto} className="bg-blue-500 text-white p-3 rounded-lg shadow-lg">Toma la foto</button>
    </div>
  );
};

export default Camera;