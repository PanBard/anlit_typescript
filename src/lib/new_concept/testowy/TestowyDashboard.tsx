import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { TestowyGallery } from "./TestowyGallery"
import { DbPushAndGet } from "./db_management"
import { images_from_base64 } from "./images_from_base64"
import { test_voice_wyrocznia } from "./voiceWyrocznia"
import { AnalysisTestowy } from "./AnalysisTestowy"
import  Axios  from "axios"
import { SERVER_ROUTS } from "lib/database/server_routs"
import { db_insert_new_id_and_status_analysis } from "./crud_data"
import { Wyrocznia } from "./Wyrocznia"


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
    const [db_images,setDb_images] = useState()
    const [current_analysis, setCurrent_analysis] = useState()
    const [data, setData] = useState<any[]>([])
    const [analysis_name, setAnalysis_name] = useState<string>('default')
    const [id, setId] = useState(1)
    // console.log(list_of_detected_images[0])
    const img = images_from_base64.bialy
    const keys = Object.keys(images_from_base64)


    const [seed, setSeed] = useState(1);
    const reset = () => {
        setPhase(phase+1)
        setSeed(Math.random())
        
    }
    

   const return_new_analysis_id = (data: any)=>  {
      
        const new_id = data[data.length-1]['id']+1
        setId(new_id)
        return new_id
        
    }

    const insert_to_db =async () => {
        console.log('insert_to_db')
       

        if(data.length == 0){
            console.log('New analysis id: ',1)
                await db_insert_new_id_and_status_analysis(1,analysis_name)
                .then(()=>setChoosen_mode('analiza'))
        }

    if(data[0]){
            
                console.log('New analysis id: ',id)
            await db_insert_new_id_and_status_analysis(id,analysis_name)
            .then(()=>setChoosen_mode('analiza'))
        }
}

    useEffect(  ()  =>  {
        get_data_from_db()
    },[])

    const get_data_from_db = () => {
        Axios.get(SERVER_ROUTS.ultimate_analysis.get)
        .then( (response: any)=>{console.log(':)');setData(response.data);console.log(' return_new_analysis_id()',return_new_analysis_id(response.data));return_new_analysis_id(response.data) })
        .catch((err)=>{console.log('db status :(', err)})
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
                    <MojButton onClick={()=>{ insert_to_db() }} > Rozpocznij analizę </MojButton>
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
                    
                       <AnalysisTestowy phase1={phase} rerender={reset} key={seed} name={analysis_name} id={id} back={()=>{setChoosen_mode('start'); }}/>
                       <Wyrocznia key={seed/2}/>
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