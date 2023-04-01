import { BestButton } from "lib/components/components_modules"
import React, {useState } from "react"
import styled from "styled-components"
import { AnionsDataScript } from "./db_component/AnionsDataScript"
import { AnionsVoiceScript } from "./db_component/AnionsVoiceScript"
import { Analysis } from "./db_component/Analysis"
import { CationsDataScript } from "./db_component/CationsDataScript"
import { CationsVoiceScript } from "./db_component/CationsVoiceScript"
import { TestImages } from "./db_component/TestImages"
import { VoiceScript } from "./db_component/VoiceScript"

export const DataDashboard: React.FunctionComponent = () => {
    
    const [component, setComponent] = useState()
    const [seed, setSeed] = useState(1);

    const reset = () => {
         setSeed(Math.random())
     }

     const showComponent = (component: any)=>{
        setComponent(component)
        reset()
     }
     
     const showComponent2 = ()=>{
        return component
     }

    return(
        <Container>
            <HeaderContainer>
                <BestButton onClick={reset}> Back</BestButton>
                <BestButton onClick={()=>{showComponent(<CationsDataScript key={seed}/>)}}> DataScript + Cations</BestButton>
                <BestButton onClick={()=>{showComponent(<AnionsDataScript key={seed}/>)}}> DataScript - Anions</BestButton>
                <BestButton onClick={()=>{showComponent(<CationsVoiceScript key={seed}/>)}}> VoiceScript + Cations</BestButton>
                <BestButton onClick={()=>{showComponent(<AnionsVoiceScript key={seed}/>)}}> VoiceScript - Anions </BestButton>
                <BestButton onClick={()=>{showComponent(<TestImages key={seed}/>)}}> Test img </BestButton>
                <BestButton onClick={()=>{showComponent(<Analysis key={seed} rout_name="cation_analysis"/>)}}> Analysis + Cations </BestButton>
                <BestButton onClick={()=>{showComponent(<Analysis key={seed} rout_name="anion_analysis"/>)}}> Analysis + Anions </BestButton>
                <BestButton onClick={()=>{showComponent(<VoiceScript key={seed}/>)}}> Voice </BestButton>
            </HeaderContainer>
            {showComponent2()}
        </Container>
        
    )
}


const Container = styled.div`
`

const HeaderContainer = styled.div`
    height: 60px;
    background-color: ${({theme}) => theme.colors.foreground };
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
`

