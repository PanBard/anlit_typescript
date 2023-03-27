import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { TestowyGallery } from "./TestowyGallery"
import { DbPushAndGet } from "./db_management"
import { images_from_base64 } from "./images_from_base64"
import { test_voice_wyrocznia } from "./voiceWyrocznia"
import { AnalysisTestowy } from "./AnalysisTestowy"
import  Axios  from "axios"
import { SERVER_ROUTS } from "lib/database/server_routs"

type PorchAnalysisProps = {
    id: number,
    name?: string,
    back?(): void
}

export const PorchAnalysis: React.FunctionComponent<PorchAnalysisProps> = ({
    id,
    back,
    name
}) => {
    
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
    const [db_images,setDb_images] = useState()
    const [current_analysis, setCurrent_analysis] = useState()
    const [data, setData] = useState<any[]>([])
    const [analysis_name, setAnalysis_name] = useState<string>('default')


    const [seed, setSeed] = useState(1);
    const reset = () => {
        setSeed(Math.random())
        
    }
    


    const returnComponent = () => {
        if(choosen_mode=='start'){
            return(
            <Container>
                <MojButton onClick={()=>{ setChoosen_mode('wprowadzanie_imienia') }} > Nowa analiza</MojButton>
                <MojButton onClick={()=>{ setChoosen_mode('stara') }} > Kontynyuj poprzednie</MojButton>
            </Container>
            )
        }


        if(choosen_mode == 'wprowadzanie_imienia'){

            return(
                <Container>
                    <Container>
                        <MojButton onClick={()=>{ setChoosen_mode('start') }} > Cofnij </MojButton>
                    </Container>
             
                        Wpisz nazwę nowej analizy:
                        <input style={{backgroundColor: 'gray'}} type="text"  onChange={ (e)=>{setAnalysis_name(e.target.value)} }/>
                        <Container>
                    <MojButton onClick={()=>{ setChoosen_mode('analiza') }} > Rozpocznij analizę </MojButton>
                    </Container>
                    
                </Container>
            )
        }

        if(choosen_mode == 'stara'){
            return(
                <Container>
                    <Container>
                    <MojButton onClick={()=>{ setChoosen_mode('start') }} > Cofnij </MojButton>
                    </Container>
                    <Container12>
                       <DbPushAndGet message={dataFromChildComponent}/>
                    </Container12>
                </Container>
            )
        }

        if(choosen_mode == 'analiza'){
            return(
                <Container>
                       <AnalysisTestowy key={seed} name={analysis_name} id={return_new_analysis_id()} back={()=>{setChoosen_mode('start'); }}/>
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
const Container12 = styled.div`
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    overflow-y:scroll;
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