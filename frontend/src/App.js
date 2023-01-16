import { useState } from 'react';
import Question from './components/question';
import QuestionList from './components/questionList';
import './App.css';
import styled from 'styled-components'
import useQuestions from './hooks/useQuestions';
import loadingStatus from "./helpers/loadingStatus";
import LoadingIndicator from "./components/loadingIndicator";

const Main = styled.div`
    height: 100vh;
    background-color: gray;
     display: flex;
     align-items: center;
     justify-content: center;
     flex-direction: column;
`
const Box = styled.div`
    height: calc(90vh - 3rem);
    width: 90vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-items: stretch;
    background-color: white;
    border-radius:15px
`
const Seciton = styled.div`
    max-height: 99%;
    width: 50%;
    overflow: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    background-color: green;
    `
const Title = styled.label`
   font-size:2rem;
   margin: 0.5rem;
`


const App = () => {
  const { questions, loadingState, setSelectedQuestionWrapper, selectedQuestion } = useQuestions();
  if (loadingState !== loadingStatus.loaded) {
    return <LoadingIndicator loadingState={loadingState} />
  }

  return (
    <Main>
      <Title>Question Polls</Title>
      <Box>
        <Seciton>
          <QuestionList questions={questions} setQuestion={setSelectedQuestionWrapper} />

        </Seciton>
        <Seciton>
          <Question question={selectedQuestion} />

        </Seciton>
      </Box>
    </Main>
  );
};

export default App;

