import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import SpotifyWebApi from "spotify-web-api-node";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import useAuth from "./components/useAuth";
import Track from "./components/Track";
import Player from "./components/Player";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const code = new URLSearchParams(window.location.search).get("code");
const spotifyApi = new SpotifyWebApi({
  clientId: "b0e1e83b5bb14227bb6b32a7f7bd60d4",
});
function App() {
  window.localStorage.setItem("code",code)
  let cd=window.localStorage.getItem("code")
  console.log("local store:",cd)
  console.log("code",code)
  const accessToken = useAuth(code);
  console.log("in App",accessToken)
  const [playingTrack, setPlayingTrack] = useState();
  const [search, setSearch] = useState("");
  const selectTrack = (track) => {
    //setPlayingTrack(track)
    console.log("play",track)
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getArtist(track.id).then(
      function (data) {
        setPlayingTrack(data.body);
      },
      function (err) {
        console.error(err);
      }
    );
    // spotifyApi.getAvailableGenreSeeds()
    // .then(function(data) {
    //   let genreSeeds = data.body;
    //   console.log(genreSeeds);
    // }, function(err) {
    //   console.log('Something went wrong!', err);
    // });

    /* Get a User’s Top Tracks*/
    // spotifyApi.getMyTopTracks().then(
    //   function (data) {
    //     let topTracks = data.body.items;
    //     console.log(topTracks, "top tracks");
    //   },
    //   function (err) {
    //     console.log("Something went wrong!", err);
    //   }
    // );

    //       spotifyApi.getAlbum(track.id)
    // .then(function(data) {
    //   setPlayingTrack(data.body)
    // }, function(err) {
    //   console.error(err);
    // });
    setSearch("");
  };
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <Routes>,
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<LandingPage search={search} playingTrack={playingTrack} setPlayingTrack={setPlayingTrack} selectTrack={selectTrack} setSearch={setSearch} accessToken={accessToken} code={code} />} />
        <Route path="/about" element={<About />} />
        <Route path="/home/track/:id" element={<Track accessToken={accessToken}  setPlayingTrack={setPlayingTrack} />} />
      </Routes>
     
      <footer style={{width:"100%"}}>
      <div  className="postion-fixed bottom-0"><Player accessToken={accessToken} trackUri={playingTrack?.uri}/></div>
      </footer>
    </div>
  );
}

export default App;
