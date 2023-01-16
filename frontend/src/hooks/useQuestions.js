import { useState, useEffect } from "react";
import useGetRequest from "./useGetRequest"
import configData from "../configData.json";
import DataApi from "../helpers/dataApi"

const useQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const { get, loadingState } = useGetRequest(configData.SERVER_URL + '/questions')
    const [selectedQuestion, setSelectedQuestion] = useState();

    const setSelectedQuestionWrapper = (id) => {
        setSelectedQuestion(questions[id]);
        console.log(questions[id])
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            const questions = await get();
            const api = new DataApi(questions)
            setQuestions(api.getQuestions());
            setSelectedQuestion(questions[0]);
        }
        fetchQuestions();

    }, [get])


    return { questions, loadingState, setSelectedQuestionWrapper, selectedQuestion };
}

export default useQuestions;