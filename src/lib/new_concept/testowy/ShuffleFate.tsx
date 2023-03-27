import  Axios  from "axios";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { SERVER_ROUTS } from "lib/database/server_routs";
import { useTest_labels } from "lib/hooks/useDetectFlow";


type ShuffleFateProps = {
    id: any,
    data:any,
    phase:any,
    label:any
}

export const ShuffleFate: React.FunctionComponent<ShuffleFateProps> = ({
    id,
    // data,
    // label
}) => {

    // const [data, setData] = useState<any[]>([])
    const [boolean, setBoolean] = useState(false)
    const [key_array,setKey_array] = useState([])
    const [mode, setMode] = useState('')
    const keys_f = ['f1',"f2","f3",'f4','f5','f6','f7']
    const [script_flow_data, setScript_flow_data] = useState([])
    const [label_string, setLabelString] = useState('')
    const [phase, setPhase] = useState<number>()
    const [data, setData] = useState<any[]>([])
    const [label, setLabel] = useState<any>()
    const [rightSymbol, setRightSymbol] = useState<any[]>([])
    const [foundIon, setfoundIon] = useState<any>()
    let symbolf1: any = []

    useEffect(  ()  =>  {
        get_data()
    },[])


    

      const get_data = async () => {
        let kontrol = false
      await  Axios.get(SERVER_ROUTS.ultimate_analysis.get)
        .then( (response: any)=>{console.log('shufle dostalo data :)',response.data);setData(response.data); kontrol=true ;setMode('start');set_up_phase(response.data).then(()=>{console.log('PHASE?????????',phase)})})
        .then(()=>{ })
        .catch((err)=>{console.log('db status :(')})
        if(kontrol) return 'ok'

      }

    // const get_data_from_db = () => {
    //     Axios.get(SERVER_ROUTS.script_flow.script_flow)
    //     .then( (response: any)=>{setScript_flow_data(response.data); setMode('start');shuffle() })
    //     .catch((err)=>{console.log('db status :(')})
    // }

    // const get_data = async () => {
    //     let kontrol = false
    //   await  Axios.get(SERVER_ROUTS.ultimate_analysis.get)
    //     .then( (response: any)=>{console.log('status -> :)',response.data);setData(response.data); kontrol=true ;setMode('start')})
    //     .catch((err)=>{console.log('db status :(')})
    //     if(kontrol) return 'ok'

    //   }


    const set_up_phase = async (data: any)  => {
      
         const current = data[data.length-1]
        console.log('current',data[data.length-1])
        if(typeof current !== 'undefined'){
             if((current['end'] == 'new') && (phase !== 100)){
             if(current['f1'] == null){setPhase(1);console.log('faza f1',phase);return true}
             if(current['f2'] == null){setPhase(2);console.log('faza f2',phase); setLabel(current.f1);return true}
             if(current['f3'] == null){setPhase(3);console.log('faza f3',phase);setLabel(current.f2);return true}
             if(current['f4'] == null){setPhase(4);console.log('faza f4',phase);setLabel(current.f3);return true}
             if(current['f5'] == null){setPhase(5);console.log('faza f5',phase);setLabel(current.f4);return true}
             if(current['f6'] == null){setPhase(6);console.log('faza f6',phase);setLabel(current.f5);return true}
             if(current['f7'] == null){setPhase(7);console.log('faza f7',phase);setLabel(current.f6);return true}
         }
            
         if((current['end'] == 'end') && (phase !== 100)){
             console.log('END --------------------- END');
         }
        }
        
 
 
        }

      
       




    const shuffle = async () => {
                if(phase !== 1 && typeof phase !== 'undefined'){
                    console.log('faza w shuffle =',phase)
                    const current = data[data.length-1]

                // console.log('label',label)
                // console.log('label: labelMap[label]',labelMap[label])

                const prevoiusPhase = phase-1
                await Axios.put(SERVER_ROUTS.shuffle_match.get,{phase: prevoiusPhase, label: current[`f${prevoiusPhase}`]})
                .then( (response: any)=>{
                    // console.log('SHUFFLE',response.data);
                //  setScript_flow_data(response.data) ;
            
                const data = response.data;
                console.log('powinno wybierac symbole  w fazie: ',phase)
                console.log('powinn ',phase)

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

                   })
                
            })
                .catch((err)=>{console.log('db status :(')})
                }
                


        
       
      
    }


//  console.log('data',data)
//  console.log('script',script_flow_data)
 
//  const get_match_scriptflow = async (label: any, img_index:string,f_index:string, end:string)=>{
//     await Axios.get(SERVER_ROUTS.shuffle_match.get, {id:id,[f_index]:label})
//     .then(p => console.log('update----------------------------------------------------------UP'))
//     .then(rerender)
// }; 

useMemo(()=>{
    if(typeof phase !== 'undefined') shuffle()
},[phase])



    const returnComponent = () => {
        if(typeof phase !== 'undefined'){
            console.log('return na stronce: ', rightSymbol.length)
            console.log('znaleziony:' , typeof foundIon)
            if(typeof foundIon !== 'undefined'){
                return(
                    <Container>
                        Znaleziono!!!!!!!!! = {foundIon}
                    </Container>
                    )
            }
            else{
                if(rightSymbol.length == 0){
                    return(
                        <Container>
                            Taki wynik nie powinien się pojawić na tym etapie analizy.
                        </Container>
                        )
                }
                else{
                      return(
                 
            <Container>
                Prawdopodobnie:
                {rightSymbol.map((obj: any,index:number)=>{
                      return(
                        <div key={index}>{ obj}</div>
                    )
                })}
                
            </Container>
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

// export const whats_up = () => {
//     let dane =  
//     Axios.get(routs.analysis).then( (response: any)=>{console.log('pobrano dane:',response.data);  const dane =  response.data })
    
// }


// export const get_data_from_db = () => {
//     Axios.get(routs.analysis).then( (response: any)=>{console.log('pobrano dane:',response.data);return(response.data) })
// }

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
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    /* overflow-y:scroll; */
    
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