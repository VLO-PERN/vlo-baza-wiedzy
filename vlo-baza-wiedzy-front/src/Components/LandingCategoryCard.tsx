import React from 'react';
import styled, from 'styled-components';

export const LandingCategoryCard = (props: any) => {
    return (<>
        <Wrapper onClick={() => {props.onClick(props.id)}} style={props.style}>
            <Img src={props.img} alt=""></Img>
            <Bottom>
                <Text>
                    {props.name}
                </Text>
            </Bottom>
        </Wrapper>
    </>)
}

const Bottom = styled.div`
    height: 60px;
    width: 100%;
    background-color: #2b2d35;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    box-sizing: border-box;
    border-top: 1px solid #044fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
`;


const Text = styled.div`
    font-size: 23px;
    color: white;
`;

const Img = styled.img`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: 400px;
    width: 400px;
    object-fit: cover;
    box-sizing: border-box;
    @media (max-width: 600px) {
        width: 200px;
        height: 200px;
    }
`;


const Wrapper = styled.div`
    position: relative;
    height: 460px;
    width: 400px;
    background-color: black;
    border-radius: 8px;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
    transition: 1s ease;
    &:hover {
        transform: scale(1.02);
    }
    @media (max-width: 600px) {
        width: 200px;
        height: 260px;
    }
`;