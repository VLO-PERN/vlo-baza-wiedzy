import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import JwtContext from './Components/JwtContext';
import { NavBar } from './Components/NavBar';
import {
    Spinner
} from "@chakra-ui/react";
import styled from 'styled-components';
import { AdminCourse } from './Components/AdminCourse';
import { AddCourse } from './Components/AddCourse';
import { Dialog } from './Components/Dialog';
import { BsClipboard, BsFillTrash2Fill } from 'react-icons/bs';

export default function AdminCourses(props: any) {
    const jwtContext = useContext(JwtContext);
    const history = useHistory();
    const { id }: any = useParams();
    useEffect(() => {
        if (jwtContext.token === null) {
            history.push('/admin/login');
        } else {
            fetchCategory(id);
        }
    }, [jwtContext, history, id]);
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
    const sendAddCourse = (courseName: string) => {
        setIsLoading(true);
        fetch('/api/v1/course', {
            method: 'POST',
            headers: [['Content-Type', 'application/json'],
            ['Authorization', `randomwordthatnobodycaresabout ${jwtContext.token}`]],
            body: JSON.stringify({
                categoryId: id,
                name: courseName
            })
        }).then(() => {
            fetchCategory(id);
        }).catch(err => {
            console.error(err);
            alert('Ups! Coś poszło nie tak ...');
        });
    };
    const goToCourse = (courseId: number) => {
        history.push(`/admin/category/${id}/courses/${courseId}/articles`);
    }
    const sendEditCourse = (courseId: number, newName: string) => {
        setIsLoading(true);
        fetch(`/api/v1/course/${courseId}`, {
            method: 'PUT',
            headers: [['Content-Type', 'application/json'],
            ['Authorization', `randomwordthatnobodycaresabout ${jwtContext.token}`]],
            body: JSON.stringify({
                name: newName
            })
        }).then(() => {
            fetchCategory(id);
        }).catch(err => {
            console.error(err);
            alert('Ups! Coś poszło nie tak ...');
        });
    }
    const [asking, setAsking] = useState(false);
    const [toDelete, setToDelete] = useState(0);
    const deleteCourseStarter = (courseId: number) => {
        setToDelete(courseId);
        setAsking(true);
    }
    const deleteCourse = (articleId: number) => {
        setIsLoading(true);
        fetch(`/api/v1/course/${articleId}`, {
            method: 'DELETE',
            headers: [
                ['Authorization', `somerandomword ${jwtContext.token}`]
            ]
        }).then(() => {
            fetchCategory(id);
        })
            .catch(err => {
                console.error(err);
                alert('Ups! Coś poszło nie tak ...');
        })
    }
    const [askingCategory, setAskingCategory] = useState(false);
    const deleteCategoryStarter = () => {
        setAskingCategory(true);
    }
    const deleteCategory = () => {
        setIsLoading(true);
        fetch(`/api/v1/category/${id}`, {
            method: 'DELETE',
            headers: [
                ['Authorization', `somerandomword ${jwtContext.token}`]
            ]
        }).then(() => {
            history.goBack();
        })
            .catch(err => {
                console.error(err);
                alert('Ups! Coś poszło nie tak ...');
        })
    }
    return (<>
        {asking ? <Dialog name={"Usuwanie kursu"} onCancel={() => { setAsking(false) }} onConfirm={() => { deleteCourse(toDelete) }} ></Dialog> : <></>}
        {askingCategory ? <Dialog name={"Usuwanie całej kategori"} onCancel={() => {setAskingCategory(false)}} onConfirm={() => { deleteCategory() }} ></Dialog> : <></>}
        <NavBar />
        <Wrapper>
            {isLoading ? <Center><Spinner size="xl" ></Spinner></Center> : <>
                <Title>{category.category["category_name"]} - kursy</Title>
                <CenterRelative>
                    <CoursesFlex>
                        <DeleteCategory onClick={deleteCategoryStarter} ><BsFillTrash2Fill/></DeleteCategory>
                        <EditCategory onClick={() => {history.push(`/admin/category/${id}/edit`)}} ><BsClipboard/></EditCategory>
                        {category.courses.map((item: any, index: number) =>
                            <AdminCourse key={index} id={item["id_course"]} name={item.name} onClick={goToCourse} onEdit={sendEditCourse} onDelete={deleteCourseStarter} />
                        )}
                        <AddCourse onAdd={sendAddCourse}/>
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

const EditCategory = styled.div`
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

const DeleteCategory = styled.div`
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
        background-color: #ff0055;
    }
`;