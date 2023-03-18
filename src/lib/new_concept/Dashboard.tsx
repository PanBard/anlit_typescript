import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { DetectBase } from "./DetectBase"
import { VoiceOracle } from "./VoiceOracle"


export const Dashboard: React.FunctionComponent = () => {
    
    const[dataFromChildComponent , setDataFromChildComponent] = useState()
    const [phase, setPhase] = useState(1)
    const [endDetect, setEndDetect] = useState<boolean>(false)
    const [list_of_phase, setList_of_phase] = useState<number[]>([])
    const [list_of_labels_num,setlist_of_labels_num] = useState<number[]>([])
    const [list_of_detected_images,setlist_of_Detected_iamges] = useState<any[]>([])

    const catchMessageFromChild = (message: any) => {
        console.log('KIEDY')
        setDataFromChildComponent(message)
        setEndDetect(!endDetect)
      }; 

      useEffect(() => {
        if(endDetect){
            console.log(dataFromChildComponent)
            setPhase(prev => prev + 1)
            if(dataFromChildComponent){
                setlist_of_labels_num([...list_of_labels_num, dataFromChildComponent[0]])
                setlist_of_Detected_iamges([...list_of_detected_images, dataFromChildComponent[1]])
                setList_of_phase([...list_of_phase, phase])
            }
            setEndDetect(!endDetect)
        }
      },[dataFromChildComponent])


      //testowy do wyswietlania stanu
      useMemo(()=>{
                console.log('list_of_labels_num',list_of_labels_num)
                console.log('list_of_detected_images',list_of_detected_images)
                console.log('list_of_phase',list_of_phase)
      },[list_of_phase])

      useEffect(() => {
        mowa()
        },[endDetect])



    const mowa = async ()=>{
            if(list_of_labels_num[list_of_labels_num.length-1] && list_of_phase[list_of_phase.length-1]) {
                console.log('MOWIE TO')
            await VoiceOracle(list_of_labels_num[list_of_labels_num.length-1], list_of_phase[list_of_phase.length-1])
                    } }


    return(
        <Container>
            <DetectBase return_results_to_parent_component={catchMessageFromChild} key={phase}/>
        </Container>
        
    )
}


const Container = styled.div`
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    
`


const MojButton = styled.button`
    padding: 10px 5px;
    text-align: center;
    border-radius: 8px; 
    background-color: ${({theme})=> theme.colors.primary};
    /* background-color: red; */
    cursor: pointer;
`