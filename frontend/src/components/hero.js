import styled from 'styled-components'
import { useState, useEffect, useCallback } from "react"
import { loadingStatus, restHelper } from "../helpers"
import LoadingIndicator from "../components/loadingIndicator";
import SingleQuestion from "../components/singleQuestion"
import AddQuestion from "../components/addQuestion"
import Links from "../components/links"

const DivSeparator = styled.div`
    grid-template-columns: 15% 85%;
    display: grid;
    width: 100%;
    height: 100%;
    justify-items: center;
    max-height: 75vh;
    overflow: hidden;
}
`
const DivWrapper = styled.div`
    width:100%;
    height:100%;
    grid-column: 2;
}
`

const Hero = ({ showCreatePage }) => {
    const [questions, setQuestions] = useState()
    const [selectedQuestion, setSelectedQuestion] = useState()
    const [loadingState, setLoadingState] = useState(loadingStatus.isLoading)

    const url = "/questions";
    const api = restHelper();

    useEffect(() => {
        console.log("Hero useEffect");
        getQuestions();
    }, [])

    const setSelectedQuestionWrapper = (updatedQuestion) => {
        if (updatedQuestion && updatedQuestion && updatedQuestion.id === selectedQuestion.id) return;
        setSelectedQuestion(updatedQuestion);
    };

    const updateQuestionWrapper = (updatedQuestion) => {
        if (!updatedQuestion || !questions) return
        const newQuestions = questions.map((question) => {
            if (question.id === updatedQuestion.id) {
                return updatedQuestion;
            } else
                return question;
        })

        setQuestions(newQuestions);
        setSelectedQuestion(updatedQuestion);
    };

    const setNewQuestionWrapper = (question) => {
        if (!question) return

        setQuestions([...questions, question]);
        setSelectedQuestion(question);
    };

    const setLoadingStateWrapper = (loadingState) => {
        setLoadingState(loadingState);
    };

    const getQuestions = useCallback(async () => {
        console.log("getQuestions");
        setLoadingState(loadingStatus.isLoading)
        try {
            const res = await api.get(url);
            if (res && res.questions) {
                console.log("server returned :" + res.questions.length + " questions");
                setQuestions(res.questions);
                setSelectedQuestion(res.questions[0]);
            }
            await setLoadingState(loadingStatus.loaded);

        } catch (error) {
            setLoadingState(loadingStatus.hasErrored);
            console.log(error);
        }

    }, []);

    console.log("before render Hero");
    return (
        loadingState !== loadingStatus.loaded ? <LoadingIndicator loadingState={loadingState} />
            :
            (<DivSeparator>
                {!showCreatePage ?
                    <Links questions={questions} setSelectedQuestion={setSelectedQuestionWrapper} />
                    : ''}
                {!showCreatePage ?

                    <SingleQuestion
                        question={selectedQuestion}
                        setLoading={setLoadingStateWrapper}
                        updateQuestion={updateQuestionWrapper} />

                    :
                    <DivWrapper>
                        <AddQuestion setNewQuestion={setNewQuestionWrapper} setLoading={setLoadingStateWrapper} />
                    </DivWrapper>
                }
            </DivSeparator>)
    )
};

export default Hero;

