import React, { useState } from "react"
// import { BrowserRouter as BrowserRouter, Route, Routes} from 'react-router-dom';
import { Footer } from "./Footer";
import { OneHeader } from "./OneHeader";
import styled from "styled-components";
import { DataDashboard } from "lib/database/DataDashboard";
import { TestowyDashboard } from "lib/new_concept/testowy/TestowyDashboard";
import { Dashboard } from "lib/new_concept/Dashboard";
import { WelcomePage } from "./WelcomePage";
import { VoiceRecognition } from "lib/new_concept/testowy/VoiceRecognition";
import { DetectTest } from "lib/new_concept/testowy/DetectTest";
import { CroppImageTest } from "lib/new_concept/testowy/CroppImageTest";
import { ColorAverage } from "lib/new_concept/testowy/ColorAverage";
import { FaceRecognition } from "lib/new_concept/face_recognition/FaceRecognition";
import { WebcamScreenshot } from "lib/new_concept/testowy/WebcamScreenshot";


export const OneRouter: React.FunctionComponent = () => {

    const [webStatus, setWebStatus] = useState('Start')

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
        <MojDIV>
            <OneHeader choosenWeb={e => setWebStatus(e)}/> {/*this bar is working outside routes, so is working in all moduls */}

            <Container>
                {webStatus=='Start' && <WelcomePage/>}
                {webStatus=='DataBase' && <DataDashboard/>}
                {/* {webStatus=='ObjDetect' && <Dashboard/>} */}
                {webStatus=='Analysis' && <TestowyDashboard/>}
                {/* {webStatus=='voice' && <VoiceRecognition/>} */}
                {/* {webStatus=='detect' && <DetectTest/>} */}
                {webStatus == 'Cropp' && <CroppImageTest/>}
                {webStatus == 'ColorAverage' && <ColorAverage/>}
                {webStatus == 'FaceRecognition' && <FaceRecognition/>}
                {webStatus == 'Screenshot' && <WebcamScreenshot/>}
                
            </Container>

            <Footer/>
     
        </MojDIV>
       
    )
}

const Container = styled.div`
    
`

const MojDIV = styled.div`
width: 100%;
height: 100vh;
background-color: ${ ({theme}) => theme.colors.background };
color: ${({theme}) => theme.colors.typography};
display: flex;
flex-direction: column;
justify-content: space-between;
`