import { BestButton } from "lib/components/components_modules"
import React, {useState } from "react"
import styled from "styled-components"
import { Analysis } from "./db_component/Analysis"
import { VoiceScript } from "./db_component/VoiceScript"
import { DataScript } from "./db_component/DataScript"
import { ImagesTest } from "./db_component/ImagesTest"
import { Analysis_text_chat } from "./db_component/Analysis_text_chat"

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


     const DropdownMenu_analysis = () =>{
        return(
            <div className="dropdown">
            <BestButton className="dropbtn">Analysis</BestButton>
            <div className="dropdown-content">
              <a onClick={()=>{showComponent(<Analysis key={seed} rout_name="anion_analysis"/>)}}>Anions -</a>
              <a onClick={()=>{showComponent(<Analysis key={seed} rout_name="cation_analysis"/>)}} >Cations +</a>
            </div>
          </div> 
        )
    }

    const DropdownMenu_dataflow = () =>{
        return(
            <div className="dropdown">
            <BestButton className="dropbtn">Dataflow</BestButton>
            <div className="dropdown-content">
            <a onClick={()=>{showComponent(<DataScript key={seed} rout_name="anion_script_flow"/>)}}> Anions - </a>
            <a onClick={()=>{showComponent(<DataScript key={seed} rout_name="cation_script_flow"/>)}}> Cations + </a>
            </div>
          </div> 
        )
    }

    const DropdownMenu_voicescript = () =>{
        return(
            <div className="dropdown">
            <BestButton className="dropbtn">Dataflow</BestButton>
            <div className="dropdown-content">
            <a onClick={()=>{showComponent(<VoiceScript rout_name="anion_voice_script" key={seed}/>)}}> Anions - </a>
            <a onClick={()=>{showComponent(<VoiceScript rout_name="cation_voice_script" key={seed}/>)}}> Cations + </a>
            </div>
          </div> 
        )
    }


    const DropdownMenu_chatText = () =>{
        return(
            <div className="dropdown">
            <BestButton className="dropbtn">Chat history</BestButton>
            <div className="dropdown-content">
            <a onClick={()=>{showComponent(<Analysis_text_chat rout_name="anion_analysis" key={seed}/>)}}> Anions - </a>
            <a onClick={()=>{showComponent(<Analysis_text_chat rout_name="cation_analysis" key={seed}/>)}}> Cations + </a>
            </div>
          </div> 
        )
    }

    return(
        <Container>
            <HeaderContainer>
                {/* <BestButton onClick={reset}> Back</BestButton> */}
                <DropdownMenu_analysis/>
                <DropdownMenu_dataflow/>
                <DropdownMenu_voicescript/>
                < DropdownMenu_chatText/>
                <BestButton onClick={()=>{showComponent(<ImagesTest key={seed}/>)}}> Test images </BestButton>
                {/* <BestButton onClick={()=>{showComponent(<Analysis_text_chat rout_name="cation_voice_script" key={seed}/>)}}> ChatText </BestButton> */}
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

