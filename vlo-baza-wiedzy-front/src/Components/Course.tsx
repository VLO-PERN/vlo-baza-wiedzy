import React from 'react';
import styled from 'styled-components';

export const Course = (props: any) => {
    return (<>
        <Wrapper onClick={() => { props.onClick(props.id) }}>
                <>
                    <Text>{props.name}</Text>
                </>
        </Wrapper>
    </>)
}

const Text = styled.div`
    font-size: 18px;
    color: white;
    line-height: 70px;
    padding-left: 20px;
    height: 100%;
    width: calc(100% - 80px);
`;

const Wrapper = styled.div`
    position: relative;
    cursor: pointer;
    height: 70px;
    width: 100%;
    background-color: #27272a;
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    transition: 0.4s ease-in-out;
    &:hover {
        background-color: #044FFF;
    }
`;