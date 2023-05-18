import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { DbPushAndGet } from "./db_management"
import { AnalysisTestowy } from "./AnalysisTestowy"
import { AnalysisTestowy_2 } from "./AnalysisTestowy_2"
import  Axios  from "axios"
import { SERVER_ROUTS } from "lib/database/server_routs"
import { db_insert_new_id_and_status_analysis } from "./crud_data"
import { Wyrocznia } from "./Wyrocznia"
import { BestButton } from "lib/components/components_modules"
import { ChatCat } from "./ChatCat"



export const TestowyDashboard: React.FunctionComponent = () => {
    
    const [phase, setPhase] = useState(1)
    const [choosen_mode, setChoosen_mode] = useState('start')
    const [current_analysis, setCurrent_analysis] = useState('unknown')
    const [data, setData] = useState<any[]>([])
    const [analysis_name, setAnalysis_name] = useState<string>('Default name')
    const [id, setId] = useState(1)
    const [seed, setSeed] = useState(1);
    const [seed_for_chat, setSeed_for_chat] = useState<boolean>(false);
    const [script, setScript] = useState();
    const [ion_founded, setIonfounded] = useState<boolean>(false);
    const [conversation_chat, setConversation_chat] = useState<any[]>([])
    const [refreshChat, setRefreshChat] = useState<any>()
    const [result_from_voice_describe, setResult_from_voice_describe] = useState<any>()
    
    // console.log('ion_founded zewnatrz',ion_founded)

    const reset = () => {
        setPhase(phase+1)
        setSeed(Math.random())
        // console.log('ion_founded',ion_founded)
        if(!ion_founded) {
            setScript(undefined)
        } 
    }

//   useMemo(()=>{
//     if( typeof result_from_voice_describe == 'number' || result_from_voice_describe == '0'){
//         // console.log('result_from_voice_describe in dashboard: ',result_from_voice_describe)
//     }
    
//   },[result_from_voice_describe])

  const make_tetection = (e: any) => {
    setResult_from_voice_describe(e)
  }
    
   const return_new_analysis_id = (data: any)=>  {
        const new_id = data[data.length-1]['id']+1
        setId(new_id)
        return new_id
    }

    const insert_to_db =async () => {
        if(data.length == 0){
            // console.log('New analysis id: ',1)
            await db_insert_new_id_and_status_analysis(1,analysis_name,current_analysis)
            .then(()=>setChoosen_mode('analiza'))
        }

        if(data[0]){
            
            // console.log('New analysis id: ',id)
            await db_insert_new_id_and_status_analysis(id,analysis_name,current_analysis)
            .then(()=>setChoosen_mode('analiza'))
        }
}


    const get_data_from_db = (db: string) => {
        Axios.get(SERVER_ROUTS[db as keyof typeof SERVER_ROUTS].get)
        .then( (response: any)=>{
            // console.log(':)');
        setData(response.data);return_new_analysis_id(response.data) })
        .catch((err)=>{console.log('db dashboard status :(', err)})
    }
      


      const returnComponent = () => {
        if(choosen_mode=='start'){
            return(
            <ContainerP>
                <BestButton onClick={()=>{ setChoosen_mode('choose_ion') }} > Nowa analiza</BestButton>
                <BestButton onClick={()=>{ setChoosen_mode('stara') }} > Kontynyuj poprzednie</BestButton>
                
            </ContainerP>
            )
        }

        if(choosen_mode=='choose_ion'){
            return(
                <ContainerP>
                    <BestButton onClick={()=>{ setChoosen_mode('new_analysis'); setCurrent_analysis('cation'); get_data_from_db('cation_analysis') }} > Analiza kationów </BestButton>
                    <BestButton onClick={()=>{ setChoosen_mode('new_analysis'); setCurrent_analysis('anion'); get_data_from_db('anion_analysis')   }} > Analiza anionów </BestButton>
                </ContainerP>
                )
        }

        if(choosen_mode == 'new_analysis'){

            return(
                <ContainerP>
                    <Container>

                        <ContainerP>
                            <BestButton onClick={()=>{ setChoosen_mode('start') }} > Cofnij </BestButton>
                        </ContainerP>
             
                       
                        <ContainerW>
                        Wpisz nazwę nowej analizy:
                        <input style={{backgroundColor: 'gray'}} type="text"  onChange={ (e)=>{setAnalysis_name(e.target.value)} }/>
                        </ContainerW>
                        <ContainerP>
                            <BestButton onClick={()=>{ insert_to_db() }} > Rozpocznij analizę </BestButton>
                        </ContainerP>
                    
                    </Container>
                    
                </ContainerP>
            )
        }
        

        if(choosen_mode == 'stara'){
            return(
                <Container>
                    <Container>
                    <BestButton onClick={()=>{ setChoosen_mode('start') }} > Cofnij </BestButton>
                    </Container>
                    <Container12>
                       <DbPushAndGet />
                    </Container12>
                </Container>
            )
        }

        if((choosen_mode == 'analiza')){

            if(current_analysis == 'cation'){
                return(
                <ContainerP>
                        
                        <AnalysisTestowy_2 result_from_voice_description={result_from_voice_describe} chatCanTellNow={()=>{setRefreshChat(refreshChat+1)}} cation={true}  rerender={()=>{setSeed_for_chat(false);reset()}} key={seed} name={analysis_name} id={id} back={()=>{setChoosen_mode('start'); }}/>
                        <Wyrocznia rerender_chat={()=>{setSeed_for_chat(true)}} ion_founded={()=>{setIonfounded(true)}} cation={true} key={seed+3} rerender={reset} return_script={(message)=>{setScript(message)}}/>
                       <ChatCat return_results_to_parent_component={e => {setResult_from_voice_describe(e), make_tetection(e)}} refreshChat={refreshChat} id={id} cation={true}  key={seed+9} script={script} ready={seed_for_chat}/>
                </ContainerP>
            )
            }

            if(current_analysis == 'anion'){
                return(
                <ContainerP>
                       <AnalysisTestowy_2 result_from_voice_description={result_from_voice_describe} chatCanTellNow={()=>{setRefreshChat(refreshChat+1)}} cation={false}  rerender={()=>{setSeed_for_chat(false);reset()}} key={seed} name={analysis_name} id={id} back={()=>{setChoosen_mode('start'); }}/>
                       <Wyrocznia rerender_chat={()=>{setSeed_for_chat(true)}} ion_founded={()=>{setIonfounded(true)}} cation={false} key={seed+3} rerender={reset} return_script={(message)=>{setScript(message)}}/>
                       <ChatCat return_results_to_parent_component={e => {setResult_from_voice_describe(e)}} refreshChat={refreshChat} id={id} cation={false}  key={seed+9} script={script} ready={seed_for_chat}/>
                </ContainerP>
            )
            }
            
        }

      }

    
    return(
        <Container>
         
            {returnComponent()}

        </Container>
        
    )
}


const Container = styled.div`
    position: absolute;
    width: 100%;
    top: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
     background-color:#161b22;
`

const ContainerP = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
    /* background-color: grey; */
    
    
    
`

const ContainerW = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    `

const Container12 = styled.div`
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    /* overflow-y:scroll; */
    `


