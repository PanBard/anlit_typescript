import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { TestowyGallery } from "./TestowyGallery"
import { DbPushAndGet } from "./db_management"
import { images_from_base64 } from "./images_from_base64"
import { test_voice_wyrocznia } from "./voiceWyrocznia"
import {db_insert_new_id_and_status_analysis} from './crud_data'
import  Axios  from "axios"
import { SERVER_ROUTS } from "lib/database/server_routs"

type AnalysisProps = {
    id: number,
    name?: string,
    back?(): void
}

export const AnalysisTestowy: React.FunctionComponent<AnalysisProps> = ({
    id,
    back,
    name
}) => {
    const [data, setData] = useState<any[]>([])
    const[dataFromChildComponent , setDataFromChildComponent] = useState()
    const [phase, setPhase] = useState(1)
    const [endDetect, setEndDetect] = useState<boolean>(false)
    const [list_of_phase, setList_of_phase] = useState<number[]>([])
    const [list_of_labels_num,setlist_of_labels_num] = useState<number[]>([])
    const [list_of_detected_images,setlist_of_Detected_iamges] = useState<any[]>([])
    const [list_of_order,setlist_of_order] = useState<string[]>([])
    const [testowy_label,setTestowy_label] = useState<any>()
    const [image, setImage] = useState<any>()
    const [choosen_mode, setChoosen_mode] = useState('welcome')
    const [db_images,setDb_images] = useState()
    const [current_analysis, setCurrent_analysis] = useState()
    const [analysis_name, setAnalysis_name] = useState<string>()

    console.log('w nowej analizie: ', id)
    console.log('id: ', id)
    console.log('name: ', name)

    // console.log(list_of_detected_images[0])
    const img = images_from_base64.bialy
    const keys = Object.keys(images_from_base64)
        
    // const check_last_analysis = async ()=>  { 
    //     const e: [] = await db_get_images()
    //     const r = e[e.length-1]
    //     console.log(' ostatnia analiza o id: ',   r['id'])
    //     db_add_image_id(r['id']+1)
    //     setCurrent_analysis(r['id']+1)
    // }
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

      useEffect(()=>{
        Axios.get(SERVER_ROUTS.ultimate_analysis.get)
        .then( (response: any)=>{console.log(':)');setData(response.data) })
        .catch((err)=>{console.log('db status :(')})
      },[])

     

      const insert_to_db =async () => {
                console.log(data)

                if(data.length == 0){
                        await db_insert_new_id_and_status_analysis(1,name as string)
                }

            if(data[0]){
                    if(data[data.length-1]['id'] !== id){
                        console.log('data[data.length-1][id]',data[data.length-1]['id'])
                    await db_insert_new_id_and_status_analysis(id,name as string)}
                }
        }

        const update_data_in_db = async (label: any)=>{
           await Axios.put(SERVER_ROUTS.ultimate_analysis.put, {id:id,name:name,f1:label,end:{data}});
            console.log('update')
          }; 
      
      

      useEffect(() => {
        if(endDetect){
            if(dataFromChildComponent){
                setlist_of_Detected_iamges([...list_of_detected_images, dataFromChildComponent[1]])
            }

            test_voice_wyrocznia(testowy_label) 
            update_data_in_db(testowy_label )
            setEndDetect(!endDetect)
        }
      },[dataFromChildComponent])

      useMemo(() =>{ insert_to_db() },[data])

      return(
        <Container>

                    <Container>
                    <MojButton onClick={back} > Cofnij </MojButton>
                    <h2>Nazwa analizy: {name} </h2>
                    <h3>ID: {id}</h3>
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