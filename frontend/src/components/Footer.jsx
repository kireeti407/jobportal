import React from "react";
import { Link } from "react-router-dom";
// import { Link as LinkScroll } from "react-scroll";
// import Contact from "./contact";


function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 border border-t">
      <div className=" text-center sm:text-left max-w-7xl mx-auto p-4 pt-10">
        <Link to="/">
          <h1 href="#header" style={{"textAlign":"center"}} className="text-2xl font-bold text-blue-600">
          Comprehensive <span className="text-blue-700">Job Portal System</span>
          </h1>
        </Link>
      </div>
      <div style={{"display":"flex","justifyContent":"center","paddingBottom":"5px","gap":"5px"}}>
        <a href="https://www.linkedin.com/"><img style={{"width":"25px","height":"25px"}} src="./src/assets/l.png" alt="error" /></a>
        <a href="https://www.facebook.com/"><img style={{"width":"25px","height":"25px"}} src="./src/assets/f.png" alt="error" /></a>
        <a href="https://x.com/"><img style={{"width":"24px","height":"24px"}} src="./src/assets/x.png" alt="error" /></a>
        {/* <img style={{"width":"20px","height":"20px"}} src="./src/assets/linkedin.png" alt="error" /> */}
      </div>
        <div style={{"display":"flex","justifyContent":"center"}} className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p > © {new Date().getFullYear()} -103,115 and 146 All rights reserved.</p>
      </div>
     
    </footer>
  );
}

export default Footer;
