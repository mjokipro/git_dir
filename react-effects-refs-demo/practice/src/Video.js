import React, { useState, useRef, useEffect } from "react";

function Video({
  src = "https://media.giphy.com/media/KctGIT2JHvVRC7ESeR/giphy.mp4"
}) {
  const video = useRef();
  const [speed, setSpeed] = useState(1);

  useEffect(function adjustPlaybackRateOnVideo() {
    // video.current is the video HTML Element
    // video elements have a .playbackRate
    // that allow you to speed up / slow down a video
    video.current.playbackRate = speed;
  }, [video, speed]);

  return (
    <div>
      <video muted autoPlay loop ref={video}>
        <source src={src} />
      </video>
      <div>
        <button onClick={evt => setSpeed(s => s / 2)}>slow</button>
        <button onClick={evt => setSpeed(s => s * 2)}>fast</button>
        <p>Current speed: {speed}x</p>
      </div>
    </div>
  );
}

export default Video;
