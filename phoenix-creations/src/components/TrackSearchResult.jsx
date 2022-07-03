import React from "react";

const TrackSearchResult = ({ track,selectTrack }) => {
    const handlePlay=()=>{
      console.log("playing Track",track)
        selectTrack(track)
    }

  return (
    <div className="d-flex m-2 align-items-center" style={{cursor:"pointer"}} onClick={handlePlay}>
      <img src={track.albumUrl} alt="" height="64px" width="64px" />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  );
};

export default TrackSearchResult;
