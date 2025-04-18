import React from "react";
import Navbar from "./shared/Navbar";
// import { Input } from "./ui/input";
// import { Button } from "react-scroll";

function ChatPage() {
  return (
    <div style={{"display":"flex","flexDirection":"column"}} >
      <Navbar />

        <div className="font-bold text-xl " style={{"margin":"auto","paddingTop":"10px"}}>
          Resume filter
        </div>
        <iframe src="https://resume-screening-college-project-2.onrender.com" width="100%" height="600px"></iframe>
    </div>
  );
}

export default ChatPage;
