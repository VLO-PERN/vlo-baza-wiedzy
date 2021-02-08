import React, { useState, FormEvent, useEffect } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { useParams} from 'react-router-dom';
import styled, {keyframes} from 'styled-components';

const Exercise = (props: any) => {
    interface expectedJson {
        title: string,
        text: string,
        code: string,
        correctAnswer: string
    }
    
    const {id}: any = useParams();
    const [data, setData] = useState<expectedJson>();
    const [answer, setAnswer] = useState("");
    const [answerState, setAnswerState] = useState<"pending" | "correct" | "failed">("pending");
    const checkAnswer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (answer === data?.correctAnswer) {
            setAnswerState("correct");
        } else {
            setAnswerState("failed");
        }
    }
    useEffect(() => {
        try {
            setData(JSON.parse(id));
        } catch {
            alert("Wystąpił problem podczas wczytywania danych zadania!");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (<>
    {data ? answerState === "pending" ?
    <MainWrapper>
        <Title>{data.title}</Title>
        <Text>{data.text}</Text>
        <Code>
            {data.code}
        </Code>
        <Form onSubmit={checkAnswer}>
            <Input placeholder="Odpowiedź" value={answer} onChange={(e) => {setAnswer(e.target.value)}} ></Input>
            <Submit>Sprawdź</Submit>
        </Form>
    </MainWrapper>
    : answerState === "correct" ?
    <Correct>
        <AiOutlineCheckCircle/>
        <CorrectText>Poprawna odpowiedź!</CorrectText>
    </Correct>
    :
    <MainWrapper>
        <Failed>
            <AiOutlineCloseCircle/>
            <FailedText>Niepoprawna odpowiedź!
            <FailedSolution>Poprawna odpowiedź to: {data.correctAnswer}</FailedSolution>
            </FailedText>
        </Failed>
    </MainWrapper>
    : <></>}
    </>)
}

export default Exercise;

const Form = styled.form`
    position: absolute;
    bottom: 0px;
    left: 30px;
    width: calc(100% - 50px);
    height: 60px;
    display: flex;
    justify-content: space-between;
`;

const Input = styled.input`
    height: 45px;
    border-radius: 8px;
    background-color: #18181a;
    outline: none;
    padding-left: 10px;
    padding-right: 10px;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-left: 30px;
    padding-top: 20px;
`;

const Text = styled.div`
    font-size: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 30px;
    width: calc(100% - 60px);
`;

const MainWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #27272a;
    border-radius: 8px;
    user-select: none;
`;

const FadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const Correct = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #27272a;
    border-radius: 8px;
    user-select: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 80px;
    padding-left: 80px;
    color: #00ff62;
    animation: 0.5s ${FadeIn};
`;

const Failed = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #27272a;
    border-radius: 8px;
    user-select: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 80px;
    padding-left: 80px;
    color: #ff004c;
    animation: 0.5s ${FadeIn};
`;

const CorrectText = styled.div`
    font-size: 25px;
    font-weight: 700;
    color: white;
    padding-left: 80px;
`;

const FailedText = styled.div`
    font-size: 25px;
    font-weight: 700;
    color: white;
    padding-left: 80px;
`;

const FailedSolution = styled.div`
    font-size: 15px;
    color: white;
`;

const Code = styled.code`
    margin-left: 30px;
    margin-right: 30px;
    background-color: #090705;
    padding: 8px;
    border-radius: 8px;
`;

const Submit = styled.button`
    height: 45px;
    width: 130px;
    border-radius: 5000px;
    color: white;
    background-color: #0044ff;
    outline: none;
    transition: 1s;
    &:hover {
        background-color: #0038d3;
    }
`;