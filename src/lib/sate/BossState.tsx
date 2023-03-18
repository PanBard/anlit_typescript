import { DevScreen } from "lib/features"
import { ObjClass } from "lib/features/objectClasification/ObjClass"
import { Voice } from "lib/features/voiceRecognition"
import { useLabelMap } from "lib/hooks/useDetectFlow"
// import { classifyImage } from "lib/features/objectClasification/ObjectClassification"
import React, { useMemo, useState } from "react"
import styled from "styled-components"


type BossStateProps = {
    donne(params: any): any
}



export const BossState: React.FunctionComponent<BossStateProps> = ({
    donne
}) => {
     
    const labelMap = useLabelMap()
    const [showWebcam, setShowWebcam] = useState<boolean>(true)
    const [makeClasify, setmakeClasify] = useState<boolean>(true)
    const [img, setImg] = useState()
    const [vid, setVid] = useState()
    const [label, setLabel] = useState()
    const madeMagic1 = () => {
        if (showWebcam==true){setShowWebcam(false)}
        else setShowWebcam(true)
    }

   

    const logMessage = async (message: any) => {
        console.log('zwrocono propsa z img');
        setImg(message[2])
        setVid(message[1])
     
    //    classification(message[1])
   

      };

      useMemo(()=>{
        if(vid){
         
            Voice('Wykryto próbówkę! Następuje klasyfikacja obrazu.')
             setmakeClasify(!makeClasify)
        }
       }
        ,[vid])

        useMemo(()=>{ //for label log
            if(label){
        console.log('label z klasyfikacji = ', label);
        Voice(`Pokazana próbówka zawiera ${labelMap[label]} osad`)
           donne(label)
            }
           }
            ,[label])

      const logMessage2 = (message: any) => {
        setLabel(message)
       
      }; 

    // const classification = async  (img: any) => {
    //     await classifyImage(img)
    // }

    return(
        <Container>
            <MojButton onClick={madeMagic1}>Rozpocznij analizę</MojButton>
            
            {!showWebcam && <DevScreen endWork={()=>{madeMagic1() }} imgg={logMessage} />}
            {!makeClasify && <ObjClass labelName={logMessage2} video={vid} />}
            <StoryImage src={img} alt="screenshot" />
            <button onClick={()=>{setmakeClasify(!makeClasify);console.log('vid z bossa: ',vid)}}>dawaj</button>

        
        
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