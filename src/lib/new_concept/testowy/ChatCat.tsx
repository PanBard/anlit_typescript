import React, { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { Chat } from "./Chat"
import  Axios  from "axios"
import { SERVER_ROUTS } from "lib/database/server_routs";
import { get_scriptvoice_match_id } from "./crud_data";

type ChatCatProps = {
    script: any,
    cation: boolean,
    id?: any
}

export const ChatCat: React.FunctionComponent<ChatCatProps> = ({
    // script,
    cation,
    id
}) =>{

    const [phase, setPhase] = useState<number>()
    const [data, setData] = useState<any[]>([])
    const [script, setScript] = useState<string>()
    const db_type = cation ? 'cation_analysis' : 'anion_analysis' 
    const db_type_name = cation ? 'script_flow' : 'a_script_flow' 
    const db_voice_script_name = cation ? 'cation_voice_script' : 'anion_voice_script' 



    useEffect(  ()  =>  {
        get_data()
    },[])


    
    const set_up_phase = async (data: any)  => {
        const current = data[data.length-1]
        console.log('faza CAT')
       if(typeof current !== 'undefined'){
            if((current['end'] == 'new') && (phase !== 100)){
            if(current['f1'] == null){setPhase(1);return true}
            if(current['f2'] == null){setPhase(2);return true}
            if(current['f3'] == null){setPhase(3);return true}
            if(current['f4'] == null){setPhase(4);return true}
            if(current['f5'] == null){setPhase(5);return true}
            if(current['f6'] == null){setPhase(6);return true}
            if(current['f7'] == null){setPhase(7);return true}
           }  
           
           if((current['end'] == 'new') && (current['f7'] !== null)){
               setPhase(8)
               console.log('ustawiono fazę 8');
           }
       }
   }


   const get_data = async () => {
      
    await  Axios.get(SERVER_ROUTS[db_type].get)
    .then( (response: any)=>{console.log('CAT db :)');setData(response.data);set_up_phase(response.data)})
    .catch((err)=>{console.log('db CAT status :(')})
    
  }


  useMemo(async ()=>{
    if(typeof phase !== 'undefined'){console.log('cAT faza:',phase)}
},[phase])

useMemo(()=>{
        
    },[script])



    return(
        <ContainerP>
            <ChatHeader>
                  <h3>ChatChat</h3> 
            </ChatHeader>
            <ChatBody>
                < Chat id ={id} script={script} phase={phase}/>
            </ChatBody>
          
        </ContainerP>
    )

}

const ChatHeader = styled.div`
    border: 3px solid gray;
    border-radius: 10px;
    justify-content: center;
    width: 300px;
    /* background-color: grey; */
    margin-bottom: 10px;
`

const ChatBody = styled.div`
    border: 3px solid gray;
    
    border-radius: 10px;
    justify-content: center;
    width: 300px;
    height: 300px;
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    overflow-y:scroll;
    /* background-color: grey; */
`

const ContainerP = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    /* background-color: magenta; */
`