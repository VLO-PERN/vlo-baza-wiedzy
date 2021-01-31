import React, {FormEvent, useContext, useRef, useState} from 'react';
import {
    Stack,
    Input,
    Spinner
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import JwtContext from './Components/JwtContext';


export default function AdminLogin(props: any) {
    const jwtContext = useContext(JwtContext);
    const [isLoading, setIsLoading] = useState(false);
    const inputUsername = useRef<HTMLInputElement>(null);
    const inputPassword = useRef<HTMLInputElement>(null);
    const history = useHistory();
    const requestToken = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        fetch('/api/v1/login', {
            headers: [['Content-Type', 'application/json']],
            body: JSON.stringify({
                username: inputUsername.current?.value,
                password: inputPassword.current?.value
            }),
            method: 'POST'
        }).then(res => res.json()).then(data => {
            if (!data.token) {
                throw Error(data.message);
            }
            jwtContext.setJwt(data.token);
            history.push('/admin');
        }).catch(err => {
            console.error(err);
            alert("Ups! Coś poszło nie tak ...");
        });
    }
    return (<>
        <CenterMain>
            <Wrapper>
                {!isLoading ? <>
                <Title>Logowanie</Title>
                <Form onSubmit={requestToken}>
                    <Stack spacing={10}>
                        <Input ref={inputUsername} focusBorderColor="#0044ab" color="#000" backgroundColor="#FFF" variant="outline" placeholder="Nazwa użytkownika" />
                        <Input ref={inputPassword} type="password" focusBorderColor="#0044ab" color="#000" backgroundColor="#FFF" variant="outline" placeholder="Hasło" />
                    </Stack>
                    <Button type="submit" >Zaloguj</Button>
                </Form>
                </> : <>
                    <Center>
                        <Spinner size="xl" />    
                    </Center>   
                </>}
            </Wrapper>
        </CenterMain>
    </>)
}

const CenterMain = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Center = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    max-height: 400px;
    max-width: 400px;
    margin: 30px;
    background-color: #004FFF;
    color: white;
`;
const Title = styled.div`
    font-size: 2rem;
    text-align: center;
    padding-top: 20px;
    font-weight: 500;
`;
const Form = styled.form`
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 50px;
`;
const Button = styled.button`
    outline: none;
    background-color: #171738;
    color: white;
    padding: 12px;
    width: 100%;
    border-radius: 5px;
    font-weight: 500;
    margin-top: 50px;
    transition: 0.4s;
    &:hover {
        background-color: #0003ab;
    }
`;