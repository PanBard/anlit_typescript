// import { Voice } from "lib/features/voiceRecognition";
import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";
import {  useTest_labels } from "lib/hooks/useDetectFlow";
import { useVoiceScript } from "lib/hooks/useVoiceScript";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";



export const test_voice_wyrocznia = ( phase: number, current: any) =>{
    
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

    const script = useVoiceScript()

    const Voice = (words: string) => {
            const msg = new SpeechSynthesisUtterance()
            msg.lang = 'pl-PL'
            msg.text =  words
            window.speechSynthesis.speak(msg)
    }
  
    
    const labelMap = useTest_labels()

   



    const jazda1 =async (phase: number) => {
        if(phase==2){
            if(current.f1 == 'bialy'){ Voice('Wybrałęs bialy osad') ; console.log('1')}
            if(current.f1 == 'brak'){ Voice('Jazda dalej') ;console.log('1')}
            if(current.f1 !== 'bialy' && current.f1 !== 'brak'){ Voice('Musztarda') ;console.log('1')}
        }
            return true

    }

    const jazda2 =async (phase: number) => {
        if(phase==3){
            if(current.f1 == 'bialy' && current.f2 == 'bialy'){ Voice('Właśnie wybrałeś biały osad');console.log('2') }
            if(current.f1 == 'brak' && current.f2 == 'bialy' ){ Voice('Właśnie wybrałeś brak osad') ;console.log('2')}
            if(current.f1 !== 'bialy' && current.f1 !== 'brak'){ Voice('Musztarda 2');console.log('2') }
        }
            return true

    }

    

    if(typeof current !== 'undefined'){
        if((current['end'] == 'new') && (phase !== 100)){
        if(current['f1'] == null){jazda1(1);return true}
        if(current['f2'] == null){jazda1(2);return true}
        if(current['f3'] == null){jazda2(3);return true}
        if(current['f4'] == null){jazda1(4);return true}
        if(current['f5'] == null){jazda1(5);return true}
        if(current['f6'] == null){jazda1(6);return true}
        if(current['f7'] == null){jazda1(7);return true}
       }  
       
       if((current['end'] == 'end') && (phase !== 100)){
           console.log('END --------------------- END');
       }
   }




    // console.log(script_detected[labelMap[label_number] as keyof typeof script_detected])

//     if(phase==1){
//          Voice(script_detected[labelMap[label_number] as keyof typeof script_detected])
//         Voice('Faza 1')
//     }

//     if(phase==2){
//         Voice(script_detected[labelMap[label_number] as keyof typeof script_detected])
//        Voice('Faza 2')
//    }

//    if(phase==3){
//     Voice(script_detected[labelMap[label_number] as keyof typeof script_detected])
//    Voice('Faza 3')
// }
   

// const get_data = async () => {
//     let kontrol = false
//   await  Axios.get(SERVER_ROUTS.ultimate_analysis.get)
//     .then( (response: any)=>{console.log('voice db :)',)
//     const data = response.data
//     const current = data[data.length-1]
//     console.log('current w voice',current)
//             if(phase==2){
//                 if(current.f1 == 'bialy'){
//                     console.log('VOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOICE')
//                  Voice(script.INFORM.after_phase_1.info)
//                 }}
                
//         //     if(phase==3){
//         //         if(obj.f1 == current.f1 && obj.f2 ==current.f2){
//         //             name_array.push(obj.symbol)
//         //             znaczki=znaczki+' '+obj.symbol
//         //         }
//         //         if(obj.f1 == current.f1 && obj.f2 == current.f2  && obj.f3=='-' ){
                  
//         //         }}
    
    
//         //     if(phase==4){
//         //         if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3  ){
//         //             name_array.push(obj.symbol)
//         //             znaczki=znaczki+' '+obj.symbol
//         //         }
//         //         if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4=='-' ){
                  
                   
//         //         }}
    
    
//         //     if(phase==5){
//         //         if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  ){
//         //             name_array.push(obj.symbol)
//         //             znaczki=znaczki+' '+obj.symbol
//         //         }
//         //         if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  && obj.f5=='-' ){
                  
//         //         }}
    
    
//         //     if(phase==6){
//         //         if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  && obj.f5 == current.f5 ){
//         //             name_array.push(obj.symbol)
//         //             znaczki=znaczki+' '+obj.symbol
//         //         }
//         //         if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4 && obj.f5 == current.f5 && obj.f6=='-' ){
                   
//         //         }}
    
    
//         //     if(phase==7){
//         //         if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  && obj.f5 == current.f5 && obj.f6 == current.f6 ){
//         //             name_array.push(obj.symbol)
//         //             znaczki=znaczki+' '+obj.symbol
//         //         }
//         //         if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4 && obj.f5 == current.f5 && obj.f6 == current.f6 && obj.f7=='-' ){
                    
//         //         }}
// })
//     .catch((err)=>{console.log('db status :(',err)})
//     if(kontrol) return 'ok'
//   }

// get_data()

    
   





    return true

}
