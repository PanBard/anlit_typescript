// import { Voice } from "lib/features/voiceRecognition";
import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";
import {  useTest_labels } from "lib/hooks/useDetectFlow";
import { useVoiceScript } from "lib/hooks/useVoiceScript";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";


type ShuffleFateProps = {
    id?: any,
    data?:any,
    phase?:any,
    label?:any
}

export const Wyrocznia: React.FunctionComponent<ShuffleFateProps> = ({
}) => {

    const [phase, setPhase] = useState<number>()
    const [data, setData] = useState<any[]>([])
    const [label, setLabel] = useState<any>()
    const [rightSymbol, setRightSymbol] = useState<any[]>([])
    const [foundIon, setfoundIon] = useState<any>()
    
    const script = useVoiceScript()


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

    useEffect(  ()  =>  {
        get_data()
    },[])

    const Voice = (words: string) => {
        const msg = new SpeechSynthesisUtterance()
        msg.lang = 'pl-PL'
        msg.text =  words
        window.speechSynthesis.speak(msg)
}

      const get_data = async () => {
      
        await  Axios.get(SERVER_ROUTS.ultimate_analysis.get)
        .then( (response: any)=>{console.log('WYROCZNIA db :)');setData(response.data);set_up_phase(response.data)})
        .catch((err)=>{console.log('db WYROCZNIA status :(')})
        
      }

    const set_up_phase = async (data: any)  => {
         const current = data[data.length-1]
         console.log('current wWYROCZNIA: ',current)
        if(typeof current !== 'undefined'){
             if((current['end'] == 'new') && (phase !== 100)){
             if(current['f1'] == null){setPhase(1);return true}
             if(current['f2'] == null){setPhase(2); setLabel(current.f1);return true}
             if(current['f3'] == null){setPhase(3);setLabel(current.f2);return true}
             if(current['f4'] == null){setPhase(4);setLabel(current.f3);return true}
             if(current['f5'] == null){setPhase(5);setLabel(current.f4);return true}
             if(current['f6'] == null){setPhase(6);setLabel(current.f5);return true}
             if(current['f7'] == null){setPhase(7);setLabel(current.f6);return true}
            }  
            
            if((current['end'] == 'end') && (phase !== 100)){
                console.log('END --------------------- END');
            }
        }
    }
    console.log('faza wyroczni:',phase)
    const shuffle = async () => {
        const current = data[data.length-1]
                if(phase == 1 && typeof phase !== 'undefined'){
                    Voice('Witam w  pierwszej fazie analizy! Proszę'+script.ORDER[1].startorder1) 
                    
                }
                
                if(phase == 2 && typeof phase !== 'undefined'){
                    Voice(script_detected[current.f1  as keyof typeof script_detected])
                    if(current.f1 == 'bialy'){ Voice(script.ORDER[1].opis+' '+script.ORDER[1].order2) ; console.log('1')}
                    if(current.f1 == 'brak'){ Voice(script.ORDER[2].opis+' '+script.ORDER[2].startoder1) ;console.log('1')}
                    if(current.f1 !== 'bialy' && current.f1 !== 'brak'){ Voice('Niestety ale na tym etapie analizy taki wynik nie powinien sie pojawić') ;console.log('1')}
                }

                if(phase == 3 && typeof phase !== 'undefined'){
                   
                    Voice('Witam w fazie trzeciej') 
                    if(current.f1 == 'bialy' && current.f2 == 'bialy'){ Voice('Właśnie wybrałeś biały osad');console.log('2') }
                    if(current.f1 == 'brak' && current.f2 == 'bialy' ){ Voice('Właśnie wybrałeś brak osad') ;console.log('2')}
                    if(current.f1 !== 'bialy' && current.f1 !== 'brak'){ Voice('Musztarda 2');console.log('2') }

                }
                if(phase == 4 && typeof phase !== 'undefined'){
               
                    Voice('Witam w fazie czworaka') 
                }
                if(phase == 5 && typeof phase !== 'undefined'){
              
                    Voice('Witam w fazie piątej') 
                }
                if(phase == 6 && typeof phase !== 'undefined'){
                   
                    Voice('Witam w fazie szóstej') 
                }
                if(phase == 7 && typeof phase !== 'undefined'){
                 
                    Voice('Witam w fazie ziudmej') 
                }

                if(phase !== 1 && typeof phase !== 'undefined'){
                    const current = data[data.length-1]
                    console.log('current  wWYROCZNIA w WYROCZNI function: ',current)


                    // Voice(`teraz jest ${phase} faza`)

                const prevoiusPhase = phase-1
                await Axios.put(SERVER_ROUTS.shuffle_match.get,{phase: prevoiusPhase, label: current[`f${prevoiusPhase}`]})
                .then( (response: any)=>{
                    console.log('data wWYROCZNIA: ',response.data[0])
                const data = response.data;
                console.log('faza wyroczni:',phase)
               })
                .catch((err)=>{console.log('db status :(')})
                }}

useMemo(()=>{
    if(typeof phase !== 'undefined'){console.log('włączamy szufle'); shuffle()}
},[phase])



return null
}


const MyImage = styled.img`
width: 100px;
height: 100px;
`

const Td = styled.td`
    border: 1px solid gray;
    justify-content: center;
    
`

const Container = styled.div`
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    
`
const Container12 = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: row;
    flex: 1;
 
    
`

const MojButton = styled.button`
    padding: 10px 5px;
    text-align: center;
    border-radius: 8px; 
    background-color: ${({theme})=> theme.colors.primary};
    /* background-color: red; */
    cursor: pointer;
`

const Contr = styled.div`
    /* display: inline-block; */
    display: flex;
    flex-direction: row;
`

const SmallButton = styled.button`
    background-color: gray;
    border: 1px solid red;
    margin-left: 10px;
    cursor: pointer;
`