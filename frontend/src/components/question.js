import styled from 'styled-components'

const Card = styled.div`
    margin:20px;
    display: flex;
    flex-direction: column;  
`
const Title = styled.label`
    display: flex;
    text-align: center;
   font-size:1rem;
   font-weight:bold;
`
const Row = styled.li`
    margin:20px;
    list-style: none;
    border: 1px solid;
    padding:10px;
    border-radius:10px;
      &:hover{
      background:gray;
      cursor: pointer;
  }
`
const ChoiceNum = styled.h6`
    font-size:0.6rem;
    align-self: center;
`

const Question = ({ question }) => {
    return (
        <>
            {question &&
                <Card >
                    <Title>{question.contentText}</Title>
                    <ChoiceNum>{question.numOfChoice} Choices:</ChoiceNum>
<ul>
                    {question.choices.map(choice => (
                        <Row>
                            <label>{choice.contentText}</label>
                            <label> numOfVotes: {choice.numOfVotes}</label>
                        </Row>
                    ))}
</ul>
                </Card>}
        </>
    )
}

export default Question;
