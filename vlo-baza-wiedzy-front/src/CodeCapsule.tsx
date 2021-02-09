import React, { useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import { NavBar } from './Components/NavBar';
import styled from 'styled-components';
import CodeMirror from '@uiw/react-codemirror';
import {AiOutlineShareAlt} from 'react-icons/ai'
import 'codemirror/keymap/sublime';
import 'codemirror/theme/isotope.css';

const CodeCapsule = (props: any) => {
    const {id}: any = useParams();
    const defaultValues = {
        html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n</head>\n<body>\nhello\n</body>\n</html>',
        js: 'console.log("hello")'
    }
    const history = useHistory();
    const [editorValue, setEditorValue] = useState<string>(id ? decodeURI(atob(id)) : (props.lang === "html" ? defaultValues.html : defaultValues.js)); // TS bullshit
    const copyLinkToClipboard = () => {
        const link = `${window.location.origin}/capsule/${props.lang}/${encodeURI(btoa(encodeURI(editorValue)))}`;
        navigator.clipboard.writeText(link).then(() => {
            alert("Skopiowano link do schowka!");
        }).catch(e => {
            console.error(e);
            alert("Błąd przy próbie skopiowania linku do schowka!");
        });
    }
    const getJsWrapper = () => {
        // So here is the thing
        // I know that this looks horrible
        // But it works
        // And I can't be bothered to make it in a nicer way
        // Nobody pays me for that so I'm allowed to be lazy
        // Having said that ... sorry that u had to see this today
        const mainCss = "html, body {margin: 0px}";
        const lineCss = "div { background-color: #18181a; width: calc(100% - 40px); height: 40px; display: flex; align-items: center; color: white; font-size: 15px; border-radius: 10px;" +
        "margin: 20px; padding-left: 10px; box-sizing: border-box; font-family: sans; }";
        const errorLineCss = ".error { background-color: #db0025 }";
        const spanSelector = "const consoleSpan = document.getElementById('consoleQ');";
        const consoleLog = '(...args) => {let data = args.join(" "); let d = document.createElement("div"); d.innerHTML = data; consoleSpan.appendChild(d);}';
        const consoleError = '(...args) => {let data = args.join(" "); let d = document.createElement("div"); d.className = "error"; d.innerHTML = data; consoleSpan.appendChild(d);}';
        const consoleOverride = `var console = {log: ${consoleLog}, error: ${consoleError}, info: ${consoleLog}}`;
        const displayError = `window.onerror = (e) => console.error(e)`;
        return `<style>${mainCss}\n${lineCss}\n${errorLineCss}</style><span id="consoleQ"></span><script>${spanSelector} ${consoleOverride}\n${displayError}\n${editorValue}</script>`;
    }
    return (<>
    <NavBar onClick={() => {history.push("/")}} />
    <MainWrapper>
    <EditorWrapper>
        <CodeMirror value={editorValue} onChange={(e) => {setEditorValue(e.getValue())}}
            options={{
                theme: 'isotope',
                keyMap: 'sublime',
                mode: props.lang === "html" ? 'html' : 'js',
            }} />
    </EditorWrapper>
    <IFrameWrapper style={props.lang === "html" ? {} : { backgroundColor: "#27272a" }} srcDoc={props.lang === "html" ? editorValue : getJsWrapper()}/>
    </MainWrapper>
    <Bottom onClick={copyLinkToClipboard}>
        <AiOutlineShareAlt/>
    </Bottom>
    </>)
}

export default CodeCapsule;


const MainWrapper = styled.div`
    height: calc(100vh - 60px);
    width: 100%;
    margin-top: 60px;
    display: flex;
`;

const EditorWrapper = styled.div`
    background-color: black;
    height: 100%;
    border-radius: 0px;
    width: 50vw;
`;

const IFrameWrapper = styled.iframe`
    height: 100%;
    border-radius: 0px;
    width: 50vw;
    background-color: white;
`;

const Bottom = styled.div`
    position: fixed;
    bottom: 0px;
    left: calc(50% - 40px);
    width: 80px;
    height: 50px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #18181a;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    transition: 1s;
    &:hover {
        color: #004fff;
        cursor: pointer;
    }
`;