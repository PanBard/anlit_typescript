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
    const [shown,setShown] = useState(true)

    const divowansko = useRef<any>(null);
    const kropki = useRef<any>(null);
    const db_rout = cation ? 'cation_analysis_texts' : 'anion_analysis_texts'
    




    const get_script = async () => {
        await  Axios.get(SERVER_ROUTS[db_rout].get)
        .then( (response: any)=>{console.log('WYROCZNIA db :)')
            const data = response.data
            console.log('NAJNOWSZY SKRYPCIK',data[data.length-1][`f${phase-1}`])
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
                 {shown && <Containder ref={kropki}> <Dots1 /> <Dots2 /> <Dots3 /> </Containder>}
                <ChatContainer  ref={divowansko}>   </ChatContainer> 
                {/* {shown && <ActivityIndicatro style={{position: 'absolute', bottom: '0px'}}/>} */}
               
            </div>
            
           
    )
}

const Containder = styled.div`
    float: left; 
    position: relative; 
    bottom: 0px;
    right: 10px; 
    /* display: flex;
    flex:1; */
    padding: 1.5rem 0.8rem 0.8rem 0.8rem ;
     
`


const ChatContainer = styled.div`
    border: 3px solid #626062;
    border-radius: 10px;
    justify-content: center;
    width: 270px;
    float: left;
    margin: 5px;
    padding: 5px;

`

const ContainerP = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    /* background-color: red; */
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

const Dots1 = styled.div`
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: gray;
    animation: jumpingAnimation 1s 0.6s linear infinite ;
    
  @keyframes jumpingAnimation {
    0% {
    transform: translate(0, 0);
  }
  16% {
    transform: translate(0, -10px);
  }
  33% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

`

const Dots2 = styled.div`
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: gray;
    animation: jumpingAnimation 1s 0.3s linear infinite;
  
  @keyframes jumpingAnimation {
    0% {
    transform: translate(0, 0);
  }
  16% {
    transform: translate(0, -10px);
  }
  33% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

`

const Dots3 = styled.div`
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: gray;
    animation: jumpingAnimation 1s 0s linear infinite;
    
  @keyframes jumpingAnimation {
    0% {
    transform: translate(0, 0);
  }
  16% {
    transform: translate(0, -10px);
  }
  33% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

`