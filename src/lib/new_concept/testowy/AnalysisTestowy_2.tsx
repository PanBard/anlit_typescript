import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import  Axios  from "axios"
import { SERVER_ROUTS } from "lib/database/server_routs"
import { ShuffleFate } from "./ShuffleFate"
import { useTest_labels } from "lib/hooks/useDetectFlow";
import { BestButton, ContainerP } from "lib/components/components_modules"
import { LiveUpdate } from "./LiveUpdate"
import { DetectBase } from "../DetectBase"
import { DetectBase_v2 } from "./DetectBase_v2"
import { DetectBase_v2_detect } from "./DetectBase_v2_detect"

type AnalysisProps = {
    id: number,
    name?: string,
    back?(): void,
    rerender?(params: any): any,
    cation: boolean,
    chatCanTellNow(params: any): any,
    result_from_voice_description: any
}

export const AnalysisTestowy_2: React.FunctionComponent<AnalysisProps> = ({
    id,
    name,
    rerender,
    cation,
    chatCanTellNow,
    result_from_voice_description
}) => {
    const [data, setData] = useState<any[]>([])
    const[dataFromChildComponent , setDataFromChildComponent] = useState()
    const [phase, setPhase] = useState(1)
    const [endDetect, setEndDetect] = useState<boolean>(false)
    const [testowy_label,setTestowy_label] = useState<any>()
    const [image, setImage] = useState<any>()
    const [imgFromDataBase,setImgFromDataBase] = useState<any>([])
    const labelMap = useTest_labels()
    const [bollena, setBoollena] = useState<boolean>(false)

    const db_type = cation ? 'cation_analysis' : 'anion_analysis' 
    const title = cation ? ' Identyfikacja kationu ' : ' Identyfikacja anionu '
    
    const nice_names = ['brak osadu','biały osad', 'czarny osad', 'żółty osad', 'pomarańczowy osad', 'zielony osad', 'niebieski osad', 'niebiesko-różowy osad', 'cielisty osad', 'pomarańczowy płyn', 'fioletowy płyn', 'żółty płyn']

    const catchMessageFromChild = (message: any) => {
        if(message[0] !== '404' && typeof message[0] !== 'undefined') //w razie gdyby wybrano opcje choose image
        {
            // console.log('!@# --> label:', message[0])
            // console.log('!@# --> img:', message[1])
            setTestowy_label(message[0]);
            setImage(message[1]);
            setDataFromChildComponent(message)
            setEndDetect(!endDetect)
        }
        else console.log('nic nie przekazano!')
      }; 

      useEffect(()=>{
        get_data()
       
      },[])

      

      const get_data = async () => {
      await  Axios.get(SERVER_ROUTS[db_type].get)
        .then( (response: any)=>{setData(response.data);
          Axios.get(SERVER_ROUTS.test_images.get)
          .then( (response: any)=>{
            // console.log('img --> :)');
          setImgFromDataBase(response.data) })
          .catch((err)=>{console.log('db status :(')})
        
        })
        .catch((err)=>{console.log('db status :(')})
      }

    const quck_update = async (label: any, img_index:string,f_index:string, end:string)=>{
      // console.log('labelMap[label]',labelMap[label])
        await Axios.put(SERVER_ROUTS[db_type].put, {id:id,name:name,[f_index]: labelMap[label] ,[img_index]:image,end:end})
        // .then(p => console.log('update----------------------------------------------------------UP'))
        .then(rerender)
    }; 

    const send_detection_results_to_db = async ()  => {
       await get_data()
       .then(e =>{
        // console.log('testowy label',testowy_label)
        const current = data[data.length-1]
        if((current['end'] == 'new') && (phase !== 100)){
            if(current['f1'] == null && current['end'] !== 'end'){quck_update(testowy_label,'img1','f1','new');return true}
            if(current['f2'] == null && current['end'] !== 'end'){quck_update(testowy_label,'img2','f2','new');return true}
            if(current['f3'] == null && current['end'] !== 'end'){quck_update(testowy_label,'img3','f3','new');return true}
            if(current['f4'] == null && current['end'] !== 'end'){quck_update(testowy_label,'img4','f4','new');return true}
            if(current['f5'] == null && current['end'] !== 'end'){quck_update(testowy_label,'img5','f5','new');return true}
            if(current['f6'] == null && current['end'] !== 'end'){quck_update(testowy_label,'img6','f6','new');return true}
            if(current['f7'] == null && current['end'] !== 'end'){quck_update(testowy_label,'img7','f7','new');return true}
        }
        if((current['end'] == 'new') && (current['f7'] !== null)){
           rerender
        }
       })}

      useEffect(() => {
        if(endDetect){
            send_detection_results_to_db()
            setEndDetect(!endDetect)
        }
      },[dataFromChildComponent])

      useMemo(()=>{
        if(typeof result_from_voice_description != 'undefined'){
          catchMessageFromChild([result_from_voice_description,''])
        }
      },[result_from_voice_description])
 

      return(
        <ContainerP>
          
          <Container>
          <BestButton onClick={()=>{window.location.reload()}} > Zakończ </BestButton>
          </Container>
          <Container2>
               {bollena && <DetectBase_v2 refreshChat={(e)=>{chatCanTellNow(e)}} return_results_to_parent_component={e => {catchMessageFromChild(e)}} key={phase}/>}  
               {/* {bollena && <DetectBase_v2_detect refreshChat={(e)=>{chatCanTellNow(e)}} return_results_to_parent_component={e => {catchMessageFromChild(e)}} key={phase}/>}   */}
            </Container2>

          {  !bollena &&  <Container>

                <Container>
                    
                    <h4>[{title}]</h4>
                    <h2>  Nazwa analizy: {name} </h2>
                    <h3>ID: {id}</h3>
                </Container>

                    <Container>
                        <label>Wybierz</label>
                        <select name="op" id="op" onChange={(obj)=>{ 
                          setTestowy_label(obj.target.value);
                          setImage(imgFromDataBase[obj.target.value].img );
                          }}>
                        <option key={89} value={404}> CHOOSE IMAGE </option>
                        {imgFromDataBase.map((obj: any,index: number)=>{
                        return(  <option key={index} value={index}> {nice_names[index]} </option>  )})}
                        </select>
                        <BestButton onClick={()=>{catchMessageFromChild([testowy_label,image])}} > Fake detection</BestButton>
                        <BestButton onClick={()=>{setBoollena(!bollena)}} > Webcam detection </BestButton>
                    </Container>

                   
                   
                    <Container>
                      <ShuffleFate cation={cation} />
                    </Container>
                

                
                  <LiveUpdate cation={cation}/>
                

            </Container>}
        </ContainerP>
       
    )
}


const Container = styled.div`
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    margin-bottom: 10px;
    
`

const Container2 = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    /* flex-direction: column; */
    flex: 1;
    z-index: 10000;
    
`

const Container1 = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1;
    
`