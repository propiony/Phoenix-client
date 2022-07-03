import React, { useEffect, useState, useRef } from "react";
import SpotifyWebApi from "spotify-web-api-node";

import { Form, Container, Button } from "react-bootstrap";
import TrackSearchResult from "./TrackSearchResult";

//import Index from "../carousal/index"
import ArtistData from "./ArtistData";
import Recommendations from "./Recommendations";
//import Carousel from "../carousal/carousel";

const spotifyApi = new SpotifyWebApi({
  clientId: "b0e1e83b5bb14227bb6b32a7f7bd60d4",
});
const Dashboard = ({ code,accessToken,search,setSearch,setPlayingTrack,selectTrack,playingTrack }) => {
  
console.log(accessToken,"access")
 
  const [searchResults, setSearchResults] = useState([]);
  
  const [topTrackArtists, setTopTrackArtists] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [filterdRecommendations,setFilterdRecommendations]=useState([])
  const [filters,setFilters]=useState({genre:""})
  const decades=["1950s","1960s","1970s","1980s","1990s","2000s","2010s"]
  const [isFiltered,setIsFiltered]=useState(false)
  // const selectTrack = (track) => {
  //   //setPlayingTrack(track)
  //   spotifyApi.getArtist(track.id).then(
  //     function (data) {
  //       setPlayingTrack(data.body);
  //     },
  //     function (err) {
  //       console.error(err);
  //     }
  //   );
  //   // spotifyApi.getAvailableGenreSeeds()
  //   // .then(function(data) {
  //   //   let genreSeeds = data.body;
  //   //   console.log(genreSeeds);
  //   // }, function(err) {
  //   //   console.log('Something went wrong!', err);
  //   // });

  //   /* Get a User’s Top Tracks*/
  //   // spotifyApi.getMyTopTracks().then(
  //   //   function (data) {
  //   //     let topTracks = data.body.items;
  //   //     console.log(topTracks, "top tracks");
  //   //   },
  //   //   function (err) {
  //   //     console.log("Something went wrong!", err);
  //   //   }
  //   // );

  //   //       spotifyApi.getAlbum(track.id)
  //   // .then(function(data) {
  //   //   setPlayingTrack(data.body)
  //   // }, function(err) {
  //   //   console.error(err);
  //   // });
  //   setSearch("");
  // };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMyTopArtists().then(
      function (data) {
        setTopTrackArtists(data.body.items.map((i) => i.id));
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [accessToken]);
  const getRecommendations=()=>{
    setIsFiltered(false)
    spotifyApi
      .getRecommendations({
        min_energy: 0.4,
        seed_artists: [topTrackArtists.slice(0, 5)],
        limit: 100,
        min_popularity: 50,
      })
      .then(
        function (data) {
          let recommendations = data.body;
          setRecommendations(recommendations.tracks);
          console.log(recommendations,"se5t");
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }
  useEffect(() => {
    
    if (!accessToken) return;
    getRecommendations();
  }, [topTrackArtists,accessToken]);

  useEffect(() => {
    setPlayingTrack();
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((data) => {
      if (cancel) return;
      setSearchResults(
        data.body.tracks.items.map((i) => {
          return {
            artist: i.artists[0].name,
            title: i.name,
            uri: i.uri,
            albumUrl: i.album.images[2].url,
            id: i.artists[0].id,
          };
        })
      );
      setRecommendations([])
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  useEffect(()=>{
    let recm=recommendations
    setIsFiltered(true)
    console.log(recm)
    const filteredAlbums=recm?.filter((i)=>{
      let releaseDate=new Date(i.album.release_date).getFullYear()
      console.log(releaseDate,filters.genre)
     if( releaseDate>filters.genre&&releaseDate<filters.genre+10)return i
    })
    console.log(filteredAlbums)
    
    setFilterdRecommendations(filteredAlbums)
  },[filters])

  
  return (
    <Container className="px-5 ">
      <Form.Control
        type="search"
        className="mt-5 "
        size={5}
        placeholder="Search for a Song or Artists"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          
        }}
      />
      <Button onClick={()=>getRecommendations()} >Get New Recommendations</Button>
      {decades.map((i,j)=><span key={j+""} onClick={()=>{setFilters({
        genre:parseInt(i.slice(0,4))})
        
    }} className="m-2">{i}</span>)}
           <h2 className="mt-2">Recommendations for You: </h2> 
           {console.log("in render",isFiltered)} 
      {isFiltered?<Recommendations recommendations={filterdRecommendations} />:<Recommendations recommendations={recommendations} />}

      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            selectTrack={selectTrack}
          />
        ))}
      </div>
      
      <div>
        <ArtistData track={playingTrack} />
      </div>
      {/* <Index/> */}
    </Container>
  );
};

export default Dashboard;
