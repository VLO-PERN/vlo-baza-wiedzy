import React from 'react';
import styled from 'styled-components';

export const AdminArticle = (props: any) => {
    return (<>
        <Wrapper>
            <Text onClick={() => {props.onClick(props.id)}}>{props.name}</Text>
            <Button onClick={() => {props.onDelete(props.id)}} >Usuń</Button>
        </Wrapper>
    </>)
}

const Text = styled.div`
    font-size: 18px;
    font-weight: 400;
    color: white;
    padding-left: 20px;
    cursor: pointer;
    height: 100%;
    width: calc(100% - 80px);
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const Button = styled.button`
    outline: none;
    background-color: #004fff;
    color: white;
    width: 80px;
    height: 100%;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    font-weight: 500;
    transition: 0.4s;
    &:hover {
        background-color: #ff0055;
    }
`;

const Wrapper = styled.div`
    position: relative;
    height: 50px;
    width: 100%;
    border-radius: 8px;
    box-sizing: border-box;
    border: 2px solid #004fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;