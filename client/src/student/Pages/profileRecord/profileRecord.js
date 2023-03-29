import React, { useState, useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { decodeToken } from "react-jwt";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileRecord = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currLocation = location.pathname;

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [message, setMessage] = useState();
  const [isShowVideo, setIsShowVideo] = useState(false);

  const clickHandler = () => {
    setIsShowVideo(!isShowVideo);
    setMessage();
  };

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, setIsShowVideo]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [webcamRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const handleUpload = async (e) => {
    setMessage("Uploading.....");
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const formdata = new FormData();
        formdata.append("file", blob, `${user.name}-${user.id}.webm`);
        formdata.append("id", user.id);
        const response = await fetch("http://localhost:9002/api/upload", {
          method: "POST",
          body: formdata,
        });
        const user_data = await response.json();
        setMessage("Your video profile is uploaded");
        console.log(user_data);
      }
    } else {
      console.log("Token not found!");
      navigate("/student/login", { state: { from: currLocation } });
    }
    setRecordedChunks([]);
  };
  return (
    <main>
      <div>
        {isShowVideo ? (
          <section>
            <Webcam
              audio={true}
              ref={webcamRef}
              mirrored={true}
              className="record-window"
            />
            {capturing ? (
              <button onClick={handleStopCaptureClick}>Stop Capture</button>
            ) : (
              <button onClick={handleStartCaptureClick}>Start Capture</button>
            )}
          </section>
        ) : (
          <div className="record-window"></div>
        )}
        <button onClick={clickHandler}>
          {isShowVideo ? `Turn off camera` : `Turn on camera`}
        </button>
      </div>
      {capturing ? <p>Recording...</p> : <p></p>}
      {recordedChunks.length > 0 && (
        <div>
          <button onClick={handleDownload}>Download</button>
          <form onSubmit={handleUpload} encType="multipart/formadata">
            <button>Upload</button>
          </form>
        </div>
      )}
      <p>{message}</p>
    </main>
  );
};

export default ProfileRecord;
