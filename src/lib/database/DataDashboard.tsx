import { BestButton } from "lib/components/components_modules"
import React, {useState } from "react"
import styled from "styled-components"
import { Analysis } from "./db_component/Analysis"
import { VoiceScript } from "./db_component/VoiceScript"
import { DataScript } from "./db_component/DataScript"
import { ImagesTest } from "./db_component/ImagesTest"
import { ChatMessages } from "./db_component/ChatMessages"
import { ImagesStorage } from "./db_component/ImagesStorage"
import { FaceImage } from "./db_component/FaceImage"
import { Users } from "./db_component/Users"
import { PhAnalysis } from "./db_component/PhAnalysis"

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
            <BestButton className="dropbtn">Ion analysis</BestButton>
            <div className="dropdown-content">
              <a onClick={()=>{showComponent(<Analysis key={seed} rout_name="anion_analysis_result"/>)}}>Anions -</a>
              <a onClick={()=>{showComponent(<Analysis key={seed} rout_name="cation_analysis_result"/>)}} >Cations +</a>
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
            <BestButton className="dropbtn">VoiceScript</BestButton>
            <div className="dropdown-content">
            <a onClick={()=>{showComponent(<VoiceScript rout_name="anion_voice_script" key={seed}/>)}}> Anions - </a>
            <a onClick={()=>{showComponent(<VoiceScript rout_name="cation_voice_script" key={seed}/>)}}> Cations + </a>
            </div>
          </div> 
        )
    }

    const DropdownMenu_images = () =>{
        return(
            <div className="dropdown">
            <BestButton className="dropbtn">Images</BestButton>
            <div className="dropdown-content">
            <a onClick={()=>{showComponent(<ImagesTest key={seed}/>)}}> Test images </a>
            <a onClick={()=>{showComponent(<ImagesStorage key={seed}/>)}}> Images storage </a>
            <a  onClick={()=>{showComponent(<FaceImage key={seed}/>)}}> Face images </a>
            </div>
          </div> 
        )
    }



    return(
        <Container>
            <HeaderContainer>
                <DropdownMenu_analysis/>
                <DropdownMenu_dataflow/>
                <DropdownMenu_voicescript/>
                <DropdownMenu_images/>
                <BestButton onClick={()=>{showComponent(<ChatMessages key={seed}/>)}}> Chat messages </BestButton>
                <BestButton onClick={()=>{showComponent(<Users key={seed}/>)}}> Users </BestButton>
                <BestButton onClick={()=>{showComponent(<PhAnalysis key={seed}/>)}}> pH analysis </BestButton>               
            </HeaderContainer>
            {showComponent2()}
        </Container>
        
    )
}


const Container = styled.div`
    position: absolute;
    width: 100%;
    top: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
`

const HeaderContainer = styled.div`
    height: 60px;
    /* background-color: ${({theme}) => theme.colors.foreground }; */
    background-color:#161b22;
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
  
`

