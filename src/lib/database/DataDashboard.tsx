import  Axios  from "axios"
import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { Analysis } from "./db_component/Analysis"
import { DataScript } from "./db_component/DataScript"
// import { DetectImages } from "./db_component/DetectImages"
import { ImagesDb } from "./db_component/ImagesDb"
import { VoiceScript } from "./db_component/VoiceScript"




export const DataDashboard: React.FunctionComponent = () => {
    
    const [dane, setDane] = useState([])
    const [tables, setTables] = useState([])
    const [show, setShow] = useState(false)
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
            <MojButton onClick={()=>{showComponent(<DataScript key={seed}/>)}}> DataScript</MojButton>
            {/* <MojButton onClick={()=>{showComponent(<Analysis key={seed}/>)}}> Analysis</MojButton> */}
            {/* <MojButton onClick={()=>{showComponent(<DetectImages key={seed}/>)}}> Img</MojButton> */}
            {/* <MojButton onClick={()=>{showComponent(<ImagesDb key={seed}/>)}}> Image</MojButton> */}
            <MojButton onClick={()=>{showComponent(<VoiceScript key={seed}/>)}}> VoiceScript</MojButton>
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