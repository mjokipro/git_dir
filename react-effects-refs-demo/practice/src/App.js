import React, {useState, useEffect, useRef} from "react"
import Timer from "./Timer"
import EffectExample from "./EffectExample";
import ProfileViewer from "./ProfileViewer";
import ProfileViewerWithSearch from "./ProfileViewerWithSearch";
import TimerWrapper from "./TimerWrapper";

function App() {
  return (
    <div>
      <TimerWrapper />
      <ProfileViewerWithSearch />
      <ProfileViewer name="matt" color="teal"/>
      <ProfileViewer name="colt" color="red"/>
      <Timer />
      <EffectExample />
    </div>
  );
}

export default App;
