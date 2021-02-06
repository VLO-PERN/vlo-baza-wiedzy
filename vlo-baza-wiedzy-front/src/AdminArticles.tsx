import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import JwtContext from './Components/JwtContext';
import { NavBar } from './Components/NavBar';
import {
    Spinner
} from "@chakra-ui/react";
import styled from 'styled-components';
import { AdminArticle } from './Components/AdminArticle';
import { BsPlus } from "react-icons/bs";
import { Dialog } from './Components/Dialog';

export default function AdminArticles(props: any) {
    const jwtContext = useContext(JwtContext);
    const history = useHistory();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categoryId, courseId }: any = useParams();
    useEffect(() => {
        if (jwtContext.token === null) {
            history.push('/admin/login');
        } else {
            fetchCourse(courseId);
        }
    }, [jwtContext, history, courseId]);
    const [isLoading, setIsLoading] = useState(true);
    const [course, setCourse]: any = useState(null);
    const fetchCourse = (id: number) => {
        fetch(`/api/v1/course/${id}`).then(res => res.json()).then(data => {
            setCourse(data);
            setIsLoading(false);
        }).catch(err => {
            console.error(err);
            alert("Ups! Coś poszło nie tak ...");
        });
    }
    const editArticle = (articleId: number) => {
        history.push(`/admin/article/${articleId}`);
    }
    const [asking, setAsking] = useState(false);
    const [toDelete, setToDelete] = useState(0);
    const deleteArticleStarter = (articleId: number) => {
        setToDelete(articleId);
        setAsking(true);
    }
    const deleteArticle = (articleId: number) => {
        setIsLoading(true);
        fetch(`/api/v1/article/${articleId}`, {
            method: 'DELETE',
            headers: [
                ['Authorization', `somerandomword ${jwtContext.token}`]
            ]
        }).then(() => {
            fetchCourse(courseId);
        })
            .catch(err => {
                console.error(err);
                alert('Ups! Coś poszło nie tak ...');
        })
    }
    return (<>
        {asking ? <Dialog name={"Usuwanie artykułu"} onCancel={() => {setAsking(false)}} onConfirm={() => { deleteArticle(toDelete) }} ></Dialog> : <></>}
        <NavBar />
        <Wrapper>
            {isLoading ? <Center><Spinner size="xl" ></Spinner></Center> : <>
                <Title>{course.course["name"]} - Artykuły</Title>
                <CenterRelative>
                    <CoursesFlex>
                        {course.articles.map((item: any, index: number) =>
                            <AdminArticle key={index} id={item["id_article"]} name={item.name} onClick={editArticle} onDelete={deleteArticleStarter}  />
                        )}
                        <AddArticle onClick={() => { history.push(`/admin/course/${courseId}/article/add`) }}>
                            <BsPlus/>
                        </AddArticle>
                    </CoursesFlex>
                </CenterRelative>
            </>}
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

const CoursesFlex = styled.div`
    width: calc(100% - 30px);
    max-width: 1000px;
    margin-left: 15px;
    margin-bottom: 50px;
`;

const Title = styled.div`
    font-weight: 100;
    font-size: 54px;
    text-align: center;
    margin-top: calc(60px + 3vw);
    margin-bottom: calc(30px + 2vw);
`;

const AddArticle = styled.div`
    position: relative;
    height: 50px;
    width: 100%;
    border-radius: 8px;
    background-color: #004fff;
    color: white;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    transition: 0.4s;
    &:hover{
        background-color: #0032c9;
    }
`;