  import axios from 'axios';
  import React, { useEffect } from 'react';
  import { AiFillClockCircle } from 'react-icons/ai';
  import styled from 'styled-components';
  import { reducerCases } from '../utils/Constants';
  import { useStateProvider } from '../utils/StateProvider';

  export default function Body({headerBackground}) {

    const [{token, selectedPlaylistId, selectedPlaylist}, dispatch]= useStateProvider();

    useEffect(() => {
      const getInitialPlaylist = async () => {
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization : "Bearer " + token,
              "Content-Type": "application/json"
            },
        }
        );
        
        const selectedPlaylist = {
            id : response.data.id,
            name : response.data.name,
            owner : response.data.owner.display_name,
            description : response.data.description.startsWith("<a") ? "" : response.data.description,
            image : response.data.images[0].url,
            totalSongs: response.data.tracks.total,
            tracks : response.data.tracks.items.map(({added_at,track}) => ({
                id: track.id, 
                name: track.name, 
                dateCreated: added_at,
                artists: track.artists.map((artist) => artist.name), 
                image: track.album.images[2].url, 
                duration: track.duration_ms, 
                album: track.album.name, 
                context_uri: track.album.uri,
                track_number: track.track_number, 
                totalDuration: function totalDur() {
                    let td = 0;
                    response.data.tracks.items.map(({track}) => td += track.duration_ms);
                    return td;
                }
            })),
        };
        dispatch({type: reducerCases.SET_PLAYLIST, selectedPlaylist});
    };
        getInitialPlaylist();
    }, [token, dispatch, selectedPlaylistId])
    
    const msToMinutes = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    return (
      <Container headerBackground={headerBackground}>
          { 
            selectedPlaylist && (
              <>
                <div className="playlist">
                    <div className="image">
                        <img src={selectedPlaylist.image} alt="selectedPlaylist" />
                    </div>

                    <div className="details">
                        <span className='type'>PLAYLIST</span>
                        <h1 className='title'>{selectedPlaylist.name}</h1>
                        <div className='owner__details'>
                            <p className="owner"><strong><a href="#">{selectedPlaylist.owner} &#183; </a></strong></p>
                            <p className="description">{selectedPlaylist.totalSongs} Songs, </p>
                        </div>
                    </div>
                  </div>
                    <div className="list">
                        <div className="header__row">
                            <div className="col">
                                <span>#</span>
                            </div>
                          <div className="col">
                              <span>TITLE</span>
                          </div>
                          <div className="col">
                              <span>ALBUM</span>
                          </div>
                          <div className="col">
                              <span>DATE ADDED</span>
                          </div>
                          <div className="col">
                              <span><AiFillClockCircle /></span>
                          </div>
                        </div>
                        <div className="tracks">
                            {
                                selectedPlaylist.tracks.map(
                                  (
                                    {
                                      id,
                                      name, 
                                      artists, 
                                      image, 
                                      duration, 
                                      album, 
                                      dateCreated,
                                      context_uri, 
                                      track__number
                                    }, 
                                    index
                                  ) => {
                                    return (
                                        <div className="row" key={id}>
                                            <div className="col">
                                                <span>{index+1}</span>
                                            </div>

                                            <div className="col detail">
                                                <div className='image'>
                                                    <img src={image} alt="track" />
                                                </div>
                                                <div className="info">
                                                    <span className="name">{name}</span>
                                                    <span className="artists">{artists.join(", ").length >= 45 ? artists.join(", ").slice(0, 45).concat("...") : artists.join(", ")}</span>
                                                </div>
                                            </div>

                                            <div className="col">
                                                <span>{album}</span>
                                            </div>

                                            <div className="col">
                                                <span>{dateCreated}</span>
                                            </div>

                                            <div className="col">
                                                <span>{msToMinutes(duration)}</span>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
              </>
            )
          }
      </Container>
    )
  }

  const Container = styled.div`
      .playlist {
          margin: 0 2rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          .image {
              img {
                  height: 15rem;
                  box-shadow: rgba(0,0,0,0.25) 0px 25px 50px -12px;
              }
          }
          .details {
              display: flex;
              flex-direction: column;
              gap: 1rem;
              color: #e0dede;
              .title {
                  color: white;
                  font-size: 4rem;
              }
              .owner__details{
                display: flex;
                flex-direction: row;
                  .owner { 
                        a {
                            color: white;
                            text-decoration: none;
                        }
                  }
              }
          }
      }
      .list {
          .header__row {
              display: grid;
              grid-template-columns: 0.5fr 8fr 6fr 7fr 0.4fr;
              color: #dddcdc;
              margin: 1rem 0 0 0;
              position: sticky;
              top: 10.3vh;
              z-index: 99;
              padding: 1rem 3rem;
              transition: 0.3s ease-in-out;
              background-color: ${({headerBackground}) => headerBackground ? "#000000dc" : "none"};
          }
          .tracks {
              margin: 0 2rem;
              display: flex;
              flex-direction: column;
              margin-bottom: 5rem;
              .row {
                  padding: 0.5rem 1rem;
                  display: grid;
                  grid-template-columns: 0.5fr 8fr 6.1fr 7fr 0.1fr;
                  &:hover {
                      background-color: rgba(0, 0, 0, 0.7);
                  }
                  .col {
                      display: flex;
                      align-items: center;
                      color: #dddcdc;
                      img {
                          height: 40px;
                      }
                  }
                  .detail {
                      display: flex;
                      gap: 1rem;
                      .info {
                          display: flex;
                          flex-direction: column;
                          .artists{
                                font-size: 0.875rem;
                          }
                      }
                  }
              }
          }
      }
  `;