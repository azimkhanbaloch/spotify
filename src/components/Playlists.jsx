import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { reducerCases } from '../utils/Constants';
import { useStateProvider } from "../utils/StateProvider";

export default function Playlists() {

    const [{token, playlists, selectedPlaylistId},dispatch] = useStateProvider();

    const changePlaylist = (id) => {
        const selectedPlaylistId = id;
        dispatch({type: reducerCases.SET_PLAYLISTID, selectedPlaylistId});
    }
    
    useEffect(() => {
        const getPlayListsData = async () => {
            const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
                headers:{
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json"
                }
            });
            const { items } = response.data;
            const playlists = items.map(({name, id})=>{
                return {name, id};
            });
            dispatch({type: reducerCases.SET_PLAYLISTS, playlists});
        }
        getPlayListsData();
    }
    , [token, dispatch])
    
  return (
    <Container>
        <ul>
            {
                playlists.map(({name,id}) => {
                    return (
                        <li key={id} onClick={() => changePlaylist(id)}>{name}</li>
                    )
                })
            }
        </ul>
    </Container>
  )
}

const Container = styled.div`
    height: 100%;
    overflow: hidden;

    ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        height: 55vh;
        max-height: 100%;
        overflow: auto;

        ::-webkit-scrollbar {
            width: 0.7rem;
            &-thumb {
                // border-radius: 5px;
                width: 5px;
                background-color: rgba(255, 255, 255, 0.6);
            }
        }

        li {
            display: flex;
            gap: 1rem;
            cursor: pointer;
            transition: 0.3s ease-in-out;
        }

        li:hover {
            color: white;
        }
    }
`;