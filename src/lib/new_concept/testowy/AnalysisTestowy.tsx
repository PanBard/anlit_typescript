import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { TestowyGallery } from "./TestowyGallery"
import { DbPushAndGet } from "./db_management"
import { images_from_base64 } from "./images_from_base64"
import { test_voice_wyrocznia } from "./voiceWyrocznia"
import {db_insert_new_id_and_status_analysis} from './crud_data'
import  Axios  from "axios"
import { SERVER_ROUTS } from "lib/database/server_routs"
import { LiveChangeWatch } from "./LiveChangeWatch"
import { ShuffleFate } from "./ShuffleFate"
import { useTest_labels } from "lib/hooks/useDetectFlow";

type AnalysisProps = {
    id: number,
    name?: string,
    back?(): void,
    rerender?(): void,
    phase1: number
}

export const AnalysisTestowy: React.FunctionComponent<AnalysisProps> = ({
    id,
    back,
    name,
    rerender,
    phase1
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
    const [mode, setMode] = useState('')
    const labelMap = useTest_labels()
    const img = images_from_base64.bialy
    const keys = Object.keys(images_from_base64)
        
    const setter = (smt: any) => {
        setTimeout(()=>{setlist_of_order([...list_of_order, smt])},1000)
        console.log('ograniete')
    }

    const catchMessageFromChild = (message: any) => {
        if(message[0] !== '404' && typeof message[0] !== 'undefined') //w razie gdyby wybrano opcje choose image
        {
            // console.log('typeof',typeof message[0])
            // console.log('message',message)
             setDataFromChildComponent(message)
        setEndDetect(!endDetect)
        // console.log('Otrzymano dane z detekcji obrazu! ')
        }
        else console.log('nic nie przekazano!')
      }; 

      useEffect(()=>{
        get_data()
      },[])

      const get_data = async () => {
        let kontrol = false
      await  Axios.get(SERVER_ROUTS.ultimate_analysis.get)
        .then( (response: any)=>{console.log('status -> :)');setData(response.data); kontrol=true ;setMode('start')})
        .catch((err)=>{console.log('db status :(')})
        if(kontrol) return 'ok'

      }


      

    const update_data_in_db = async (label: any)=>{
            await Axios.put(SERVER_ROUTS.ultimate_analysis.put, {id:id,name:name,f1:label,end:'new'})
            .then(p => console.log('update----------------------------------------------------------UP'))
        }; 

    const quck_update = async (label: any, img_index:string,f_index:string, end:string)=>{
        await Axios.put(SERVER_ROUTS.ultimate_analysis.put, {id:id,name:name,[f_index]: labelMap[label] ,[img_index]:image,end:end})
        // .then(p => console.log('update----------------------------------------------------------UP'))
        .then(rerender)
    }; 

    // ############## todo s
    const set_up_phase = async ()  => {
       await get_data()
       .then(e =>{
        const current = data[data.length-1]
        const keys = Object.keys(current)
        // console.log(current)
        // keys.map((e:any)=>{
        //     if(current[e] == null) console.log(current[e])})
        if((current['end'] == 'new') && (phase !== 100)){
            if(current['f1'] == null){setPhase(2);console.log('faza f1');quck_update(testowy_label,'img1','f1','new');return true}
            if(current['f2'] == null){setPhase(3);console.log('faza f2');quck_update(testowy_label,'img2','f2','new');return true}
            if(current['f3'] == null){setPhase(4);console.log('faza f3');quck_update(testowy_label,'img3','f3','new');return true}
            if(current['f4'] == null){setPhase(5);console.log('faza f4');quck_update(testowy_label,'img4','f4','new');return true}
            if(current['f5'] == null){setPhase(6);console.log('faza f5');quck_update(testowy_label,'img5','f5','new');return true}
            if(current['f6'] == null){setPhase(7);console.log('faza f6');quck_update(testowy_label,'img6','f6','new');return true}
            if(current['f7'] == null){setPhase(100);console.log('faza f7');quck_update(testowy_label,'img7','f7','end');return true}
        }
           
        if((current['end'] == 'end') && (phase !== 100)){
            console.log('END --------------------- END');
        }


       })}
          // ############## todo e

      useEffect(() => {
        if(endDetect){
            if(dataFromChildComponent){

                setlist_of_Detected_iamges([...list_of_detected_images, dataFromChildComponent[1]])
            }

            test_voice_wyrocznia(testowy_label) 
            // update_data_in_db(testowy_label )
            set_up_phase()
            setEndDetect(!endDetect)
        }
      },[dataFromChildComponent])



    const returnComponent = () => {
        // if((typeof data !== 'undefined') && (typeof testowy_label !== 'undefined') ){
            // console.log('data[id-1]',data[id-1])
            // console.log('testowy_label-------------------------',testowy_label)
            return(
            <Container>
              <ShuffleFate label={testowy_label} phase={phase1} id={id} data={data[id-1]}/>
            </Container>
            )
        // }
    
    }

    // console.log('OBECNA FAZA1: ',phase1)

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
                {/* < TestowyGallery images={list_of_detected_images}/> */}
                
                       {/* <DbPushAndGet message={dataFromChildComponent}/> */}
                       
                       {returnComponent()}
                       <LiveChangeWatch message={dataFromChildComponent}/>
                    
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