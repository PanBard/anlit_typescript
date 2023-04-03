import  Axios  from "axios"
import { SERVER_ROUTS } from "lib/database/server_routs"
import React, { useMemo, useRef, useState } from "react"
import styled from "styled-components"

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


    const divowansko = useRef<any>(null);
    const db_rout = cation ? 'cation_analysis_texts' : 'anion_analysis_texts'

    const get_script = async () => {
        await  Axios.get(SERVER_ROUTS[db_rout].get)
        .then( (response: any)=>{console.log('WYROCZNIA db :)')
            const data = response.data
            console.log('w fazie: ',phase)
            console.log('db_rout: ',db_rout)
            console.log('proba pobrania skryptu z danych: ',data,'o id: ',id)
            console.log('NAJNOWSZY SKRYPCIK',data[data.length-1][`f${phase-1}`])
            
    
    
    })
        .catch((err)=>{console.log('db WYROCZNIA status :(')})
    }

 

   const wyswietlacz = ()=> {
    
    if(typeof script !== 'undefined' && script.length > 0){
        const scrypt_copy =  script.slice();
        const script_slowa = scrypt_copy.split(" ");
        // console.log(script_slowa)
        // console.log('chat wyklada slowa')
        let index = 0

        const loop =  setInterval(()=>{
            // console.log('weslo')
            if(script_slowa.length >= index){
                // console.log(slowa)
                
                
                   if(typeof script_slowa[index] !== 'undefined') {console.log('typeof script_slowa[index]',typeof script_slowa[index]),divowansko.current.append(script_slowa[index]+" ")}
                // console.log(index)
                index = index + 1
                }
                else clearTimeout(loop) },400)
    }
    return console.log('chat nie mowi')
}

wyswietlacz()

useMemo(async ()=>{
    if(typeof phase=='number'){console.log('FAZA Ccccccccccccccc ZACZTU: ',phase); await get_script()}
    },[phase])

    return(
            <ChatContainer style={{display: script ? 'block' : 'none'}} ref={divowansko}></ChatContainer> 
    )
}

const ChatContainer = styled.div`
    border: 3px solid #626062;
    border-radius: 10px;
    justify-content: center;
    width: 270px;
    float: left;
`

const ContainerP = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    /* background-color: red; */
`