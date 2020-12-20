import React from 'react';
import styled from 'styled-components';
import Logo from '../Assets/Logo.svg';

export const NavBar = (props: any) => {
    return (<>
    <NavBody>
        <LogoImg src={Logo} alt="logo"></LogoImg>        
    </NavBody>
    </>)
}

const NavBody = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    height: 60px;
    width: 100vw;
    background-color: #004FFF;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LogoImg = styled.img`
    height: 50px;
`;