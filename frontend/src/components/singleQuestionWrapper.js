import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LoadingIndicator from './loadingIndicator'
import SingleQuestion from './singleQuestion'
import { restHelper, loadingStatus } from '../helpers'
import { Link } from 'react-router-dom'

const SingleQuestionWrapper = () => {
    const [question, setQuestion] = useState();
    const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);
    const { questionId } = useParams();
    const url = "/questions/";
    const api = restHelper();

    useEffect(() => {
        if (question) return;
        getQuestion();
    }, [])

    const setLoadingStateWrapper = (loadingState) => {
        setLoadingState(loadingState);
    };

    const getQuestion = async () => {
        console.log('get one question');
        setLoadingState(loadingStatus.isLoading);
        try {
            const res = await api.get(url + questionId);
            if (res && res.question) {
                console.log(`server returned the question: ${res.question.contentText}`);
                setQuestion(res.question);
            }
            await setLoadingState(loadingStatus.loaded);

        } catch (error) {
            setLoadingState(loadingStatus.hasErrored);
            console.log(error);
        }
    };
    console.log(`before render SingleQuestionWrapper`);

    return (
        <>
            {question ?
                <>
                    <SingleQuestion
                        question={question}
                        setLoading={setLoadingStateWrapper}
                        updateQuestion={undefined}
                        setQuestionById={undefined} />
                    <Link to="/"> back home </Link>
                </>
                :
                <LoadingIndicator loadingState={loadingState} />
            }
        </>
    )
}

export default SingleQuestionWrapper;

