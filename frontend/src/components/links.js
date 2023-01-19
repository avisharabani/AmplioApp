import styled from 'styled-components';

const Row = styled.li`
    list-style: none;
    display: flex;
    margin: 1px;
    height: 40px;
    font-size: .7rem;
    border: 1px solid;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 10px 0px 10px;
    &:hover{
        background:gray;
        cursor: pointer;
        }
`
const List = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const ListHolder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: auto;
    max-height: 85vh;
`

const Links = ({ questions, setSelectedQuestion }) => {
    console.log(`before render Links`);
    return (
        <ListHolder>
            <List>
                {questions &&
                    questions.map((question) => (
                        <Row key={question.id} onClick={() => setSelectedQuestion(question)}>
                            {question.contentText.slice(0, 40)}...
                        </Row>
                    ))}
            </List>
        </ListHolder>
    )
}

export default Links;
