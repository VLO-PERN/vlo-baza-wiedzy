import React from 'react';
import styled, {keyframes} from 'styled-components';
import { useHistory } from 'react-router';
import { LandingNavbar } from './Components/LandingNavbar';
import { useCategory } from './Hooks/useCategory';
import {
    Spinner
} from "@chakra-ui/react";
import { LandingCategoryCard } from './Components/LandingCategoryCard';
import { BsChevronDown } from 'react-icons/bs';
import AnimatedBg from './Assets/AnimatedBg.svg';

export const Landing = (props: any) => {
    const history = useHistory();
    const [categories, categoriesAreLoading] = useCategory();
    return (
        <>
            <Hero>
            <LandingNavbar />
                    <Top>
                        <div>
                        <Title>Wydajniejsza nauka</Title>
                        <Text>Przyjemniejszy sposób</Text>
                        </div>
                    </Top>
                    <ArrowDimmer>
                    <Arrow href="#bottom">
                    <BsChevronDown></BsChevronDown>
                    </Arrow>
                    </ArrowDimmer>
                </Hero>
                <CategoryWrapper id="bottom">
                    {!categoriesAreLoading ?
                        <CategoryContainer>
                            {categories.map((item: any, index: number) =>
                            <LandingCategoryCard key={index} id={item["id_category"]} onClick={(id: number) => {history.push(`/category/${id}`)}} name={item["category_name"]} img={item["picture_url"]} />
                        )}
                        </CategoryContainer>
                        : <CenterRelative>
                            <Spinner marginTop="50px" size="xl" ></Spinner>
                        </CenterRelative>}
                </CategoryWrapper>
            <Bg></Bg>
        </>
    )
}


const Bg = styled.div`
    background-color:  #18181a;
    background-image: url(${AnimatedBg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(3px);
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    bottom: 0px;
    opacity: 0.7;
    z-index: 0;
`;

const Hero = styled.section`
    height: 100vh;
    width: 100%;
    z-index: 5;
    position: relative;
`;

const CenterRelative = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #18181a;
`;

const FadeIn = keyframes`
    0% {
        opacity: 0;
    }
    66% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const Title = styled.div`
    font-size: calc(22px + 1.5vw);
    font-weight: 700;
    padding: calc(5px + 1vw);
    padding-top: 50px;
    text-align: center;
    animation: 3s ${FadeIn} ease;
`;

const Text = styled.div`
    font-size: 1.5vw;
    font-weight: 100;
    padding: calc(10px + 1vw);
    padding-top: 0px;
    text-align: center;
    animation: 3.6s ${FadeIn} ease;
    @media (max-width: 1280px) {
        font-size: calc(10px + 1.5vw);
    }
`;

const Top = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CategoryWrapper = styled.div`
    background-color: #18181a;
    z-index: 5;
    position: relative;
    opacity: 1;
`;


const CategoryContainer = styled.div`
`;

const ArrowBounce = keyframes`
    0% {
        padding: 30px;
        opacity: 1;
    }
    50% {
        padding: 80px;
        opacity: 1;
    }
    100% {
        padding: 30px;
        opacity: 1;
    }
`;

const Arrow = styled.a`
    font-size: 30px;
    display: flex;
    justify-content: center;
    padding: 30px;
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
    animation: 2s ${ArrowBounce} infinite ease;
    animation-delay: 3.5s;
`;

const ArrowFadeIn = keyframes`
0% {
    opacity: 0;
}
75% {
    opacity: 0;
}
100% {
    opacity: 1;
}
`;

const ArrowDimmer = styled.div`
    animation: 3.5s ${ArrowFadeIn} ease;
`;