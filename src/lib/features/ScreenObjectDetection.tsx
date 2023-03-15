import React, { useState } from "react"
import styled from "styled-components"
import { ObjDetect } from "./objectDetection"

export const ScreenObjectDetection = () => {

    const [showWebcam, setShowWebcam] = useState<boolean>(true)

    const madeMagic = () => {
        if (showWebcam==true){setShowWebcam(false); console.log(showWebcam)}
        else setShowWebcam(true); console.log(showWebcam)
    }


    return(
        <Mojdiv>
            <MojButton onClick={madeMagic}>WLACZ KAMERKIE</MojButton>

            {!showWebcam && <ObjDetect/>}
            {/* <ObjDetect/> */}
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