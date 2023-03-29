import React, {useState } from "react"
import styled from "styled-components"
import { AnionsDataScript } from "./db_component/AnionsDataScript"
import { AnionsVoiceScript } from "./db_component/AnionsVoiceScript"
import { CationsDataScript } from "./db_component/CationsDataScript"
import { CationsVoiceScript } from "./db_component/CationsVoiceScript"
import { TestImages } from "./db_component/TestImages"

export const DataDashboard: React.FunctionComponent = () => {
    
    const [component, setComponent] = useState()
    const [seed, setSeed] = useState(1);

    const reset = () => {
         setSeed(Math.random())
     }

     const showComponent = (component: any)=>{
        setComponent(component)
     }
     
     const showComponent2 = ()=>{
        return component
     }

    return(
        <Container>
            <HeaderContainer>
                <MojButton onClick={reset}> Back</MojButton>
                <MojButton onClick={()=>{showComponent(<CationsDataScript key={seed}/>)}}> DataScript + Cations</MojButton>
                <MojButton onClick={()=>{showComponent(<AnionsDataScript key={seed}/>)}}> DataScript - Anions</MojButton>
                <MojButton onClick={()=>{showComponent(<CationsVoiceScript key={seed}/>)}}> VoiceScript + Cations</MojButton>
                <MojButton onClick={()=>{showComponent(<AnionsVoiceScript key={seed}/>)}}> VoiceScript - Anions </MojButton>
                <MojButton onClick={()=>{showComponent(<TestImages key={seed}/>)}}> Test img </MojButton>
            </HeaderContainer>
            {showComponent2()}
        </Container>
        
    )
}


const Container = styled.div`
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    /* overflow-y:scroll; */
    
`


const MojButton = styled.button`
    padding: 10px 5px;
    text-align: center;
    border-radius: 8px; 
    background-color: ${({theme})=> theme.colors.primary};
    /* background-color: red; */
    cursor: pointer;
`


const HeaderContainer = styled.div`
    height: 60px;
    background-color: ${({theme}) => theme.colors.foreground };
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* justify-content: space-between; */
`

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Logo = styled.img`
    height: 36px;
    width: 36px;
    margin-right: 18px;
`

const Title = styled.h1`
    display: inline;
    font-size: 20px;
    color: ${({theme})=> theme.colors.typography};
`

const LinkContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const Linkos = styled.a`
      color: ${({theme})=> theme.colors.typography};
      text-decoration: underline;
      cursor: pointer; 
      padding: 0 10px;
`


const Cont = styled.div`
      color: ${({theme})=> theme.colors.typography};
      text-decoration: underline;
      cursor: pointer; 
      padding: 0 10px;
`