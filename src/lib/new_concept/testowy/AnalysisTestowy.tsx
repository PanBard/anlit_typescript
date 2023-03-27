import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { images_from_base64 } from "./images_from_base64"
import { test_voice_wyrocznia } from "./voiceWyrocznia"
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
    rerender
}) => {
    const [data, setData] = useState<any[]>([])
    const[dataFromChildComponent , setDataFromChildComponent] = useState()
    const [phase, setPhase] = useState(1)
    const [endDetect, setEndDetect] = useState<boolean>(false)
    const [testowy_label,setTestowy_label] = useState<any>()
    const [image, setImage] = useState<any>()
    const labelMap = useTest_labels()
    const keys = Object.keys(images_from_base64)


    const set_up_phase = async (data: any)  => {
        const current = data[data.length-1]
    //    if(typeof current !== 'undefined'){
    //         if((current['end'] == 'new') && (phase !== 100)){
    //         if(current['f1'] == null){setPhase(1); test_voice_wyrocznia( 1, current) ;return true}
    //         if(current['f2'] == null){setPhase(2); test_voice_wyrocznia( 2,current) ;return true}
    //         if(current['f3'] == null){setPhase(3); test_voice_wyrocznia( 3,current) ;return true}
    //         if(current['f4'] == null){setPhase(4); test_voice_wyrocznia( 4,current) ;return true}
    //         if(current['f5'] == null){setPhase(5); test_voice_wyrocznia( 5,current) ;return true}
    //         if(current['f6'] == null){setPhase(6); test_voice_wyrocznia( 6,current) ;return true}
    //         if(current['f7'] == null){setPhase(7); test_voice_wyrocznia( 7,current) ;return true}
    //        }  
           
    //        if((current['end'] == 'end') && (phase !== 100)){
    //            console.log('END --------------------- END');
    //        }
    //    }
   }
//    console.log('faza w analysis testowym 00000000000 : ', phase)
    const catchMessageFromChild = (message: any) => {
        if(message[0] !== '404' && typeof message[0] !== 'undefined') //w razie gdyby wybrano opcje choose image
        {
            setDataFromChildComponent(message)
            setEndDetect(!endDetect)
        }
        else console.log('nic nie przekazano!')
      }; 

      useEffect(()=>{
        get_data()
       
      },[])

      const get_data = async () => {
        let kontrol = false
      await  Axios.get(SERVER_ROUTS.ultimate_analysis.get)
        .then( (response: any)=>{setData(response.data); kontrol=true ;set_up_phase(response.data);})
        .catch((err)=>{console.log('db status :(')})
        if(kontrol) return 'ok'

      }

    const quck_update = async (label: any, img_index:string,f_index:string, end:string)=>{
        await Axios.put(SERVER_ROUTS.ultimate_analysis.put, {id:id,name:name,[f_index]: labelMap[label] ,[img_index]:image,end:end})
        // .then(p => console.log('update----------------------------------------------------------UP'))
        .then(rerender)
    }; 

    const send_detection_results_to_db = async ()  => {
       await get_data()
       .then(e =>{
        const current = data[data.length-1]
        if((current['end'] == 'new') && (phase !== 100)){
            if(current['f1'] == null){console.log('faza f1');quck_update(testowy_label,'img1','f1','new');return true}
            if(current['f2'] == null){console.log('faza f2');quck_update(testowy_label,'img2','f2','new');return true}
            if(current['f3'] == null){console.log('faza f3');quck_update(testowy_label,'img3','f3','new');return true}
            if(current['f4'] == null){console.log('faza f4');quck_update(testowy_label,'img4','f4','new');return true}
            if(current['f5'] == null){console.log('faza f5');quck_update(testowy_label,'img5','f5','new');return true}
            if(current['f6'] == null){console.log('faza f6');quck_update(testowy_label,'img6','f6','new');return true}
            if(current['f7'] == null){console.log('faza f7');quck_update(testowy_label,'img7','f7','end');return true}
        }
        if((current['end'] == 'end') && (phase !== 100)){
            console.log('END --------------------- END');
        }
       })}

      useEffect(() => {
        if(endDetect){
            
            // test_voice_wyrocznia(testowy_label, phase) 
            
            send_detection_results_to_db()
            setEndDetect(!endDetect)
        }
      },[dataFromChildComponent])

    const returnComponent = () => {
            return(
            <Container>
              <ShuffleFate />
            </Container>
            )
    }

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