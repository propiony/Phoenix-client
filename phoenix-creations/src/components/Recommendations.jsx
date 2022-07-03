import React, { useEffect, useState, useRef } from "react";
import { Link, Route } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";

const Recommendations = ({ recommendations }) => {
  console.log(recommendations, "recommendations");
  return (
    <div className="mt-2 row row-cols-2 row-cols-lg-4 row-cols-sm-3 g-4">
      {recommendations?.map((i, j) => (
        <div key={j + ""} className="col">
          <div className="card  h-100">
            <img src={i.album.images[0].url} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{i.album.name}</h5>
              <p className="card-text">{i.album.artists[0].name}</p>
              <Link to={"/home/track/"+i.album.id}>View Album</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Recommendations;
