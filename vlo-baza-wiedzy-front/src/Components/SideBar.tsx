import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsBook, BsBookHalf, BsViewList } from 'react-icons/bs';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Spinner
} from "@chakra-ui/react";

export const SideBar = (props: any) => {
    const [dataIsLoading, setDataIsLoading] = useState(true);
    const [course, setCourse]: any = useState(null);
    const [articles, setArticles]: any = useState(null);
    useEffect(() => {
        loadCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const loadCourse = () => {
        fetch(`/api/v1/course/${props.courseId}`).then(res => res.json()).then(data => {
            setCourse(data.course);
            setArticles(data.articles);
            setDataIsLoading(false);
        }).catch(err => {
            console.error(err);
            alert("Ups! Coś poszło nie tak ...");
        });
    }
    return (<>
        <SideBodyDesktop>
            {dataIsLoading ?
                <Centered><Spinner size="xl" ></Spinner></Centered>
                : <>
                    <Title>
                        {course.name}
                    </Title>
                    {articles.map((item: any, index: number) => item["id_article"] === props.articleId ?
                        <ActiveArticleName key={index}><BsBookHalf style={{ display: "inline-block", marginRight: "15px" }} />{item.name}</ActiveArticleName>
                        :
                        <ArticleName onClick={() => {
                            props.onClick(item["id_article"])
                        }} key={index}><BsBook style={{ display: "inline-block", marginRight: "15px" }} />{item.name}</ArticleName>)
                    }
                </>}        
        </SideBodyDesktop>
        <BurgerMenuMobile>
            {dataIsLoading ?
                <Centered><Spinner size="xl" ></Spinner></Centered>
                : <>
                    <Menu autoSelect={false}>
                        <MenuButton as={Button}><BsViewList /></MenuButton>
                        <MenuList backgroundColor="#1B1B3A" borderColor="#044fff">
                            {articles.map((item: any, index: number) => item["id_article"] === props.articleId ?
                                <MenuItem _hover={{ backgroundColor: "#044fff" }} key={index}><BsBookHalf style={{ display: "inline-block", marginRight: "15px" }} />{item.name}</MenuItem>
                                :
                                <MenuItem _hover={{ backgroundColor: "#044fff" }} onClick={() => {
                                    props.onClick(item["id_article"])
                                }} key={index}><BsBook style={{ display: "inline-block", marginRight: "15px" }} />{item.name}</MenuItem>)
                            }
                        </MenuList>
                    </Menu>
                </>}
        </BurgerMenuMobile>
    </>)
}

const Title = styled.div`
    font-weight: 500;
    font-size: 15px;
    color: #fc952c;
    padding-left: 20px;
    padding-right: 10px;
    user-select: none;
`;

const ArticleName = styled.div`
    font-size: 16px;
    padding-left: 20px;
    padding-right: 15px;
    line-height: 35px;
    font-weight: 100;
    user-select: none;
    cursor: pointer;
`;

const ActiveArticleName = styled.div`
    font-size: 16px;
    padding-left: 20px;
    padding-right: 15px;
    line-height: 35px;
    font-weight: 500;
    user-select: none;
`;

const Centered = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SideBodyDesktop = styled.div`
    height: 100%;
    width: 270px;
    background-color: #182340; //#203663;
    padding-top: 15px;
    overflow-y: scroll;
    scrollbar-width: none;
    @media (max-width: 1276px) {
        display: none;
    }
`;

const BurgerMenuMobile = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    height: 60px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
    @media (min-width: 1277px) {
        display: none;
    }
`;

const Button = styled.button`
    font-size: 30px;
    outline: none;
    border: none;
`;