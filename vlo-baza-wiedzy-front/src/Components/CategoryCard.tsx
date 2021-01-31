import React from 'react';
import styled from 'styled-components';

export const CategoryCard = (props: any) => {
    return (<>
        <Wrapper style={props.style}>
            <Tint onClick={() => {props.onClick(props.id)}}>
                <Text>
                    {props.name}
                </Text>
            </Tint>
            <Img src={props.img} alt=""></Img>
        </Wrapper>
    </>)
}

const Text = styled.div`
    font-size: 23px;
    font-weight: 600;
    color: white;
`;

const Img = styled.img`
    border-radius: 8px;
    height: 180px;
    width: 180px;
`;

const Tint = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.60);
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    transition: 0.4s ease-in-out;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;

const Wrapper = styled.div`
    position: relative;
    height: 180px;
    width: 180px;
    background-color: black;
    border-radius: 8px;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
`;