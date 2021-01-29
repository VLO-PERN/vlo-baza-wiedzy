import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { NavBar } from './Components/NavBar';
import {
    Spinner
} from "@chakra-ui/react";
import styled from 'styled-components';
import { Course } from './Components/Course';

const Courses = (props: any) => {
    const history = useHistory();
    const { id }: any = useParams();
    useEffect(() => {
        fetchCategory(id);
    }, [history, id]);
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory]: any = useState(null);
    const fetchCategory = (id: number) => {
        fetch(`/api/v1/category/${id}`).then(res => res.json()).then(data => {
            setCategory(data);
            setIsLoading(false);
        }).catch(err => {
            console.error(err);
            alert("Ups! Coś poszło nie tak ...");
        });
    }
    const goToCourse = (courseId: number) => {
        setIsLoading(true);
        fetch(`/api/v1/course/${courseId}`).then(res => res.json()).then(data => {
            setIsLoading(false);
            if (data.articles.length === 0) {
                alert("Ten kurs nie ma jeszcze żadnych artykułów!");
                return;
            }
            history.push(`/course/${courseId}/${data.articles[0]["id_article"]}`);
        }).catch(err => {
            console.error(err);
            alert("Ups! Coś poszło nie tak ...");
        });
    }

    return (<>
        <NavBar onClick={() => {
            history.push(`/`);
        }} />
        <Wrapper>
            {isLoading ? <Center><Spinner size="xl" ></Spinner></Center> : <>
                <Title>{category.category["category_name"]} - kursy</Title>
                <CenterRelative>
                    <CoursesFlex>
                        {category.courses.map((item: any, index: number) =>
                            <Course key={index} id={item["id_course"]} name={item.name} onClick={goToCourse} />
                        )}
                    </CoursesFlex>
                </CenterRelative>
            </>}
        </Wrapper>
    </>)
}

export default Courses;

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
    background-color: #1B1B3A;
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