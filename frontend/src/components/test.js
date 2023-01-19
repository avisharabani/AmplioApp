import { useState } from 'react'
import { restHelper, loadingStatus } from "../helpers"
import theme from 'styled-theming'
import styled, { ThemeProvider } from 'styled-components'
import { AiOutlineCheckCircle } from 'react-icons/ai'


const RowBackgroundColor = theme('mode', {
    light: '#fff',
    dark: 'gray',
})

const List = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-inline-start: 0px;
`
const Row = styled.li`
    background: ${RowBackgroundColor};
    text-align: center;
    list-style: none;
    margin:5px;
    border: 1px solid;
    &:hover{
        background:gray;
        cursor: pointer;
        }
`
const Title = styled.label`
    display: flex;
    margin: 10px;
    font-size: 1rem;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    &:hover{
        background:gray;
        cursor: pointer;
   }
`
const Button = styled.button`
    width:50%;
    height:2rem;
    align-self: center;
    font-size: 1rem;
    font-weight: bold;
    &:hover{
        background:gray;
        cursor: pointer;
        }
`
const Span = styled.span`
    display: flex;
    justify-content:space-between;
    height:2rem;
    margin-left:10px;
`

const Choices = ({ updateSelectedChoice, updateVotes, choices, selectedChoice, setLoading }) => {
    //  const [selectedRow, setSelectedRow] = useState({ choiceId: '', voteId: '' })
    const [isUserSelectChoice, setIsUserSelectChoice] = useState(false)
    const url = "/votes/";
    const api = restHelper();

   

    // useEffect(() => {
    //     setSelectedRow(selectedChoice);
    // }, [])

    const handleVote = async () => {
        await createVote(selectedChoice.choiceId);
        updateVotes();
    } 
    // const handleVote = async () => {
    //     if (selectedChoice) {
    //         if (selectedChoice.choiceId && selectedChoice.choiceId !== selectedRow.choiceId) {
    //             await deleteVote(selectedChoice.voteId)
    //         } else if (selectedChoice.choiceId === selectedRow.choiceId) return;
    //     }
    //     const newVote = await createVote(selectedRow.choiceId);
    //     updateVotes(newVote)
    // }

    const createVote = async (choiceId) => {
        try {
            setLoading(loadingStatus.isLoading);
            const body = { choiceId: choiceId };
            const res = await api.postCreate(url, { body });

            if (res && res.vote) {
                console.log("vote created");
            } else if (res && res.msg) {
                console.log("created vote failed! " + res.msg);//TODO: putUpdate
            }
            setLoading(loadingStatus.loaded);
            return res.vote;

        } catch (error) {
            setLoading(loadingStatus.hasErrored);
            console.log(error);
        }
    };

    const deleteVote = async (voteId) => {
        try {
            setLoading(loadingStatus.isLoading);
            const res = await api.deleteData(url + voteId);

            if (res && res.msg) {
                console.log(res.msg);
                setLoading(loadingStatus.loaded);
            }

        } catch (error) {
            console.log(error);
            setLoading(loadingStatus.hasErrored);
        }
    };

    console.log('before rendered Choices');
    return (
        <>
            <List>
                {choices &&
                    choices.map((choice, i) => (
                        <ThemeProvider key={choice.id} theme={{
                            mode: ((selectedChoice && selectedChoice.choiceId === choice.id) ? 'dark' : 'light')
                        }}>

                            <Row onClick={() => {
                                const selectedChoiceObject = { choiceId: choice.id, questionId: choice.questionId, numOfVotes: choice.numOfVotes };
                                updateSelectedChoice(selectedChoiceObject)
                                console.log(`choiceId: ${choice.id}, questionId: ${choice.questionId}`)
                                setIsUserSelectChoice(true);
                            }}>
                                <Span>
                                    <Title>
                                        {i + 1})&nbsp;{choice.contentText}&nbsp;{selectedChoice && selectedChoice.choiceId === choice.id ? <AiOutlineCheckCircle /> : ''}
                                    </Title>
                                    {choice && choice.numOfVotes}
                                </Span>
                            </Row>
                        </ThemeProvider>
                    ))}

            </List>
            {isUserSelectChoice ?
                <Button type="button" onClick={() => handleVote()}>Check rates</Button>
                :
                <></>
            }
        </>
    )
}

export default Choices;

{/* <ThemeProvider key={choice.id} theme={{
    mode: ((selectedRow && selectedRow.choiceId === choice.id) ? 'dark' : 'light')
}}>

    <Row onClick={() => setSelectedRow({ choiceId: choice.id, questionId: choice.questionId })}>
        <Title>{choice.contentText}&nbsp;{selectedRow && selectedRow.choiceId === choice.id ? <AiOutlineCheckCircle /> : ''}</Title>
    </Row>
</ThemeProvider> */}