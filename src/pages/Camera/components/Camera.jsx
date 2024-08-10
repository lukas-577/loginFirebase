import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user'
}

const Camera = () => {
  const webcamRef = useRef(null);
  const [screenshot, setScreenshot] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setScreenshot(imageSrc);
  }, [webcamRef]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1980}
        videoConstraints={{videoConstraints}}
      />
      <button onClick={capture} className="bg-blue-500 text-white p-3 rounded-lg shadow-lg">Toma la foto</button>
      {screenshot && <img src={screenshot} alt="Screenshot" />}
    </div>
  );
};

export default Camera;