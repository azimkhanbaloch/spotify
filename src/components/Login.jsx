import React from 'react';
import styled from 'styled-components';


export default function Login() {
    function handleClick() {
        const clientId = "756104ade9264a69be519802f28334db";
        const redirectUrl = "https://azimkhanbaloch.github.io/spotify/";
        const apiUrl = "https://accounts.spotify.com/authorize"
        const scope = ["user-read-email", "user-read-private", "user-modify-playback-state","user-read-playback-state","user-read-currently-playing","user-read-recently-played","user-read-playback-position","user-top-read"];
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`;
    }
  return (
    <Container>
        <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png' alt='Spotify Logo'/>
        <button onClick={handleClick}>Connect Spotify</button>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    flex-direction: column!important;
    background-color: #1db954;
    gap: 5rem; 
    img {
        height: 20vh;
    }
    button {
        padding: 1rem 5rem;
        border-radius: 5rem;
        border: none;
        background-color: black;
        color: #49f585;
        font-size: 1.4rem;
        cursor: pointer;
    }
`;
