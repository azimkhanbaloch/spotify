import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';


export default function Navbar({navBackground}) {

    const [{ userInfo }] = useStateProvider();

    return (
        <Container navBackground={navBackground}>
            <div className="search__bar">
                <FaSearch />
                <input type="text" placeholder='Artists, songs, or podcasts' />
            </div>
            <div className="avatar">
                <a href="#">
                    <CgProfile />
                    <span>{userInfo?.userName}</span>
                </a>
            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    height: 64px;
    position: sticky;
    top: 0;
    transition: 0.3s ease-in-out;
    background-color: ${({navBackground}) => navBackground ? "rgba(0, 0, 0, 0.7)" : "none"};

    .search__bar{
        background-color: white;
        width: 30%;
        padding: 0.4rem 1rem;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        
        input{
            border: none;
            height: 2rem;
            width: 100%;
            &:focus{
                outline: none;
            }
        }
    }   
    .avatar{
        background-color: black;
        padding: 0.3rem 1rem 0.3rem 0.4rem ;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        a{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            text-decoration: none;
            color: white;
            font-weight: bold;

            svg{
                font-size: 1.3rem;
                padding: 0.2rem;
                border-radius: 1rem;
                color: #c7c5c5;
            }
        }
    }
`;
