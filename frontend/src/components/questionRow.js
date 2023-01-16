import styled from 'styled-components'
import { ThemeProvider } from "styled-components";

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


const QuestionRow = ({ question, index, setQuestion }) => {
    if (!question) return;

    return (

        <Row onClick={() => setQuestion(question.id)}>
            question {index + 1} - {question.contentText}
        </Row>
    )
}

export default QuestionRow;
