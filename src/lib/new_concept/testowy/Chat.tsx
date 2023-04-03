import React, { useRef, useState } from "react"
import styled from "styled-components"

type ChatProps = {
    script: any
}

export const Chat: React.FunctionComponent<ChatProps> = ({
    script
}) =>{
    const [slownictwo, setSlownictwo] = useState<string>()


    const divowansko = useRef<any>(null);


 

   const wyswietlacz = ()=> {
    
    if(typeof script !== 'undefined'){
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



    return(
        <ContainerP>
            <div>
                Chat
            </div>
            <ChatContainer ref={divowansko}></ChatContainer> 
        </ContainerP>
        
    )
}

const ChatContainer = styled.div`
    border: 3px solid gray;
    border-radius: 10px;
    justify-content: center;
    width: 300px;
`

const ContainerP = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    /* background-color: red; */
`