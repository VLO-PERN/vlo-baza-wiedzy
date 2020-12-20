import React from 'react';
import styled from 'styled-components';
import Logo from '../Assets/Logo.svg';

export const LandingNavbar = (props: any) => {
    return (<>
    <NavBody>
        <LogoImg src={Logo} alt="logo"></LogoImg>        
    </NavBody>
    </>)
}

const NavBody = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100px;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LogoImg = styled.img`
    height: 60px;
`;