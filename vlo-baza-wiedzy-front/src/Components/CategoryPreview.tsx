import React from 'react';
import styled from 'styled-components';

export const CategoryPreview = (props: any) => {
    return (<>
        <Wrapper>
            <ImgPlaceholder>
                <Img src={props.url} alt="" />
            </ImgPlaceholder>
            <Text>
                {props.name !== "" ? props.name : "Brak nazwy"}
            </Text>
        </Wrapper>
    </>)
}

const Text = styled.div`
    font-size: calc(20px + 1vw);
    font-weight: 300;
    padding-left: calc(10px + 1vw);
    color: white;
`;

const Img = styled.img`
    border: none;
    outline: none;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    height: 178px;
    width: 178px;
`;

const ImgPlaceholder = styled.div`
    height: 100%;
    width: 180px;
    background-color: black;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 180px;
    width: 100%;
    max-width: 600px;
    margin: 30px;
    border-radius: 8px;
    box-sizing: border-box;
    border: 1px solid #044fff;
`;