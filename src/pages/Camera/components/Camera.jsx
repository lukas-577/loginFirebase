import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const Camera = () => {
  const webcamRef = useRef(null);
  const [screenshot, setScreenshot] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setScreenshot(imageSrc);
  }, [webcamRef]);

  return (
    <div>
      <h2>Camara</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: 'user',
        }}
      />
      <button onClick={capture}>Toma la foto</button>
      {screenshot && <img src={screenshot} alt="Screenshot" />}
    </div>
  );
};

export default Camera;