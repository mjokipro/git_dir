import React from "react";
import ProfileViewer from "./ProfileViewer";
import ProfileViewerWithSearch from "./ProfileViewerWithSearch";

const App = () => (
  <div className="App">
    <div>
      <h1>Profile Viewer</h1>
      <ProfileViewer />
    </div>
    <div>
      <h1>Profile Viewer With Search</h1>
      <ProfileViewerWithSearch/>
    </div>
  </div>
);

export default App;
