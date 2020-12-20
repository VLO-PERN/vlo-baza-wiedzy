import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { BsPlus } from "react-icons/bs";
import { Input } from "@chakra-ui/react";

export const AddCourse = (props: any) => {
    const [name, setName] = useState("");
    const inputName = useRef<HTMLInputElement>(null);
    const changeName = () => {
        if (inputName.current?.value) {
            setName(inputName.current?.value);
        } else {
            setName("");
        }
    }
    return (<>
        <Wrapper>
            <Left>
                <Input ref={inputName} onChange={changeName} color="#FFF" variant="unstyled" placeholder="Nazwa nowego kursu" />
            </Left>
            <Button onClick={() => { if (name !== "") { props.onAdd(name) } else { alert('Musisz podać nazwę!') }}} ><BsPlus /></Button>
        </Wrapper>
    </>)
}

const Left = styled.div`
    font-size: 18px;
    font-weight: 400;
    color: black;
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
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s;
    &:hover {
        background-color: #0042d6;
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