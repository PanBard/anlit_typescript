import { Voice } from "lib/features/voiceRecognition"
import { BossState } from "lib/sate/BossState"
import { Oracle } from "lib/sate/Oracle"
import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"

export const StartDetection: React.FunctionComponent = () => {


    const[label , setLabel] = useState<string>()
    const [phase, setPhase] = useState(1)
    const [list_of_phase, setList_of_phase] = useState<number[]>([])
    const [tell_result,setTell_result] = useState<number>()

    const catchMessage = (message: any) => {
        setLabel(message)
       
      }; 


      const [list_of_detected_obiects,setlist_of_Detected_obiects] = useState<string[]>([])
      const [childKey, setChildKey] = useState(1);
      useEffect(() => {
        if(label) {
            setlist_of_Detected_obiects([...list_of_detected_obiects, label])
            setPhase(phase+1)
            setList_of_phase([...list_of_phase, phase])
            setChildKey(prev => prev + 1);
            console.log('Lista wykrytych:',list_of_detected_obiects)
            console.log('Lista faz:',list_of_phase)
            setTell_result(1)
            if(tell_result) setTell_result(tell_result+1)
        }
        
     },[label]);

     useEffect(() => {
        mowa()
        },[tell_result])



    const mowa = async ()=>{
            if(tell_result && label && phase) {
                    const mowa = await Oracle(label, phase)
                    if(mowa) await Voice(mowa)} }

//      const mowa = async ()=>{useEffect(() => {
//         if(tell_result && label && phase) {
//         const mowa = Oracle(label, phase)
//         if(mowa)  Voice(mowa)
//     } 
//  },[tell_result]);} 




    return(
        <CenterContainer>
                {<BossState donne={catchMessage} key={childKey}/> }
                
        </CenterContainer>
    )
}

const Imagee = styled.img`
    /* width: 1200px;
    height: 480px; */
    border-radius: 10px;
`
const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
`