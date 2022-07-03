import React, { useEffect } from 'react';
import SpotifyWebApi from "spotify-web-api-node";

const ArtistData=({track})=>{


    return(
        <div>
            <a target="_blank" rel="noreferrer" href={track?.external_urls?.spotify}>Listen to this track</a>
            {/* <img src={image} alt=""/> */}
            {track?.name}
        </div>
    )
}

export default ArtistData