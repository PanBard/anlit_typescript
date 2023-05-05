import React, { useMemo, useState } from "react";
import { Kropki } from "./Kropki";
import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";


type VoiceRecognitionProps = {
  grabSound: any,
  return_described_to_parent_component(params: any): any,
  cation: boolean,
  id?: any,
  phase?:any,
}

export const VoiceRecognition: React.FunctionComponent<VoiceRecognitionProps> = ({
  grabSound,
  return_described_to_parent_component,
  cation,
  id,
  phase
}) => {

  const [word , setWord] = useState<string>()
  let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
  
  
  const [show, setShow] = useState(true)
  const db_text_name = cation ? 'c_analysis_texts' : 'a_analysis_texts' 
  let slowa = ''

let recognition = new SpeechRecognition()
// let recognitionList = new SpeechGrammarList()
// recognitionList.addFromString(grammar, 1)
// recognition.grammars = recognitionList
// recognition.lang = 'en-US'
recognition.lang = 'pl-PL'
recognition.continuous = false;
recognition.interimResults = true;
recognition.maxAlternatives = 1;

const Voice = (words: string) => {
  const msg = new SpeechSynthesisUtterance()
  msg.lang = 'pl-PL'
  msg.text =  words
  window.speechSynthesis.speak(msg)
}


const renderSpeech = () => {
recognition.start()
recognition.onresult = (event: any) => {
  //handle result in here
  setShow(true)
  console.log(event.results[0][0].transcript)
  setWord(event.results[0][0].transcript) 
  slowa = event.results[0][0].transcript
  if(event.results[0][0].transcript.search("bocie")!=-1){
    Voice('Tak panie?')
  }
  if((event.results[0][0].transcript.search("brak")!=-1) || (event.results[0][0].transcript.search("nic")!=-1)){
    console.log('wykryto brak')
    return_described_to_parent_component(0)
  }
  if((event.results[0][0].transcript.search("biały")!=-1) || (event.results[0][0].transcript.search("białe")!=-1)){
    console.log('wykryto bialego')
    return_described_to_parent_component(1)
  }
  if((event.results[0][0].transcript.search("czarny")!=-1) || (event.results[0][0].transcript.search("Czarny")!=-1) || (event.results[0][0].transcript.search("ciemny")!=-1)){
    console.log('wykryto czarnego')
    return_described_to_parent_component(2)
  }

  if((event.results[0][0].transcript.search("pomarańczowy")!=-1) || (event.results[0][0].transcript.search("pomarańczowym")!=-1)){
    console.log('wykryto czarnego')
    return_described_to_parent_component(9)
  }

  if((event.results[0][0].transcript.search("fioletowy")!=-1) || (event.results[0][0].transcript.search("fioletowym")!=-1)){
    console.log('wykryto czarnego')
    return_described_to_parent_component(10)
  }

  if((event.results[0][0].transcript.search("zółtym")!=-1) || (event.results[0][0].transcript.search("żółty")!=-1)){
    console.log('wykryto czarnego')
    return_described_to_parent_component(11)
  }
  if((event.results[0][0].transcript.search("zółtym")!=-1) || (event.results[0][0].transcript.search("żółty")!=-1)){
    console.log('wykryto czarnego')
    return_described_to_parent_component(11)
  }
}

recognition.onend = (event) => {
  console.log('ONEND::::',slowa)
  console.log("Speech recognition service disconnected");
  const query = `UPDATE ${db_text_name} SET f${phase-1}=? WHERE id=?`
  // Axios.put(SERVER_ROUTS.cation_analysis_texts.put, {id:id, query: query , script: slowa }).then(res=>console.log(res))
  Axios.post(SERVER_ROUTS.all_chat_messages.post, {chat_id:id, message: slowa,author: 'human', ion: cation ? 'cation' : 'anion' }).then(res=>console.log('Messages db: ',res.data))
  setShow(false)
};
}
if(typeof word != 'undefined'){
  console.log(word.search("Bocie."))
}

useMemo(()=>{
  renderSpeech()
},[grabSound])


  return(
    <div>
  
      <div>
          {/* elo */}
          {/* <button onClick={renderSpeech}>Press to Talk</button> */}
          {word}
      </div> 
         {show && <Kropki/>}
    </div>
      
  )
}
