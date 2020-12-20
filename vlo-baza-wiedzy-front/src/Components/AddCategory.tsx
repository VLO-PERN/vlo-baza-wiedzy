import React from 'react';
import styled from 'styled-components';
import { BsFillPlusCircleFill } from 'react-icons/bs';

export const AddCategory = (props: any) => {
    return (<>
        <Wrapper onClick={props.onClick}>
            <BsFillPlusCircleFill style={{ height: "50px", width: "50px" }} />
        </Wrapper>
    </>)
}

const Wrapper = styled.div`
    color: #DDD;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 180px;
    width: 180px;
    background-color: #004fff;
    border-radius: 8px;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
    transition: 0.4s ease-in-out;
    &:hover {
        color: #FFF;
        cursor: pointer;
    }
`;