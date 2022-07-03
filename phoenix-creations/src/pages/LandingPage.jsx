import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "../components/Login";
//import {useHistory} from "react-router-dom";
import Dashboard from "../components/Dashboard";


const LandingPage = ({code,accessToken,search,setSearch,setPlayingTrack,selectTrack,playingTrack}) => {
  //const history=useHistory();
//   const auth = window.localStorage.getItem("code");
//   const [authCode, setAuthCode] = useState();
 
  
//   useEffect(() => {
//     setAuthCode(window.localStorage.getItem("code"));
//   }, [auth]);
if(!code)window.location="/"
console.log(accessToken,"ac")

  return <div><Dashboard code={code} search={search} playingTrack={playingTrack}  setPlayingTrack={setPlayingTrack} selectTrack={selectTrack} setSearch={setSearch} accessToken={accessToken} /></div>;
};

export default LandingPage;
