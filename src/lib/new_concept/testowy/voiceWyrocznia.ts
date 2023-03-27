// import { Voice } from "lib/features/voiceRecognition";
import {  useTest_labels } from "lib/hooks/useDetectFlow";
import { useVoiceScript } from "lib/hooks/useVoiceScript";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";



export const test_voice_wyrocznia = (label_number: number) =>{

    const script_detected= {
        "brak": 'Wykryto próbówkę bez osadu!',
        "bialy" :'Wykryto próbówkę zawierającą biały osad!',
        "czarny" :'Wykryto próbówkę zawierającą czarny osad!',
        "zolty" :'Wykryto próbówkę zawierającą żółty osad!',
        "pomaranczowy" :'Wykryto próbówkę zawierającą pomarańczowy osad!',
        "zielony" :'Wykryto próbówkę zawierającą zielony osad!',
        "niebieski" :'Wykryto próbówkę zawierającą niebieski osad!',
        "nieb_rozowy" :'Wykryto próbówkę zawierającą niebiesko-różowy osad!'
    }

    const Voice = (words: string) => {
            const msg = new SpeechSynthesisUtterance()
            msg.lang = 'pl-PL'
            msg.text =  words
            window.speechSynthesis.speak(msg)
    }
  
    
    const labelMap = useTest_labels()

    
  

    

    // console.log('wyrocznia',labelMap[label_number])
    // console.log('label_number',label_number)

    console.log(script_detected[labelMap[label_number] as keyof typeof script_detected])

    Voice(script_detected[labelMap[label_number] as keyof typeof script_detected])

    return true

}
