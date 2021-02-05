import React from 'react';
import styled, { keyframes } from 'styled-components';
import Logo from '../Assets/Logo.svg';

export const LandingNavbar = (props: any) => {
    return (<>
    <NavBody>
        <LogoImg src={Logo} alt="logo"></LogoImg>        
    </NavBody>
    </>)
}

const ZoomOut = keyframes`
    0% {
        height: 100vh;
        font-size: 60px;
        opacity: 0;
    }
    20% {
        height: 100vh;
        font-size: 60px;
        opacity: 1;
    }
    40% {
        height: 100vh;
        font-size: 60px;
    }
    100% {
        height: 100px;
        font-size: 30px;
    }
`;


const NavBody = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    animation: ${ZoomOut} 2s ease;
`;
const LogoImg = styled.img`
    height: 2em;
`;