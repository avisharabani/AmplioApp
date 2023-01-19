import styled from 'styled-components'
import { useState } from 'react'
import { restHelper, loadingStatus } from "../helpers"
import { IoMdAddCircleOutline } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const Form = styled.form`
    display: flex;
    width: 60%;
    height: 100%;
    flex-direction: column;
    align-items: stretch;
    overflow-y: auto;
    margin:10px;
    background: #ebedf0;
}
`
const FormContent = styled.div`
    margin: 0.5rem 0;
    display: flex;
    align-items: stretch;
    flex-direction: column;
}
`
const Span = styled.span`
    background: lightgray;
    display: flex;
    justify-content:flex-start;
    height:2rem;
    margin: 2px
`
const Section = styled.section`
    max-height: 76vh;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 17px;
    
    `
const Title = styled.label`
    display: flex;
    text-align: center;
    font-size:1rem;
    font-weight:bold;
    `

const ButtonCreate = styled.button`
    width:40%;
    height:2rem;
    margin-bottom:150px;
    align-self: center;
    font-size: 1rem;
    font-weight: bold;
    &:hover{
        background:gray;
        cursor: pointer;
        }
`
const ButtonContinue = styled.button`
    width:40%;
    height:2rem;
    align-self: center;
    font-size: 1rem;
    font-weight: bold;
    &:hover{
        background:gray;
        cursor: pointer;
        }
`

const AddQuestion = ({ setNewQuestion, setLoading }) => {
    const [questionText, setQuestionText] = useState('');
    const [choiceText, setChoiceText] = useState('');

    const [showContinueButton, setShowContinueButton] = useState(false);
    const [lockText, setLockText] = useState(true);

    const [validationMessages, setValidationMessages] = useState([]);
    const [choices, setChoices] = useState([]);

    const api = restHelper()
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        validateForm();
        if (validationMessages.length > 0) return;

        addQuestionToList({ contentText: questionText })
        setQuestionText('');
    };

    const addQuestionToList = async (body) => {
        try {
            setLoading(loadingStatus.isLoading)
            const res = await api.postCreate('/questions', { body: body })

            if (res && res.question) {
                console.log('Question created')
                const newQuestion = res.question;

                const choicesBody = { choicesCollection: [] };
                choices.forEach(text => {
                    choicesBody.choicesCollection.push({
                        questionId: newQuestion.id,
                        contentText: text
                    })
                });

                const resOfChoices = await api.postCreate('/choices/many', { body: choicesBody })
                if (resOfChoices && resOfChoices.choices) {
                    console.log('Choices created');
                    newQuestion.choices = resOfChoices.choices;
                    newQuestion.votes = [];
                    newQuestion.selectedChoice = '';

                    setNewQuestion(newQuestion);
                    navigate('/');
                }
            }
            setLoading(loadingStatus.loaded);
        } catch (error) {
            setLoading(loadingStatus.loaded);
            console.log(error);
        }
    };

    const handleContinue = () => {
        setLockText(!lockText);
    }

    const handleQuestionChange = (event) => {
        setQuestionText(event.target.value);
        validateForm();
        setShowContinueButton(true);
    }


    const handleChoiceChange = (event) => {
        setChoiceText(event.target.value);
        validateForm();
        setShowContinueButton(true);
    }

    const validateForm = () => {
        setValidationMessages([]);
        let messages = [];

        if (!questionText) {
            messages.push('Please enter question');
        } else if (questionText.length < 5) {
            messages.push('Please enter question with a length of 5 characters');
        } else if (!lockText && choiceText.length < 2) {
            messages.push('Please enter choice with a length of 2 characters');
        }

        setValidationMessages(messages);
    }

    const addChoice = () => {
        if (choiceText < 2 || validationMessages.length > 0) return;
        setChoices([...choices, choiceText]);
        setChoiceText(() => ' ');
    }
    console.log(`before render AddQuestion`);
    return (
        < Section>
            <label>Add new Question</label>
            <Form onSubmit={handleSubmit}>
                <FormContent>
                    {lockText ?
                        <>
                            <Span>
                                <input
                                    className='input-group'
                                    type='text'
                                    name='questionTextInput'
                                    placeholder='Write a question here'
                                    value={questionText}
                                    onChange={(e) => handleQuestionChange(e)}
                                />
                            </Span>
                            {validationMessages.length === 0 && showContinueButton &&
                                <Span>
                                    <ButtonContinue type='button' onClick={handleContinue}>continue</ButtonContinue>
                                </Span>
                            }
                        </>
                        :
                        <Span>
                            <Title>Question: {questionText}?</Title>
                        </Span>
                    }
                    {choices && choices.map((choice, i) =>
                        <Span key={choice + i}>
                            <label><strong>{i + 1})</strong> {choice}</label>
                        </Span>)}
                    {!lockText &&
                        <Span>
                            <input className='input-group'
                                type='text'
                                value={choiceText}
                                placeholder={choices.length > 1 ? 'Write a choice here' : 'Write a choices, At least 2 should be added'}
                                name='choiceTextInput'
                                onChange={(e) => handleChoiceChange(e)}
                            />
                            < IoMdAddCircleOutline title='Add Choice' className='icon-create' onClick={addChoice} />
                        </Span>
                    }
                    {validationMessages.length > 0 &&
                        <Span>
                            <ul>
                                {validationMessages.map((message) => <li key={message}> {message}</li>)}
                            </ul>
                        </Span>
                    }
                </FormContent>
                {choices.length > 1 &&
                    <ButtonCreate type='submit'>add poll</ButtonCreate>
                }
            </Form>
        </Section>
    )

}

export default AddQuestion;
