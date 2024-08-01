import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import CameraCaptureIcon from "@mui/icons-material/Camera";
import DeleteIcon from "@mui/icons-material/Delete";
const CameraComponent = ({ onClose, onCapture }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    onCapture(imageSrc); // Pass captured image to parent component
    onClose();
  };

  // const handleConfirm = () => {
  //   onClose(); // Close camera component
  // };

  const handleDelete = () => {
    setImgSrc(null); // Delete captured image
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: "user", // 'user' for front camera, 'environment' for rear camera
        }}
      />
      <div>
        <button
          className="absolute bottom-5 right-2 z-50 bg-white  rounded-full w-fit h-fit"
          onClick={capture}
        >
          <CameraCaptureIcon />
        </button>
        {imgSrc && (
          <div>
            {/* <h2>Preview:</h2> */}
            <img src={imgSrc} alt="captured" />
            {/* <button onClick={handleConfirm}>Confirm</button> */}
            <button onClick={handleDelete}>
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraComponent;
