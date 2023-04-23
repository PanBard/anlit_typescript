import React, { useMemo, useState } from "react";
import { Kropki } from "./Kropki";


type VoiceRecognitionProps = {
  grabSound: any,
  return_described_to_parent_component(params: any): any
}

export const VoiceRecognition: React.FunctionComponent<VoiceRecognitionProps> = ({
  grabSound,
  return_described_to_parent_component
}) => {

  const [word , setWord] = useState<string>()
  let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
  
  
  const [show, setShow] = useState(true)


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
  if((event.results[0][0].transcript.search("czarny")!=-1) || (event.results[0][0].transcript.search("ciemny")!=-1)){
    console.log('wykryto czarnego')
    return_described_to_parent_component(2)
  }
}

recognition.onend = () => {
  console.log("Speech recognition service disconnected");
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
