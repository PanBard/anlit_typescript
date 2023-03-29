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
    rerender():any,
    cation: boolean
}

export const Wyrocznia: React.FunctionComponent<ShuffleFateProps> = ({
    rerender,
    cation
}) => {

    const [phase, setPhase] = useState<number>()
    const [data, setData] = useState<any[]>([])
    const [rightSymbol, setRightSymbol] = useState<any[]>([])
    const [foundIon, setfoundIon] = useState<any>()
    
    const db_type = cation ? 'cation_analysis' : 'anion_analysis' 
    const db_type_name = cation ? 'script_flow' : 'a_script_flow' 
    const db_voice_script_name = cation ? 'cation_voice_script' : 'anion_voice_script' 
    console.log('db_type:',db_type)



 


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
      
        await  Axios.get(SERVER_ROUTS[db_type].get)
        .then( (response: any)=>{console.log('WYROCZNIA db :)');setData(response.data);set_up_phase(response.data)})
        .catch((err)=>{console.log('db WYROCZNIA status :(')})
        
      }
    

    const set_up_phase = async (data: any)  => {
         const current = data[data.length-1]
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

    const shuffle = async () => {

        const current = data[data.length-1]
            if(phase == 1 && typeof phase !== 'undefined'){Voice('Faza pierwsza!') }

            if(phase !== 1 && typeof phase !== 'undefined'){
                const prevoiusPhase = 'f'+(phase - 1)
                const prevoiusLabel = current[prevoiusPhase]

                await Axios.put(SERVER_ROUTS.shuffle_match.get,{phase: (phase-1), label: prevoiusLabel, db_type:db_type_name})
                .then((response)=>{
                    const data = response.data;
                    console.log('Mapowanie w fazie',phase)
                    data.map((obj: any)=>{

                        if(phase==2){
                            if(obj.f1 == current.f1){
                                console.log('szukanie w fazie 2')
                                setRightSymbol(prevoius => [...prevoius, obj.id])
                            }}

                        if(phase==3){
                            if(obj.f1 == current.f1 && obj.f2 ==current.f2){
                                console.log('szukanie w fazie 3')
                                setRightSymbol(prevoius => [...prevoius, obj.id])
                            }}

                        if(phase==4){
                            if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3  ){
                                console.log('szukanie w fazie 4')
                                setRightSymbol(prevoius => [...prevoius, obj.id])
                            }}

                        if(phase==5){
                            if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  ){
                                console.log('szukanie w fazie 5')
                                setRightSymbol(prevoius => [...prevoius, obj.id])
                            }}

                        if(phase==6){
                            if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  && obj.f5 == current.f5 ){
                                console.log('szukanie w fazie 6')
                                setRightSymbol(prevoius => [...prevoius, obj.id])
                            }}

                        if(phase==7){
                            if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  && obj.f5 == current.f5 && obj.f6 == current.f6 ){
                                console.log('szukanie w fazie 7')
                                setRightSymbol(prevoius => [...prevoius, obj.id])
                            }}

                        if(phase==8){
                            if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  && obj.f5 == current.f5 && obj.f6 == current.f6  && obj.f7 == current.f7){
                                console.log('szukanie w fazie 8')
                                setRightSymbol(prevoius => [...prevoius, obj.id])
                            }}

                    } ) 
                    // if(rightSymbol.length == 0) Voice('Niestety, ale taki wynik nie powinien się pojawić na tym etapie analizy.')
                })

                
               

            }

            }


const set_happy_end =async (id: any) => {
        const current = data[data.length-1]
        console.log('happy_end -- id',current.id)
    if(current.end !== 'end'){
        await Axios.put(SERVER_ROUTS[db_type].put, {id: current.id , end:'end'})
            .then(p => {console.log(p.data);
                const query = `SELECT symbol FROM ${db_type_name} WHERE id = ${id}`
                Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
                .then((response)=>{console.log('z cutoma query: ',response.data[0].symbol)
                    Axios.put(SERVER_ROUTS[db_type].set_result, {id: current.id , result:response.data[0].symbol})
                        .then(rerender())

                    })
            

            
        })
    }
        

}


const get_script_from_db =async () => {
    await Axios.put(SERVER_ROUTS[db_voice_script_name].get_required_script,{phase: phase, match_id: rightSymbol[0] })
                .then((response)=>{console.log('powinien byc skrypt----->',response.data[0].script)
                if(response.data[0].f7 !== 'end') Voice(response.data[0].script)
                if(response.data[0].f7 == 'end'){Voice(response.data[0].script); Voice('Analiza zakończona powodzeniem!');set_happy_end(response.data[0].f6)} 
                })
                .catch((err)=>{console.log(err)})
}

useMemo(()=>{
    if(typeof phase !== 'undefined'){; shuffle()}
},[phase])

useMemo(()=>{
    if(typeof phase !== 'undefined' && rightSymbol.length !== 0){console.log('włączamy poieranie skryptu'); get_script_from_db()}
},[rightSymbol])



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