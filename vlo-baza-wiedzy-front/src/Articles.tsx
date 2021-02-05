import React, { useState, useEffect, Suspense, useRef } from 'react';
import { NavBar } from './Components/NavBar';
import { useHistory, useParams } from 'react-router-dom';
import { SideBar } from './Components/SideBar';
import styled from 'styled-components';
import { Spinner } from '@chakra-ui/react';
import './Css/Markdown-dark.css';
import { Footer } from './Components/Footer';
const ReactMarkdownWithHtml = React.lazy(() => import('react-markdown/with-html'));


const Articles = (props: any) => {
    const displayDivRef = useRef<HTMLDivElement>(null);
    const history = useHistory();
    const { courseId, articleId }: any = useParams();
    const [articleIsLoading, setArticleIsLoading] = useState(true);
    const [article, setArticle]: any = useState(null);
    useEffect(() => {
        loadArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articleId]);
    const loadArticle = () => {
        fetch(`/api/v1/article/${articleId}`).then(res => res.json()).then(data => {
            setArticle(data.article);
            setArticleIsLoading(false);
            if (displayDivRef.current !== null) {
                displayDivRef.current.scrollTop = 0;
            }
        }).catch(err => {
            console.error(err);
            alert("Ups! Coś poszło nie tak ...");
        });
    }
    const goToArticle = (id: number) => {
        history.push(`/course/${courseId}/${id}`);
    }
    return (<>
        <NavBar onClick={() => {
            history.push(`/#bottom`);
        }} />
        <CourseBody>
            <SideBar onClick={goToArticle} courseId={courseId} articleId={articleId} />
            {articleIsLoading ?
                <Centered>
                    <Spinner size="xl" ></Spinner>
                </Centered> :
                <Suspense fallback={<Centered><Spinner size="xl" ></Spinner></Centered>}>
                    <Centered>
                    <DisplayDiv ref={displayDivRef} className={"markdown-body"}>
                        <ReactMarkdownWithHtml allowDangerousHtml source={`# ${article.name}\n${article.contents}`} />
                        <Footer/>
                    </DisplayDiv>
                    </Centered>
                </Suspense>}
        </CourseBody>
    </>)
}

export default Articles;

const Centered = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DisplayDiv = styled.div`
    height: 100%;
    width: 100%;
    padding-left: 20%;
    padding-right: 20%;
    padding-top: 30px;
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: rgb(52 52 102 / 40%) transparent;
    ::-webkit-scrollbar-thumb {
        background-color: rgb(52 52 102 / 40%);
        border-radius: 8px;
    }
    @media (max-width: 650px) {
        padding-left: 30px;
        padding-right: 30px;
    }
    &::-webkit-scrollbar {
        display: block;
        width: 10px;
    }
`;

const CourseBody = styled.div`
    display: flex;
    height: calc(100vh - 60px);
    margin-top: 60px;
    width: 100vw;
`;