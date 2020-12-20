import React, { useState, useEffect, Suspense } from 'react';
import { NavBar } from './Components/NavBar';
import { useHistory, useParams } from 'react-router-dom';
import { SideBar } from './Components/SideBar';
import styled from 'styled-components';
import { Spinner } from '@chakra-ui/react';
import './Css/Markdown-dark.css';
const ReactMarkdownWithHtml = React.lazy(() => import('react-markdown/with-html'));


const Articles = (props: any) => {
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
        }).catch(err => {
            console.error(err);
            alert("Ups! Coś poszło nie tak ...");
        });
    }
    const goToArticle = (id: number) => {
        history.push(`/course/${courseId}/${id}`);
    }
    return (<>
        <NavBar />
        <CourseBody>
            <SideBar onClick={goToArticle} courseId={courseId} articleId={articleId} />
            {articleIsLoading ?
                <Centered>
                    <Spinner size="xl" ></Spinner>
                </Centered> :
                <Suspense fallback={<Centered><Spinner size="xl" ></Spinner></Centered>}>
                    <Centered>
                    <DisplayDiv className={"markdown-body"}>
                        <ReactMarkdownWithHtml allowDangerousHtml source={`# ${article.name}\n${article.contents}`} />
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
    width: 60%;
    padding-top: 90px;
    overflow-y: scroll;
    scrollbar-width: none;
`;

const CourseBody = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
`;