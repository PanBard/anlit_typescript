import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { DbPushAndGet } from "./db_management"
import { AnalysisTestowy } from "./AnalysisTestowy"
import  Axios  from "axios"
import { SERVER_ROUTS } from "lib/database/server_routs"
import { db_insert_new_id_and_status_analysis } from "./crud_data"
import { Wyrocznia } from "./Wyrocznia"
import { BestButton } from "lib/components/components_modules"



export const TestowyDashboard: React.FunctionComponent = () => {
    
    const [phase, setPhase] = useState(1)
    const [choosen_mode, setChoosen_mode] = useState('start')
    const [current_analysis, setCurrent_analysis] = useState('unknown')
    const [data, setData] = useState<any[]>([])
    const [analysis_name, setAnalysis_name] = useState<string>('Default name')
    const [id, setId] = useState(1)
    const [seed, setSeed] = useState(1);
    const [script, setScript] = useState();
    const [talkingScript, setTalkingScript] = useState(' ');

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
        if(data.length == 0){
            console.log('New analysis id: ',1)
            await db_insert_new_id_and_status_analysis(1,analysis_name,current_analysis)
            .then(()=>setChoosen_mode('analiza'))
        }

        if(data[0]){
            
            console.log('New analysis id: ',id)
            await db_insert_new_id_and_status_analysis(id,analysis_name,current_analysis)
            .then(()=>setChoosen_mode('analiza'))
        }
}

    // useEffect(  ()  =>  {
    //     get_data_from_db()
    // },[])

    const get_data_from_db = (db: string) => {
        Axios.get(SERVER_ROUTS[db as keyof typeof SERVER_ROUTS].get)
        .then( (response: any)=>{console.log(':)');setData(response.data);console.log(' return_new_analysis_id()',return_new_analysis_id(response.data));return_new_analysis_id(response.data) })
        .catch((err)=>{console.log('db status :(', err)})
    }
      console.log('daszbord',choosen_mode)


    //   const chatOnScreen = (script: string, index: number, interval: string) => {   
    //     if (index < script.length) { 
    //         setTalkingScript(talkingScript + script[index++])
    //         console.log(talkingScript)
    //       setTimeout(function () { chatOnScreen( script, index, interval); }, parseFloat(interval) );
    //     }
    //   }



      
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
                <Container>
                    <Container>{talkingScript}</Container>
                       <AnalysisTestowy cation={true} phase1={phase} rerender={reset} key={seed} name={analysis_name} id={id} back={()=>{setChoosen_mode('start'); }}/>
                       <Wyrocznia cation={true} key={seed+3} rerender={reset} return_script={(message)=>{setScript(message)}}/>
                </Container>
            )
            }

            if(current_analysis == 'anion'){
                return(
                <Container>
                       <AnalysisTestowy cation={false} phase1={phase} rerender={reset} key={seed} name={analysis_name} id={id} back={()=>{setChoosen_mode('start'); }}/>
                       <Wyrocznia cation={false} key={seed+3} rerender={reset} return_script={(message)=>{setScript(message)}}/>
                </Container>
            )
            }
            
        }

      }

    //   useMemo(()=>{if(script) chatOnScreen(script,0,'0,2')},[script])
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

const ContainerP = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
    
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


