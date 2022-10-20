import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';


export default function Spotify() {
    
    const [{token,playlists}, dispatch] = useStateProvider();

    
    const bodyRef = useRef();
    const [navBackground, setNavBackground] = useState(false);
    const [headerBackground, setHeaderBackground] = useState(false);

    const bodyScrolled = () => {
        bodyRef.current.scrollTop >= 30 ? setNavBackground(true) : setNavBackground(false);
        bodyRef.current.scrollTop >= 268 ? setHeaderBackground(true) : setHeaderBackground(false);
    }

    useEffect(() => {
        const getUserInfo = async () => {
            const {data} = await axios.get("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization : "Bearer " + token,
                    "Content-Type": "application/json"
                }
            });
            const userInfo = {
                userId : data.id,
                userName : data.display_name,
            };
            dispatch({type: reducerCases.SET_USERS, userInfo});
        }
        getUserInfo();
    }, [dispatch, token])
    

    return (
        <div className='spotify'>
            <div className="spotify__body">
                <Sidebar/>
                <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
                    <Navbar navBackground={navBackground}/>
                    <div className="boyd__contents">
                        <Body headerBackground={headerBackground} />
                    </div>
                </div>
            </div>
            <div className="spotify__footer">
                <Footer />
            </div>
        </div>
    )
}
