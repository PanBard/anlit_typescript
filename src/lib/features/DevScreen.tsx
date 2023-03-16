import { useVoiceScript } from "lib/hooks/useVoiceScript" 
import React, { useMemo, useState } from "react"
import styled from "styled-components"
import { ObjDetect } from "./objectDetection"
import { Voice } from "./voiceRecognition"

type DevScreenProps = {
    endWork(): void
    imgg(params: any): any
}


export const DevScreen: React.FunctionComponent<DevScreenProps> = ({
    endWork,
    imgg
}) => {
    const Voice_script = useVoiceScript()

    const [showWebcam, setShowWebcam] = useState<boolean>(true)
    const [displayMessage, setdisplayMessage] = useState<boolean>(false)
    const [tell, setTell] = useState<boolean>(false)

   
    const madeMagic1 = () => {
        if (showWebcam==true){setShowWebcam(false)}
        else setShowWebcam(true)
    }
    const madeMagic2 = () => {
        Voice(Voice_script.ORDER[5].startorder1)
    }

    useMemo(()=>{ 
        if(tell){
             Voice('wykryto próbówkę!')
             setTimeout(()=>{endWork()}, 2000);
             
        }
    },[tell]) 
    
    //--------------------------------------------------------------testy

    const [liczba, setliczba] = useState(0)
    const [wykryte_oniekty,setWykryteObiekty] = useState<string[]>([])
    const [lista_liczb,setlista_liczb] = useState<number[]>([])

    
    const madeMagic3 = () => {
        setlista_liczb([...lista_liczb, liczba+1])
        setliczba(liczba+1)
        const lastItem = lista_liczb[lista_liczb.length-1]
        console.log('list:',lista_liczb)
        console.log('last item: ',lastItem)
        setdisplayMessage(!displayMessage)
        
    }

    const logMessage = (message: any) => {
        imgg(message);
      };
    // useMemo(()=>{ if(displayMessage){
    //     setWykryteObiekty([
    //         ...wykryte_oniekty,
    //          `obiekt numer ${liczba}`
    //     ]);
    //     setliczba(liczba+1)
    //     console.log(wykryte_oniekty)
    // }},[displayMessage]) 
    //--------------------------------------------------------------testy
    


    return(
        <Container>
            <TranslatorContainer>
                {/* <InputContainer>
                    <MojButton onClick={madeMagic1}>WLACZ KAMERKIE</MojButton>
                    <MojButton onClick={madeMagic2}>Powiedz cos</MojButton>
                    <MojButton onClick={madeMagic3}>Testowy</MojButton>
                </InputContainer> */}

                <InputContainer>
                <ObjDetect detected={()=>{setdisplayMessage(true); setTell(true)} } imgg={logMessage}/>
                    {/* {!showWebcam && <ObjDetect detected={()=>{setdisplayMessage(true); setTell(true)}} />} */}
                    {displayMessage && <div>Znaleziono obiekt!</div>}
                </InputContainer>
            </TranslatorContainer>
            
            
        </Container>
  
            
       
    )
}
const Container = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1;
    
`
const TranslatorContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 50px;
`


const Mojdiv = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
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

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`
