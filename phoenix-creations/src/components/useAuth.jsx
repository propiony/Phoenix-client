import React, { useEffect, useState } from "react";
import axios from "axios";

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRereshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  var cd=window.localStorage.getItem("code")
  useEffect(() => {
      if(!code) return
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        //console.log(res.data.access_token)
        setAccessToken(res.data.access_token);
        setRereshToken(res.data.refresh_token);
        setExpiresIn(res.data.expires_in);
        window.history.pushState({}, null, "/home");
      })
      .catch((e) => {
        console.log(e);
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const timeout = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          //console.log(res.data.access_token)
          setAccessToken(res.data.access_token);
          setExpiresIn(res.data.expires_in);
          //window.history.pushState({},null,"/")
        })
        .catch((e) => {
          console.log(e);
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(timeout);
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default useAuth;
