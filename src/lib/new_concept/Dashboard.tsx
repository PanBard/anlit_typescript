import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { DetectBase } from "./DetectBase"
import { Gallery } from "./Gallery"
import { VoiceStage_1 } from "./voice_kingdom/Stage_1"
import { VoiceOracle } from "./voice_kingdom/VoiceOracle"


export const Dashboard: React.FunctionComponent = () => {
    
    const[dataFromChildComponent , setDataFromChildComponent] = useState()
    const [phase, setPhase] = useState(1)
    const [endDetect, setEndDetect] = useState<boolean>(false)
    const [list_of_phase, setList_of_phase] = useState<number[]>([])
    const [list_of_labels_num,setlist_of_labels_num] = useState<number[]>([])
    const [list_of_detected_images,setlist_of_Detected_iamges] = useState<any[]>([])
    const [list_of_order,setlist_of_order] = useState<string[]>([])
   
    const setter = (smt: any) => {
        
        setTimeout(()=>{setlist_of_order([...list_of_order, smt])},1000)
        console.log('ograniete')
    }

    const catchMessageFromChild = (message: any) => {
        setDataFromChildComponent(message)
        setEndDetect(!endDetect)
        console.log('PRZEKAZANE DANE: ',message)
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
                console.log('list_of_order',list_of_order)
      },[list_of_phase])

      
 
   


    useEffect(() => { mowa()},[endDetect])
    const mowa = async ()=>{
        if(list_of_order[list_of_order.length-1]){
            
            if(list_of_order[list_of_order.length-1] == 'gr1'){
                console.log('dashbord start gr1')
                const gr1 =  VoiceStage_1(list_of_labels_num[list_of_labels_num.length-1], list_of_order[list_of_order.length-1]) 
                // if( gr1 ) setTemp_list_of_order([...temp_list_of_order, 'gr1_1'])  
                if( gr1 ) setter(gr1)
                //  setlist_of_order([...list_of_order, gr1])  
                return true
            }
            if(list_of_order[list_of_order.length-1] == 'gr1_1'){
                console.log('dashbord start gr_1')
                const gr2 = VoiceStage_1(list_of_labels_num[list_of_labels_num.length-1], list_of_order[list_of_order.length-1]) 
                // if( gr2 == 'gr1_11' ) setTemp_list_of_order([...temp_list_of_order, 'gr1_1'])   
                if( gr2 ) setter(gr2)
                // setlist_of_order([...list_of_order, 'gr1_1'])  
                return true
            }

        }    
        else {
            if(list_of_labels_num[list_of_labels_num.length-1] && list_of_phase[list_of_phase.length-1]) {
           const w =  VoiceOracle(list_of_labels_num[list_of_labels_num.length-1], list_of_phase[list_of_phase.length-1])
              if( w ) setlist_of_order([...list_of_order, w])    
              
        } }
        }
            

    

    return(
        <Container>
            <DetectBase return_results_to_parent_component={catchMessageFromChild} key={phase}/>
         < Gallery images={list_of_detected_images}/>
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