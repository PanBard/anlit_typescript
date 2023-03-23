import React from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";



export const Voice = (words: string) => {

    

    const msg = new SpeechSynthesisUtterance()
    msg.lang = 'pl-PL'
    
    // msg.text =  "No jak na razie jest ok"
    msg.text =  words
    window.speechSynthesis.speak(msg)
    
    

//   const commands =[
//     {
//       command: 'bomba.',
//       callback:({resetTranscript}) => resetTranscript()
//     },
//     {
//       command: 'otwórz *',
//       callback: (site) => {window.open('http://'+site.slice(0,-1))
//                             console.log('http://'+site.slice(0,-1))} //window.open('http://'+site)
      
//     },
//     {
//       command: 'powtórz *',
//       callback: (slowa) =>{
//         msg.text = slowa
//         window.speechSynthesis.speak(msg)}
//     },
//     {
//       command: 'raport.',
//       callback: (raport) =>{
//         msg.text =  "No jak na razie jest ok"
//         window.speechSynthesis.speak(msg)}
//     }
//   ] 


//   const { transcript, resetTranscript } = useSpeechRecognition({commands})
 
//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     return null;
//   }
//   if(transcript.search("bocie")!==-1 || transcript.search("bot")!==-1){
//     msg.text = "Tak? Nasłuchuję bardzo uważnie."
//     window.speechSynthesis.speak(msg)
//     resetTranscript()
//   }

  
//   console.log(transcript)
//   console.log(transcript.search("bocie"))
//   // if(transcript.search("bocie")!=-1){
//   //   const msg = new SpeechSynthesisUtterance()
//   //   msg.lang = 'pl-PL'
//   //   msg.text = transcript
//   //   window.speechSynthesis.speak(msg)
//   // }
 


 





}