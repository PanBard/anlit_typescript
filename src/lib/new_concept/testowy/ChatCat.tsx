import React, { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { Chat } from "./Chat"
import  Axios  from "axios"
import { SERVER_ROUTS } from "lib/database/server_routs";
import { Speech } from "./Speech";
import { VoiceRecognition } from "./VoiceRecognition";


type ChatCatProps = {
    script: any,
    cation: boolean,
    id?: any,
    ready: boolean,
    refreshChat?: any,
    return_results_to_parent_component(params: any): any
}

export const ChatCat: React.FunctionComponent<ChatCatProps> = ({
    // script,
    cation,
    id,
    ready,
    refreshChat,
    return_results_to_parent_component
}) =>{

    const [phase, setPhase] = useState<number>()
    const [data, setData] = useState<any[]>([])
    const [script, setScript] = useState<string>()
    const [currentConversation,setCurrentConversation] = useState<any>()
    const [nowTellSomething, setNowTellSomething] = useState<boolean>(false)
    const refChat = useRef<any>(null);

    const [seed, setSeed] = useState(1);

    const reset = () => {
        setSeed(Math.random())
    }


    const db_type = cation ? 'cation_analysis' : 'anion_analysis' 
    const db_type_name = cation ? 'script_flow' : 'a_script_flow' 
    const db_voice_script_name = cation ? 'cation_voice_script' : 'anion_voice_script' 
    const db_rout = cation ? 'cation_analysis_texts' : 'anion_analysis_texts'


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

   const show_conversation = () => {
    if(currentConversation && phase){
        // refChat.current.scrollIntoView({ behavior: "smooth" })
         const key = Object.keys(currentConversation)
        //  console.log('key',key)
         return(
            key.map((obj,index)=>{
        // console.log('currentConversation[obj]', typeof currentConversation[obj])
       if(obj !== `f${phase-1}` && obj !== 'id' && typeof currentConversation[obj] !== 'object') {
        // refChat.current.scrollIntoView({ behavior: "smooth" })
       return(<ChatContainer key={index}>{currentConversation[obj]}</ChatContainer>)}
    })
         )
    
    
    }
    else{
        return (<div> brak wiadomości</div>)
    }
   
    
   }


   const get_data = async () => {
      
    await  Axios.get(SERVER_ROUTS[db_type].get)
    .then( (response: any)=>{console.log('CAT db :)');setData(response.data);set_up_phase(response.data)})
    .catch((err)=>{console.log('db CAT status :(')})
    
  }

  const get_script = async () => {
    await  Axios.get(SERVER_ROUTS[db_rout].get)
    .then( (response: any)=>{console.log('WYROCZNIA db :)')
        const data = response.data
        console.log('wszystkie sktypTY',data[data.length -1])
        setCurrentConversation(data[data.length -1])
})
    .catch((err)=>{console.log('db status :(')})
}
useMemo(async ()=>{
    if(ready) get_script()
},[ready])

useMemo(async ()=>{
     reset()
},[refreshChat])

  useMemo(async ()=>{
    if(typeof phase !== 'undefined'){console.log('cAT faza:',phase)}
},[phase])

// useMemo(()=>{
        
//     },[script])



    return(
        <ContainerP>
            
            <ContainerF>
                <ChatHeader>
                 <b>CatChat</b> 
                </ChatHeader>
                <ChatBody >

                    {show_conversation()}
                    {ready && < Chat key={seed} cation={cation} id ={id} script={script} phase={phase}/>  }
                    <div style={{clear: 'left'}}></div>

                    <Container2 ref={refChat}><Container > {nowTellSomething && <VoiceRecognition return_described_to_parent_component={e => {return_results_to_parent_component(e)}} grabSound={3}/>}   </Container></Container2>
                </ChatBody>
                <AnswerBox onClick={()=>{console.log('epic'); setNowTellSomething(!nowTellSomething)}} >
                   <div>
                    Wytłumacz
                    </div> 
                </AnswerBox>
            </ContainerF>
          
        </ContainerP>
    )

}

const ChatContainer = styled.div`
    border: 3px solid #626062;
    border-radius: 10px;
    justify-content: center;
    width: 270px;
    float: left;
    margin: 5px;
    padding: 5px;
    float:none;
    
`


const ContainerF = styled.div`

   position: fixed;
   overflow: hidden;
   `

const AnswerBox = styled.div`
    border: 3px solid green;
    display: flex;
    justify-content: flex-end;
    text-align: flex-end;
    height: 30px;
    width: 90px;
    float: right;
    margin: 10px;
    cursor: pointer;
    border-radius: 10px;
`

const Container = styled.div`
    
    border: 3px solid #626062;
    border-radius: 10px;
    padding: 5px;
`

const Container2 = styled.div`
    /* width: 300px; */
    display: flex;
    justify-content: flex-end;
 
`

const ChatHeader = styled.div`
    border: 2px solid gray;
    border-radius: 10px;
    justify-content: center;
    text-align: center;
    height: 40px;
    width: 100px;
    /* background-color: grey; */
    margin-bottom: 5px;
`

const ChatBody = styled.div`
    padding: 5px;
    border: 2px solid gray;
    border-radius: 10px;
    justify-content: center;
    width: 400px;
    height: 350px;
    max-height: 350px;
    color: ${({theme}) => theme.colors.typography};
    overflow-y: scroll;
    ::-webkit-scrollbar{
        width: 5px;  
        background: grey;  
    }
    ::-webkit-scrollbar-thumb {
    background: #484748;
    }
    

    /* background-color: grey; */
`

const ContainerP = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    padding: 5px;
    
    /* background-color: magenta; */
`