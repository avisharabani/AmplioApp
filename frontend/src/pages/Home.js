import React from 'react'
import BottomComponent from '../components/bottomComponent'
import HeaderComponent from '../components/headerComponent'
import Hero from '../components/hero'
import styled from 'styled-components';
import { useState } from "react"

const Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height:95vh;
`
export default function Home() {
  const [showCreatePage, setShowCreatePage] = useState(false)

  const setShowCreatePageWrapper = () => {
    setShowCreatePage(!showCreatePage)
  }

  return (
    <Main>
      <HeaderComponent title='Questions Polls' />
      <Hero showCreatePage={showCreatePage} />
      <BottomComponent setShowCreatePage={setShowCreatePageWrapper}/>
    </Main>
  )
}
