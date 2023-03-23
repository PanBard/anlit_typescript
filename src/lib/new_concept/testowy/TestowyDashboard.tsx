import { tensor } from "@tensorflow/tfjs"
import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"

import { TestowyGallery } from "./TestowyGallery"
import { VoiceStage_1 } from "../voice_kingdom/Stage_1"
import { VoiceOracle } from "../voice_kingdom/VoiceOracle"
import { DbPushAndGet } from "./db_management"
import { images_from_base64 } from "./images_from_base64"
import { TestowyDetectBase } from "./TestowyDetectBase"
import { test_voice_wyrocznia } from "./voiceWyrocznia"



export const TestowyDashboard: React.FunctionComponent = () => {
    
    const[dataFromChildComponent , setDataFromChildComponent] = useState()
    const [phase, setPhase] = useState(1)
    const [endDetect, setEndDetect] = useState<boolean>(false)
    const [list_of_phase, setList_of_phase] = useState<number[]>([])
    const [list_of_labels_num,setlist_of_labels_num] = useState<number[]>([])
    const [list_of_detected_images,setlist_of_Detected_iamges] = useState<any[]>([])
    const [list_of_order,setlist_of_order] = useState<string[]>([])
    const [testowy_label,setTestowy_label] = useState<any>()
    const [image, setImage] = useState<any>()
    const [choosen_mode, setChoosen_mode] = useState('start')


    // console.log(list_of_detected_images[0])
    const img = images_from_base64.bialy
    const keys = Object.keys(images_from_base64)
    

   

  
    

    const setter = (smt: any) => {
        
        setTimeout(()=>{setlist_of_order([...list_of_order, smt])},1000)
        console.log('ograniete')
    }

    const catchMessageFromChild = (message: any) => {
        if(message[0] !== '404' && typeof message[0] !== 'undefined') //w razie gdyby wybrano opcje choose image
        {
            console.log('typeof',typeof message[0])
            console.log('message',message)
             setDataFromChildComponent(message)
        setEndDetect(!endDetect)
        console.log('Otrzymano dane z detekcji obrazu! ')
        }
        else console.log('nic nie przekazano!')
       
        
      }; 

      

      useEffect(() => {
        if(endDetect){
            if(dataFromChildComponent){
                setlist_of_Detected_iamges([...list_of_detected_images, dataFromChildComponent[1]])
            }

            test_voice_wyrocznia(testowy_label) 

            setEndDetect(!endDetect)
        }
      },[dataFromChildComponent])

      const returnComponent = () => {
        if(choosen_mode=='start'){
            return(
            <Container>
                <MojButton onClick={()=>{ setChoosen_mode('nowa') }} > Nowa analiza</MojButton>
                <MojButton onClick={()=>{ setChoosen_mode('stara') }} > Kontynyuj poprzednie</MojButton>
            </Container>
            )
        }


        if(choosen_mode == 'nowa'){
            return(
                <Container>
                    <Container>
                    <MojButton onClick={()=>{ setChoosen_mode('start') }} > Cofnij </MojButton>
                    </Container>
                     <label>Wybierz</label>
            <select name="op" id="op" onChange={(obj)=>{ 
                setTestowy_label(obj.target.value);
                setImage(images_from_base64[keys[obj.target.value as keyof typeof keys] as keyof typeof images_from_base64]);
                // console.log('select:  ','label: ',obj.target.value, 'image: ', keys[obj.target.value as keyof typeof keys] )
                }}>
                 <option key={89} value={404}> CHOOSE IMAGE </option>
                {keys.map((obj,index)=>{
                    return(  <option key={index} value={index}> {obj} </option>  )
                })}

            </select>
            <MojButton onClick={()=>{catchMessageFromChild([testowy_label,image])}} > Fake detection</MojButton>
            <Container2>
                < TestowyGallery images={list_of_detected_images}/>
            </Container2>
                </Container>
            )
        }

        if(choosen_mode == 'stara'){
            return(
                <Container>
                    <Container>
                    <MojButton onClick={()=>{ setChoosen_mode('start') }} > Cofnij </MojButton>
                    </Container>
                       <DbPushAndGet message={dataFromChildComponent}/>
                </Container>
            )
        }

      }

    
        
    return(
        <Container>
         
            {returnComponent()}

        </Container>
        
    )
}


const Container = styled.div`
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    
`

const Container2 = styled.div`
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