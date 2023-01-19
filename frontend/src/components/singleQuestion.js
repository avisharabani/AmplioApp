import Choices from './choices'
import styled from 'styled-components'
import {loadingStatus} from "../helpers"
import LoadingIndicator from "./loadingIndicator"
import { AiOutlineLink } from 'react-icons/ai'
import configData from "../configData.json";

const Title = styled.label`
    display: flex;
    text-align: center;
    font-size:1rem;
    font-weight:bold;
   }
`
const Section = styled.section`
    display: flex;
    border: 1px solid;
    padding: 10px;
    width: 50%;
    overflow-y: auto;
    flex-direction: column;
`
const SingleQuestion = ({ updateQuestion, question, setLoading }) => {

    const clientUrl = configData.ClIENT_URL;

    const updateVotes = (newVote) => {
        if (!updateQuestion || !newVote) return;

        let newQuestion = JSON.parse(JSON.stringify(question));
        newQuestion.votes = newQuestion.votes.filter((vote) => vote.id !== question.selectedChoice.voteId);
        newQuestion.votes.push(newVote); 
        newQuestion.numOfChoices = newQuestion.choices.length;
        newQuestion.selectedChoice = { choiceId: newVote.choiceId, voteId: newVote.id, numOfVotes: newVote.numOfVotes };

        updateQuestion(newQuestion);
    }

    const updateSelectedChoice = (selectedChoice) => {
        if (!updateQuestion || !selectedChoice) return

        let newQuestion = JSON.parse(JSON.stringify(question));
        newQuestion.selectedChoice = selectedChoice;

        updateQuestion(newQuestion);
    }

    console.log(`before render SingleQuestion`);
    return (
        <>
            {question ?
                <Section>
                    <Title onClick={() => navigator.clipboard.writeText(`${clientUrl}/questions/${question.id}`)}>
                        {question.contentText}  <AiOutlineLink className='icon-add' title='Click to copy link'/>
                    </Title>

                    <Choices key={question.id} 
                        updateVotes={updateVotes}
                        choices={question.choices}
                        selectedChoice={question.selectedChoice}
                        votes={question.votes}
                        setLoading={setLoading}
                        updateSelectedChoice={updateSelectedChoice}
                    />
                </Section>
                :
                <LoadingIndicator loadingState={loadingStatus.isLoading} />
            }
        </>
    )
}

export default SingleQuestion;

