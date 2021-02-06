import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import JwtContext from './Components/JwtContext';
import { NavBar } from './Components/NavBar';
import { useCategory } from './Hooks/useCategory';
import {
    Spinner
} from "@chakra-ui/react";
import styled from 'styled-components';
import { CategoryCard } from './Components/CategoryCard';
import { AddCategory } from './Components/AddCategory';

export default function AdminMain(props: any) {
    const [categories, areCategoriesLoading] = useCategory();
    const jwtContext = useContext(JwtContext);
    const history = useHistory();
    useEffect(() => {
        if (jwtContext.token === null) {
            history.push('/admin/login');
        }
    }, [jwtContext, history]);
    const addCategory = () => {
        history.push('/admin/category/add');
    }
    const goToCourses = (id: number) => {
        history.push(`/admin/category/${id}/courses/`);
    }
    return (<>
        <NavBar />
        {areCategoriesLoading ?
        <Center>
            <Spinner size="xl" />    
        </Center>
        : 
        <Wrapper>
            <Title>Kategorie</Title>
            <CenterRelative>
                    <CategoryContainer>
                        {categories.map((item: any, index: number) =>
                            <CategoryCard key={index} id={item["id_category"]} onClick={goToCourses} name={item["category_name"]} img={item["picture_url"]} />
                        )}
                        <AddCategory onClick={addCategory} />
                    </CategoryContainer>
            </CenterRelative>
        </Wrapper>
        }
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
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
    margin-top: calc(60px + 3vw);
    margin-bottom: calc(30px + 2vw);
`;

const CategoryContainer = styled.div`
    max-width: calc(100vmin - 30px);
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(180px, 180px));
    grid-gap: 15px;
`;