import { DevScreen } from "lib/features"
import React, { useState } from "react"
import styled from "styled-components"

export const BossState: React.FunctionComponent = () => {
    
    const [showWebcam, setShowWebcam] = useState<boolean>(true)
    const [img, setImg] = useState()
    const madeMagic1 = () => {
        if (showWebcam==true){setShowWebcam(false)}
        else setShowWebcam(true)
    }

    const logMessage = (message: any) => {
        console.log('img logacja: ',message);
        setImg(message[2])
      };

    return(
        <Container>
            <MojButton onClick={madeMagic1}>Rozpocznij analizę</MojButton>
            
            {!showWebcam && <DevScreen endWork={()=>{madeMagic1() }} imgg={logMessage} />}
            <StoryImage src={img} alt="screenshot" />
        </Container>
    )
}

const Container = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1;
    
`

const MojButton = styled.button`
    padding: 10px 5px;
    text-align: center;
    border-radius: 8px; 
    background-color: ${({theme})=> theme.colors.primary};
    /* background-color: red; */
    cursor: pointer;
`

const StoryImage = styled.img`
    width: 640px;
    height: 480px;
`