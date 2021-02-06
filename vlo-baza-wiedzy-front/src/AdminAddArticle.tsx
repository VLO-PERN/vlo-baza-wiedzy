import React, { useContext, useEffect, useState, Suspense, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import JwtContext from './Components/JwtContext';
import styled from 'styled-components';
import { NavBar } from './Components/NavBar';
import {
    Spinner,
    Input
} from "@chakra-ui/react";
import './Css/Markdown-dark.css';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/blackboard.css';
const CodeMirror = React.lazy(() => import('@uiw/react-codemirror'));
const ReactMarkdownWithHtml = React.lazy(() => import('react-markdown/with-html'));

const AdminAddArticle = (props: any) => {
    const { id }: any = useParams();
    const jwtContext = useContext(JwtContext);
    const history = useHistory();
    useEffect(() => {
        if (jwtContext.token === null) {
            history.push('/admin/login');
        }
    }, [jwtContext, history]);
    const [text, setText] = useState("");
    const textChanged = (codeMirror: any) => {
        setText(codeMirror.getValue());
    }
    const [articleName, setArticleName] = useState("");
    const inputName = useRef<HTMLInputElement>(null);
    const changeArticleName = () => {
        setArticleName(inputName.current?.value ? inputName.current?.value : "");
    }
    const [isSaving, setIsSaving] = useState(false);
    const sendAddToDb = () => {
        if (articleName === "") {
            alert('Musisz podać nazwę artykułu!');
            return;
        }
        setIsSaving(true);
        fetch('/api/v1/article', {
            method: 'POST',
            headers: [
                ['Content-Type', 'application/json'],
                ['Authorization', `somerandomword ${jwtContext.token}`]
            ],
            body: JSON.stringify({
                courseId: id,
                name: articleName,
                contents: text
            })
        }).then(() => {
            history.goBack();
        })
            .catch(err => {
                setIsSaving(false);
                console.error(err);
                alert('Ups! Coś poszło nie tak ...');
        })
    }
    return (<>
        <NavBar />
        <Wrapper>
            <Suspense fallback={<CenterRelative><Spinner size="xl" ></Spinner></CenterRelative>}>
            <EditorWrapper>
            <CodeMirror value={text} onChange={textChanged}
                options={{
                    theme: 'blackboard',
                    keyMap: 'sublime',
                    mode: 'markdown',
                    }} />
            </EditorWrapper>
            </Suspense>
            <Suspense fallback={<CenterRelative><Spinner size="xl" ></Spinner></CenterRelative>}>
            <DisplayDiv className={"markdown-body"}>
                <ReactMarkdownWithHtml allowDangerousHtml source={articleName === "" ? ("# Brak nazwy\n" + text) : (`# ${articleName}\n${text}`)} />
            </DisplayDiv>
            </Suspense>
        </Wrapper>
        <Bottom>
            <Input ref={inputName} onChange={changeArticleName} width="220px" marginLeft="20px" focusBorderColor="#004fff" color="#FFF" variant="outline" placeholder="Nazwa artykułu" />
            {isSaving ? <Spinner marginRight="25px" size="m" ></Spinner> :
                <Button onClick={sendAddToDb}>Zapisz</Button>
            }
        </Bottom>
    </>)
}

export default AdminAddArticle;

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
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
`;

const EditorWrapper = styled.div`
    height: calc(100vh - 110px);
    width: 50vw;
    background-color: black;
`;

const DisplayDiv = styled.div`
    padding: 30px;
    height: calc(100vh - 110px);
    width: 50vw;
    overflow-y: scroll;
    scrollbar-width: none;
    background-color: #18181a;
`;

const Bottom = styled.div`
    width: 100%;
    height: 50px;
    background-color: #2d384f;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Button = styled.button`
    outline: none;
    background-color: transparent;
    color: white;
    width: 80px;
    height: 40px;
    border-radius: 5px;
    margin-right: 20px;
    border: 1px solid white;
    font-weight: 500;
    transition: 0.4s;
    &:hover {
        border: 1px solid #004fff;
        background-color: #004fff;
        color: white;
    }
`;