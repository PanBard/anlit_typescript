import  Axios  from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { SERVER_ROUTS } from "lib/database/server_routs";

type ShuffleFateProps = {
    id?: any,
    data?:any,
    phase?:any,
    label?:any,
    cation: boolean
}

export const ShuffleFate: React.FunctionComponent<ShuffleFateProps> = ({
    cation
}) => {

    const [mode, setMode] = useState('')
    const [phase, setPhase] = useState<number>()
    const [data, setData] = useState<any[]>([])
    const [rightSymbol, setRightSymbol] = useState<any[]>([])
    const [foundIon, setfoundIon] = useState<any>()
    const [longString,setLongString] = useState<string>();

    const shuffleDiv = useRef<any>(null);

    const db_type = cation ? 'cation_analysis' : 'anion_analysis' 
    const db_type_name = cation ? 'script_flow' : 'a_script_flow' 
    const word = 'Mogą być: '
    

    useEffect(  ()  =>  {
        get_data()
    },[])

      const get_data = async () => {
        let kontrol = false
      await  Axios.get(SERVER_ROUTS[db_type].get)
        .then( (response: any)=>{
            // console.log('shufle db :)');
            setData(response.data); kontrol=true ;setMode('start');set_up_phase(response.data)})
        .catch((err)=>{console.log('db status :(')})
        if(kontrol) return 'ok'
      }

    const set_up_phase = async (data: any)  => {
         const current = data[data.length-1]
         
        if(typeof current !== 'undefined'){
             if((current['end'] == 'new') ){
             if(current['f1'] == null){setPhase(1);return true}
             if(current['f2'] == null){setPhase(2);return true}
             if(current['f3'] == null){setPhase(3);return true}
             if(current['f4'] == null){setPhase(4);return true}
             if(current['f5'] == null){setPhase(5);return true}
             if(current['f6'] == null){setPhase(6);return true}
             if(current['f7'] == null){setPhase(7);return true}
            }  
            
            if((current['end'] == 'end') && (phase !== 100)){
                console.log('SHUFFLE FAZA:',8);
                setPhase(8)
                console.log('END --------------------- END');
            }
        }
    }

    const shuffle = async () => {
                if(phase !== 1 && typeof phase !== 'undefined'){
                    const current = data[data.length-1]

                const prevoiusPhase = phase-1
                await Axios.put(SERVER_ROUTS.shuffle_match.get,{phase: prevoiusPhase, label: current[`f${prevoiusPhase}`],db_type:db_type_name})
                .then( (response: any)=>{

                const data = response.data;
                data.map((obj: any)=>{
                    if(phase==2){
                        if(obj.f1 == current.f1){
                            setRightSymbol(prevoius => [...prevoius, obj.symbol])
                        }}
                        


                    if(phase==3){
                        if(obj.f1 == current.f1 && obj.f2 ==current.f2){
                            setRightSymbol(prevoius => [...prevoius, obj.symbol])
                        }
                        if(obj.f1 == current.f1 && obj.f2 == current.f2  && obj.f3=='-' ){
                            setfoundIon(obj.symbol)
                            console.log('ZNALEZIONY!!!!!!! ', obj.symbol)
                        }}


                    if(phase==4){
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3  ){
                            setRightSymbol(prevoius => [...prevoius, obj.symbol])
                        }
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4=='-' ){
                            setfoundIon(obj.symbol)
                            console.log('ZNALEZIONY!!!!!!! ', obj.symbol)
                        }}


                    if(phase==5){
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  ){
                            setRightSymbol(prevoius => [...prevoius, obj.symbol])
                        }
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  && obj.f5=='-' ){
                            setfoundIon(obj.symbol)
                            console.log('ZNALEZIONY!!!!!!! ', obj.symbol)
                        }}


                    if(phase==6){
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  && obj.f5 == current.f5 ){
                            setRightSymbol(prevoius => [...prevoius, obj.symbol])
                        }
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4 && obj.f5 == current.f5 && obj.f6=='-' ){
                            setfoundIon(obj.symbol)
                            console.log('ZNALEZIONY!!!!!!! ', obj.symbol)
                        }}


                    if(phase==7){
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  && obj.f5 == current.f5 && obj.f6 == current.f6 ){
                            setRightSymbol(prevoius => [...prevoius, obj.symbol])
                        }
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4 && obj.f5 == current.f5 && obj.f6 == current.f6 && obj.f7=='-' ){
                            setfoundIon(obj.symbol)
                            console.log('ZNALEZIONY!!!!!!! ', obj.symbol)
                        }}

                    if(phase==8){
                        // if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4  && obj.f5 == current.f5 && obj.f6 == current.f6  && obj.f7 == current.f7){
                        //     setRightSymbol(prevoius => [...prevoius, obj.symbol])
                        // }
                        if(obj.f1 == current.f1 && obj.f2 == current.f2 && obj.f3 == current.f3 && obj.f4 == current.f4 && obj.f5 == current.f5 && obj.f6 == current.f6 && obj.f7 == current.f7 ){
                            setfoundIon(obj.symbol)
                            console.log('ZNALEZIONY!!!!!!! ', obj.symbol)
                        }}

                   })})
                // .then(()=>{if(rightSymbol.length>0) wyswietlacz()})
                .catch((err)=>{console.log('db status :(')})
                }}

useMemo(()=>{
    if(typeof phase !== 'undefined') shuffle()
},[phase])

    const returnComponent = () => {
        if(typeof phase !== 'undefined'){
            if(typeof foundIon !== 'undefined'){
                return(
                    <Container>
                        Znaleziono!!!!!!!!! = {foundIon}
                    </Container>
                    )
            }
            else{
                if(rightSymbol.length == 0 && phase!==1){
                    const current = data[data.length-1]
                    if(current.end == 'end' && current.f7 !== 'brak'){
                        return(
                            <Container>
                               Zakończono analizę.
                            </Container>
                            )
                    }
                   
                    return(
                        <Container>
                            Taki wynik nie powinien się pojawić na tym etapie analizy.
                        </Container>
                        )
                }
                else{   
                        // console.log('rightSymbol',rightSymbol)
                      return(
                        <ShuffleContainer ref={shuffleDiv}>
                            {word}
                            {rightSymbol.map((obj: any,index:number)=>{ return(obj+' ')})}
                        </ShuffleContainer>
                        
                            
                     )
                }
            } 
        }
    }

    return(
        <Container>
            {returnComponent()}
        </Container>
    )
}






const Container = styled.div`
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    
`
const ShuffleContainer = styled.div`
    border: 2px solid gray;
    border-radius: 10px;
    justify-content: center;
    width: 400px;
    padding: 5px;
    
`



