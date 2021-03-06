import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import JwtContext from './Components/JwtContext';
import { NavBar } from './Components/NavBar';
import {
    Spinner,
    Input,
    Stack
} from "@chakra-ui/react";
import styled from 'styled-components';
import { CategoryPreview } from './Components/CategoryPreview';

export default function AdminEditCategory(props: any) {
    const jwtContext = useContext(JwtContext);
    const history = useHistory();
    const { id }: any = useParams();
    useEffect(() => {
        if (jwtContext.token === null) {
            history.push('/admin/login');
        } else {
            loadCategory();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jwtContext, history]);
    const loadCategory = () => {
        fetch(`/api/v1/category/${id}`).then(res => res.json())
            .then(data => {
                setName(data.category["category_name"]);
                setUrl(data.category["picture_url"]);
            }).catch(err => {
                console.error(err);
                alert("Ups! Coś poszło nie tak ...");
        })
    }
    const inputName = useRef<HTMLInputElement>(null);
    const inputUrl = useRef<HTMLInputElement>(null);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const changeName = () => {
        if (inputName.current?.value) {
            setName(inputName.current?.value);
        } else {
            setName("");
        }
    }
    const changeUrl = () => {
        if (inputUrl.current?.value) {
            setUrl(inputUrl.current?.value);
        }
    }
    const [isSending, setIsSending] = useState(false);
    const sendUpdateCategory = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputName.current?.value || !inputUrl.current?.value) {
            alert("You must provide category name and picture url!");
        }
        console.log([
            inputName.current?.value,
            inputUrl.current?.value
        ]);
        setIsSending(true);
        fetch(`/api/v1/category/${id}`, {
            method: 'PUT',
            headers: [['Content-Type', 'application/json'],
            ['Authorization', `randomwordthatnobodycaresabout ${jwtContext.token}`]],
            body: JSON.stringify({
                name: inputName.current?.value,
                pictureUrl: inputUrl.current?.value
            })
        }).then(() => { 
            history.goBack();
         }).catch((err) => { 
            console.error(err);
            alert("Ups! Coś poszło nie tak ...");
         });
    }
    return (<>
        <NavBar />
        <Wrapper>
            <Title>Edytowanie kategorii</Title>
            {isSending ? <Center><Spinner size="xl" ></Spinner></Center> :
                <CenterRelative>
                    <CategoryPreview name={name} url={url} />
                    <FormContainer onSubmit={sendUpdateCategory}>
                        <Stack spacing={10}>
                            <Input value={name} ref={inputName} onChange={changeName} focusBorderColor="#004fff" borderColor="#20205c" color="#FFF" variant="outline" placeholder="Nazwa kategorii" />
                            <Input value={url} ref={inputUrl} onChange={changeUrl} focusBorderColor="#004fff" borderColor="#20205c" color="#FFF" variant="outline" placeholder="URL do obrazka" />
                            <div>
                                <ButtonCancel onClick={() => {history.goBack()}}>Anuluj</ButtonCancel>
                                <Button type="submit" >Zapisz</Button>
                            </div>
                        </Stack>
                    </FormContainer>
                </CenterRelative>
            }
        </Wrapper>
    </>)
}

const Center = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CenterRelative = styled.div`
    height: 100%;
    width: calc(100% - 30px);
    margin-left: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Wrapper = styled.div`
    margin-top: 60px;
    width: 100%;
    background-color: #18181a;
    color: white;
`;

const Title = styled.div`
    font-weight: 100;
    font-size: 54px;
    text-align: center;
    margin-top: 6vw;
    margin-bottom: 1vw;
`;

const FormContainer = styled.form`
    width: 100%;
    max-width: 600px;
    margin: 30px;
`;

const Button = styled.button`
    outline: none;
    background-color: #20205c;
    color: white;
    padding: 12px;
    width: calc(50% - 15px);
    margin-left: 15px;
    border-radius: 5px;
    font-weight: 500;
    margin-top: 50px;
    transition: 0.4s;
    &:hover {
        background-color: #004fff;
    }
`;

const ButtonCancel = styled.button`
    outline: none;
    background-color: #20205c;
    color: white;
    padding: 12px;
    width: calc(50% - 15px);
    margin-right: 15px;
    border-radius: 5px;
    font-weight: 500;
    margin-top: 50px;
    transition: 0.4s;
    &:hover {
        background-color: #FF4365;
    }
`;