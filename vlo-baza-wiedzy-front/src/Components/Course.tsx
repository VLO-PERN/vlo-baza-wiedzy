import React from 'react';
import styled from 'styled-components';

export const Course = (props: any) => {
    return (<>
        <Wrapper>
                <>
                    <Text onClick={() => { props.onClick(props.id) }}>{props.name}</Text>
                </>
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
    transition: 0.4s ease-in-out;
    &:hover {
        background-color: #044FFF;
    }
`;