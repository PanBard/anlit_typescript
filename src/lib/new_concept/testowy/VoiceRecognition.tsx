import React from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import 'regenerator-runtime/runtime'



export const VoiceRecognition: React.FunctionComponent = () => {
  let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
  let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
  console.log(SpeechRecognition)
  
  let moods = ['happy', 'sad', 'sleepy', 'angry']
let grammar = '#JSGF V1.0; grammar moods; public <moods> = ' + moods.join(' | ') + ';';

let recognition = new SpeechRecognition()
let recognitionList = new SpeechGrammarList()
recognitionList.addFromString(grammar, 1)
recognition.grammars = recognitionList
recognition.lang = 'en-US'
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;


const renderSpeech = () => {
recognition.start()
recognition.onresult = (event: any) => {
  //handle result in here
  let word = event.results[0][0].transcript
  console.log(word)
}
}
  return(
      <div>
          elo
          <button onClick={renderSpeech}>Press to Talk</button>
      </div>
  )
}
