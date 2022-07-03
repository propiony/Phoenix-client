import React,{useEffect, useRef, useState} from "react";


const Login=()=>{

const AUTH_URL="https://accounts.spotify.com/authorize?client_id=b0e1e83b5bb14227bb6b32a7f7bd60d4&response_type=code&redirect_uri=http://localhost:3000/home&scope=ugc-image-upload%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20streaming%20app-remote-control%20user-read-email%20user-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify-private%20user-library-modify%20user-library-read%20user-top-read%20user-read-playback-position%20user-read-recently-played%20user-follow-read%20user-follow-modify"
const [inval,setInval]=useState("val")
const newInput=useRef(null)
const anchor=useRef(null)
useEffect(()=>{
    login.current.click()
    console.log(newInput,newInput.current,inval)
})
const login=useRef(null)
return(
    <div className="d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
        <a ref={login} className="btn btn-success btn-lg" href={AUTH_URL}>Login with spotify</a>
    </div>
)
}

export default Login