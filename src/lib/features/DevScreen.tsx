import React, { useState } from "react"
import styled from "styled-components"
import { ObjDetect } from "./objectDetection"
import { Voice } from "./voiceRecognition"

export const DevScreen: React.FunctionComponent = () => {

    const [showWebcam, setShowWebcam] = useState<boolean>(true)
    

    const madeMagic1 = () => {
        if (showWebcam==true){setShowWebcam(false)}
        else setShowWebcam(true)
    }
    const madeMagic2 = () => {
        Voice('testowo nie wiem')
    }


    return(
        <Mojdiv>
            <MojButton onClick={madeMagic1}>WLACZ KAMERKIE</MojButton>
            <MojButton onClick={madeMagic2}>Powiedz cos</MojButton>

            {!showWebcam && <ObjDetect/>}
            
            
        </Mojdiv>
    )
}

const Mojdiv = styled.div`
     
`

const MojButton = styled.button`
    padding: 10px 5px;
    text-align: center;
    border-radius: 8px; 
    background-color: ${({theme})=> theme.colors.primary};
    /* background-color: red; */
    cursor: pointer;
`