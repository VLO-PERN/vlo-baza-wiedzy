import React from 'react';
import styled from 'styled-components';

export const Footer = (props: any) => {
    return (<>
    <FooterBody>
        <p><small>&copy; Copyright {(new Date()).getFullYear()}, Baza Wiedzy VLO</small></p>
    </FooterBody>
    </>)
}

const FooterBody = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;