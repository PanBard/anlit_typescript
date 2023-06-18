import React, { useState } from "react"
import { Footer } from "./Footer";
import styled from "styled-components";
import { DataDashboard } from "lib/database/DataDashboard";
import { AnalysisDashboard } from "lib/features/analysis/AnalysisDashboard";
import { WelcomePage } from "./WelcomePage";
import { WebcamScreenshot } from "lib/features/webcam_screenshot/WebcamScreenshot";
import { StartPage } from "./StartPage";
import { OneHeaderWork } from "./OneHeaderWork";
import { PHAnalyser } from "lib/features/ph_analyzer/PHAnalyser";
import { FaceRecognitionDemo } from "lib/features/face_recognition/FaceRecognitionDemo";
import { RegisterFaceRecognition } from "lib/features/face_recognition/RegisterFaceRecognition";

export const OneRouter: React.FunctionComponent = () => {

    const [webStatus, setWebStatus] = useState('Start')
    const [loginStatus,setLoginStatus] = useState('Start')
    const [userName, setUserName] = useState<any>()

    return(
        <Container>
             {loginStatus=='Login' && 
             
             <MojDIV>
                <OneHeaderWork userName={userName} choosenWeb={e => {setWebStatus(e)}}/> {/*this bar is working outside routes, so is working in all moduls */}
                <Container>
                    {webStatus=='Start' && <WelcomePage/>}
                    {webStatus=='DataBase' && <DataDashboard/>}                
                    {webStatus=='Analysis' && <AnalysisDashboard/>}                                                
                    {webStatus == 'pH' && <PHAnalyser/>}                
                    {webStatus == 'FaceRecognition' && <FaceRecognitionDemo  />}
                    {webStatus == 'RegisterFaceRecognition' && <RegisterFaceRecognition  userName={userName} />}
                    {webStatus == 'Screenshot' && <WebcamScreenshot/>}                
                </Container>
                <Footer/>
            </MojDIV>}

            {loginStatus=='Start' &&   <StartPage choosenWeb={e => {setUserName(e['userName']) ; setLoginStatus(e['result']) }} />}
        </Container>              
    )
}

const Container = styled.div`   
`
const MojDIV = styled.div`
width: 100%;
height: 100vh;
background-color: #0d1117;
color: ${({theme}) => theme.colors.typography};
display: flex;
flex-direction: column;
justify-content: space-between;
`