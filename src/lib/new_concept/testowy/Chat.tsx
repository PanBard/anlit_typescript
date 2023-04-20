import  Axios  from "axios"
import { SERVER_ROUTS } from "lib/database/server_routs"
import React, { useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { Kropki } from "./Kropki"

type ChatProps = {
    script: any,
    phase?: any,
    cation?: boolean,
    id?: any
}

export const Chat: React.FunctionComponent<ChatProps> = ({
    script,
    phase,
    cation,
    id
}) =>{
    const [slownictwo, setSlownictwo] = useState<string>()
    const [shown,setShown] = useState(true)

    const divowansko = useRef<any>(null);
    const kropki = useRef<any>(null);
    const db_rout = cation ? 'cation_analysis_texts' : 'anion_analysis_texts'
    




    const get_script = async () => {
        await  Axios.get(SERVER_ROUTS[db_rout].get)
        .then( (response: any)=>{console.log('WYROCZNIA db :)')
            const data = response.data
            // console.log('NAJNOWSZY SKRYPCIK',data[data.length-1][`f${phase-1}`])
            wyswietlacz_2(data[data.length-1][`f${phase-1}`])
    
    
    })
        .catch((err)=>{console.log('db WYROCZNIA status :(')})
    }

 
const wyswietlacz_2 = (script: any)=> {
    
    if(typeof script !== 'undefined' && script.length > 0){
        const scrypt_copy =  script.slice();
        const script_slowa = scrypt_copy.split(" ");
        console.log('widzisz')
        let index = 0
        setShown(true)
        const loop =  setInterval(()=>{
            // console.log('weslo')
            if(script_slowa.length >= index){
                // console.log(slowa)
                
                
                   if(typeof script_slowa[index] !== 'undefined') {console.log('typeof script_slowa[index]',typeof script_slowa[index]),divowansko.current.append(script_slowa[index]+" ")}
                   divowansko.current.scrollIntoView({ behavior: "smooth" }) //to scroll to bottom box after write
                //    kropki.current.updatePosition()
                   index = index + 1
                }
                else {setShown(false) ; clearTimeout(loop)} },350)
    }
    return console.log('chat nie mowi')
}

// wyswietlacz()

useMemo(async ()=>{
    if(typeof phase=='number'){console.log('FAZA Ccccccccccccccc ZACZTU: ',phase); await get_script()}
    },[phase])

    return(
            // <ChatContainer style={{display: script ? 'block' : 'none'}} ref={divowansko}></ChatContainer> 
            <div>
                 {shown && <Kropki/>}
                <ChatContainer  ref={divowansko}>   </ChatContainer> 
                {/* {shown && <ActivityIndicatro style={{position: 'absolute', bottom: '0px'}}/>} */}
               
            </div>
            
           
    )
}




const ChatContainer = styled.div`
    border: 3px solid #626062;
    border-radius: 10px;
    justify-content: center;
    width: 270px;
    float: left;
    margin: 5px;
    padding: 5px;

`

const ActivityIndicatro = styled.div`
    width: 50px;
    height: 2px;
    margin: 5px;
    background-color:  ${({theme}) => theme.colors.primary};
    border-radius: 6px;
    animation: ladowanko 0.7s linear infinite alternate ;

    @keyframes ladowanko {
        0% {
            width:0%
        }
        100% {
            width:50%
        }
    }
`
