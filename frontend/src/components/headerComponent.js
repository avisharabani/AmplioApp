import styled from "styled-components";

const Div = styled.div`
    grid-template-columns: 15% 85%;
    display: grid;
    width: 100%;
    height: 10%;
    justify-items: center;
    background: gray;
`
const Title = styled.label`
    font-size:2rem;
    margin: 0.5rem;
    grid-column:2;
`


const HeaderComponent = ({ title }) => {
    console.log(`before render HeaderComponent`);
    return (
        <Div>
            <Title>{title}</Title>
        </Div>
    )
}

export default HeaderComponent;
