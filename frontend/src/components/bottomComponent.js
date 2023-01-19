import styled from 'styled-components';
import { useState } from 'react'

const Button = styled.button`
margin: 0.5rem;
padding: 0.5rem;
    height:2rem;
    align-self: center;
    font-size: 1rem;
    font-weight: bold;
    &:hover{
        background:gray;
        cursor: pointer;
        }
`
const Div = styled.div`
    grid-template-columns: 15% 85%;
    display: grid;
    width: 100%;
    height: 10%;
    justify-items: center;
    background: gray;
    grid-auto-flow: column ;
`

const BottomComponent = ({ setShowCreatePage }) => {
    const [isShowing, setIsShowing] = useState(true)

    const handleShowCreatePage = () => {
        setShowCreatePage(isShowing);
        setIsShowing(!isShowing);
    }
    console.log(`before render BottomComponent`);
    return (
        <Div>
            <div></div>
            <Button type="button" onClick={() => handleShowCreatePage()}>{isShowing ? 'Make a Poll' : 'Return back'}</Button>
        </Div>
    )
}

export default BottomComponent;
