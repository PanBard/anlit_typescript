import { ORDERS } from "lib/dictionary/voice_script"
import React, { useMemo, useState } from "react"
import styled from "styled-components"
import { ObjDetect } from "./objectDetection"
import { Voice } from "./voiceRecognition"

export const DevScreen: React.FunctionComponent = () => {

    const [showWebcam, setShowWebcam] = useState<boolean>(true)
    const [displayMessage, setdisplayMessage] = useState<boolean>(false)
    const [tell, setTell] = useState<boolean>(false)

   
    const madeMagic1 = () => {
        if (showWebcam==true){setShowWebcam(false)}
        else setShowWebcam(true)
    }
    const madeMagic2 = () => {
        Voice(ORDERS[5].startorder1)
    }

    useMemo(()=>{ 
        if(tell){
             Voice('wykryto!')
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
        <Mojdiv>
            <MojButton onClick={madeMagic1}>WLACZ KAMERKIE</MojButton>
            <MojButton onClick={madeMagic2}>Powiedz cos</MojButton>
            <MojButton onClick={madeMagic3}>Testowy</MojButton>

            {!showWebcam && <ObjDetect detected={()=>{setdisplayMessage(true); setTell(true)}} />}
            {displayMessage && <div>Znaleziono obiekt!</div>}
            
            
        </Mojdiv>
    )
}

const Mojdiv = styled.div`
     color: ${({theme})=> theme.colors.typography};
`

const MojButton = styled.button`
    padding: 10px 5px;
    text-align: center;
    border-radius: 8px; 
    background-color: ${({theme})=> theme.colors.primary};
    /* background-color: red; */
    cursor: pointer;
`