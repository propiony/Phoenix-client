import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
const spotifyApi = new SpotifyWebApi({
    clientId: "b0e1e83b5bb14227bb6b32a7f7bd60d4",
  });
const Track=({accessToken,setPlayingTrack})=>{

    const {id}=useParams()

    const [albumTracks,setAlbumTrack]=useState([])
    const [imageUrl,setImage]=useState("")
useEffect(()=>{
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getAlbum(id)
    .then(function(data) {
        setAlbumTrack(data.body.tracks.items)
        setImage(data.body.images[0].url)
    }, function(err) {
      console.error(err);
    });
},[accessToken,id])
return(<div>
{albumTracks.map((i,j)=>(
    <div className="d-flex m-2 align-items-center" onClick={()=>setPlayingTrack(i)} style={{cursor:"pointer"}} >
    <img src={imageUrl} alt="" height="64px" width="64px" />
    <div className="ml-3">
      <div>{i.name}</div>
      <div className="text-muted">{i.artist}</div>
    </div>
  </div>
))}
</div>)
}
export default Track;