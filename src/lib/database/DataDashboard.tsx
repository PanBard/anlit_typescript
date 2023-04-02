import { BestButton } from "lib/components/components_modules"
import React, {useState } from "react"
import styled from "styled-components"
import { Analysis } from "./db_component/Analysis"
import { VoiceScript } from "./db_component/VoiceScript"
import { DataScript } from "./db_component/DataScript"
import { ImagesTest } from "./db_component/ImagesTest"

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
                <BestButton onClick={()=>{showComponent(<DataScript key={seed} rout_name="cation_script_flow"/>)}}> DataFlow + Cation</BestButton>
                <BestButton onClick={()=>{showComponent(<DataScript key={seed} rout_name="anion_script_flow"/>)}}> DataFlow - Anion</BestButton>
                <BestButton onClick={()=>{showComponent(<VoiceScript rout_name="cation_voice_script" key={seed}/>)}}> VoiceScript + Cations</BestButton>
                <BestButton onClick={()=>{showComponent(<VoiceScript rout_name="anion_voice_script" key={seed}/>)}}> VoiceScript + - Anions</BestButton>
                <BestButton onClick={()=>{showComponent(<ImagesTest key={seed}/>)}}> Test images </BestButton>
                <BestButton onClick={()=>{showComponent(<Analysis key={seed} rout_name="cation_analysis"/>)}}> Analysis + Cations </BestButton>
                <BestButton onClick={()=>{showComponent(<Analysis key={seed} rout_name="anion_analysis"/>)}}> Analysis + Anions </BestButton>
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

