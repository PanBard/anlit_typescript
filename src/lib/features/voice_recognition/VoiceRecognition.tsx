import React, { useMemo, useState } from "react";
import { Kropki } from "../../styles/Dots";
import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";


type VoiceRecognitionProps = {
  grabSound: any,
  return_described_to_parent_component(params: any): any,
  cation: boolean,
  id?: any,
  phase?:any,
  lang: string
}

export const VoiceRecognition: React.FunctionComponent<VoiceRecognitionProps> = ({
  grabSound,
  return_described_to_parent_component,
  cation,
  id,
  phase,
  lang
}) => {

  const [word , setWord] = useState<string>()
  let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
  
  
  const [show, setShow] = useState(true)
  const db_text_name = cation ? 'c_analysis_texts' : 'a_analysis_texts' 
  let slowa = ''
  let detected: any;

let recognition = new SpeechRecognition()
recognition.lang = (lang == 'PL' ? 'pl-PL' : 'en-US')
recognition.continuous = false;
recognition.interimResults = true;
recognition.maxAlternatives = 1;

const renderSpeech = () => {
recognition.start()
recognition.onresult = (event: any) => {
  //handle result in here
  setShow(true)  
  setWord(event.results[0][0].transcript) 
  slowa = event.results[0][0].transcript

  if((event.results[0][0].transcript.search("brak")!=-1) || (event.results[0][0].transcript.search("nic")!=-1)){
    detected=0
  }

  if((event.results[0][0].transcript.search("nothing")!=-1) || (event.results[0][0].transcript.search("nic")!=-1)){
    detected=0
  }

  if((event.results[0][0].transcript.search("biały")!=-1) || (event.results[0][0].transcript.search("białe")!=-1)){
    detected=1
  }
  if((event.results[0][0].transcript.search("czarny")!=-1) || (event.results[0][0].transcript.search("Czarny")!=-1) || (event.results[0][0].transcript.search("ciemny")!=-1)){    
    detected=2
  }

  if((event.results[0][0].transcript.search("pomarańczowy")!=-1) || (event.results[0][0].transcript.search("pomarańczowym")!=-1)){    
    detected=9
  }

  if((event.results[0][0].transcript.search("fioletowy")!=-1) || (event.results[0][0].transcript.search("fioletowym")!=-1)){    
    detected=10
  }

  if((event.results[0][0].transcript.search("zółtym")!=-1) || (event.results[0][0].transcript.search("żółty")!=-1)){    
    detected=11
  }
  
}

recognition.onend = (event) => {
  if(slowa?.length)(Axios.post(SERVER_ROUTS.chat_messages.post, {chat_id:id, message: slowa,author: 'human', ion: cation ? 'cation' : 'anion' }).then(res=>console.log('Messages db: ',res.data))
  .then(()=>{
    if(typeof detected != 'undefined'){
      return_described_to_parent_component(detected)
    }
  }))
  setShow(false)
};
}


useMemo(()=>{
  renderSpeech()
},[grabSound])


  return(
    <div>
  
      <div>
          {word}
      </div> 
         {show && <Kropki/>}
    </div>
      
  )
}
