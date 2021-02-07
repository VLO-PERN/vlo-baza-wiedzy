import React from 'react';
import styled from 'styled-components';
import {Fade} from 'react-awesome-reveal';


export const LandingCategoryCard = (props: any) => {
    return (<>
        <Wrapper  style={props.style}>
            <Fade>
            <Img src={props.img} alt=""></Img>
            </Fade>
            <Bottom>
                <Fade direction={"down"} delay={200}>
                <Text>
                    {props.name}
                </Text>
                </Fade>
                <Fade delay={300}>
                    <Button onClick={() => {props.onClick(props.id)}}>Wybierz</Button>
                </Fade>
            </Bottom>
        </Wrapper>
    </>)
}

const Bottom = styled.div`
    font-weight: 600;
    height: 60vmin;
    width: 60vmin;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (max-width: 1150px) {
        width: 200px;
        height: 200px;
    }
`;


const Text = styled.div`
    font-size: 80px;
    user-select: none;
    color: white;
    @media (max-width: 500px) {
        font-size: 60px;
    }
`;

const Img = styled.img`
    border-radius: 4px;
    height: calc(60vmin - 40px);
    width: calc(60vmin - 40px);
    margin: 20px;
    object-fit: cover;
    box-sizing: border-box;
    @media (max-width: 1150px) {
        width: 200px;
        height: 200px;
        @media (max-width: 500px) {
            margin-top: 80px;
        }
    }
`;


const Wrapper = styled.div`
    position: relative;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    @media (max-width: 500px) {
        align-items: flex-start;
    }
`;

const Button = styled.button`
    width: 180px;
    height: 50px;
    color: white;
    background-color: #044fff;
    border-radius: 8000px;
    outline: none;
    transition: 1s;
    &:hover {
        background-color: #0030c0;
    }
`;