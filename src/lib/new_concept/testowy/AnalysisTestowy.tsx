import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
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
    phase1: number,
    cation: boolean
}

export const AnalysisTestowy: React.FunctionComponent<AnalysisProps> = ({
    id,
    back,
    name,
    rerender,
    cation
}) => {
    const [data, setData] = useState<any[]>([])
    const[dataFromChildComponent , setDataFromChildComponent] = useState()
    const [phase, setPhase] = useState(1)
    const [endDetect, setEndDetect] = useState<boolean>(false)
    const [testowy_label,setTestowy_label] = useState<any>()
    const [image, setImage] = useState<any>()
    const [imgFromDataBase,setImgFromDataBase] = useState<any>([])
    const labelMap = useTest_labels()

    const db_type = cation ? 'cation_analysis' : 'anion_analysis' 
    console.log('db_type:',db_type)

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
      await  Axios.get(SERVER_ROUTS[db_type].get)
        .then( (response: any)=>{setData(response.data);
          Axios.get(SERVER_ROUTS.test_images.get)
          .then( (response: any)=>{console.log('img --> :)');setImgFromDataBase(response.data) })
          .catch((err)=>{console.log('db status :(')})
        
        })
        .catch((err)=>{console.log('db status :(')})
      }

    const quck_update = async (label: any, img_index:string,f_index:string, end:string)=>{
      console.log('labelMap[label]',labelMap[label])
        await Axios.put(SERVER_ROUTS[db_type].put, {id:id,name:name,[f_index]: labelMap[label] ,[img_index]:image,end:end})
        // .then(p => console.log('update----------------------------------------------------------UP'))
        .then(rerender)
    }; 

    const send_detection_results_to_db = async ()  => {
       await get_data()
       .then(e =>{
        console.log('testowy label',testowy_label)
        const current = data[data.length-1]
        if((current['end'] == 'new') && (phase !== 100)){
            if(current['f1'] == null && current['end'] !== 'end'){console.log('faza f1');quck_update(testowy_label,'img1','f1','new');return true}
            if(current['f2'] == null && current['end'] !== 'end'){console.log('faza f2');quck_update(testowy_label,'img2','f2','new');return true}
            if(current['f3'] == null && current['end'] !== 'end'){console.log('faza f3');quck_update(testowy_label,'img3','f3','new');return true}
            if(current['f4'] == null && current['end'] !== 'end'){console.log('faza f4');quck_update(testowy_label,'img4','f4','new');return true}
            if(current['f5'] == null && current['end'] !== 'end'){console.log('faza f5');quck_update(testowy_label,'img5','f5','new');return true}
            if(current['f6'] == null && current['end'] !== 'end'){console.log('faza f6');quck_update(testowy_label,'img6','f6','new');return true}
            if(current['f7'] == null && current['end'] !== 'end'){console.log('faza f7');quck_update(testowy_label,'img7','f7','new');return true}
        }
        if((current['end'] == 'new') && (current['f7'] !== null)){
           rerender
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
              <ShuffleFate cation={cation} />
            </Container>
            )
    }

      return(
        <Container>

                    <Container>
                    <MojButton onClick={()=>{window.location.reload()}} > Cofnij </MojButton>
                    <h2>Nazwa analizy: {name} </h2>
                    <h3>ID: {id}</h3>
                    </Container>
            <label>Wybierz</label>
            <select name="op" id="op" onChange={(obj)=>{ 
                setTestowy_label(obj.target.value);
                setImage(imgFromDataBase[obj.target.value].img );
                }}>
                <option key={89} value={404}> CHOOSE IMAGE </option>
                {imgFromDataBase.map((obj: any,index: number)=>{
                return(  <option key={index} value={index}> {obj.label} </option>  )
                })}

            </select>
            <MojButton onClick={()=>{catchMessageFromChild([testowy_label,image])}} > Fake detection</MojButton>
            <Container2>
                       {returnComponent()}
                       <LiveChangeWatch cation={cation} message={dataFromChildComponent}/>
                    
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