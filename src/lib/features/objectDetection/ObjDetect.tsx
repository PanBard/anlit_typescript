import React, { useRef, useEffect, useState, useMemo } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import { Voice } from "../voiceRecognition/Voice";
// import { runDetectLoop  } from "./function/detect";
import {DetectComponent } from "./function/DetectComponent";

type ColorProps = {
  changeColor: boolean
}

type ObjDetectProps = {
  detected(): void
  imgg(params: any): any
}



export const ObjDetect: React.FunctionComponent<ObjDetectProps> = ({
  detected,
  imgg
}) => {
    
  const [elo, setElo] = useState(false);
  const [redOrBlack, setRedOrBlack] = useState(false);

    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<any>(null);
   
    // let nIntervId: ReturnType<typeof setInterval> | undefined
    // let image: ReturnType<any> | undefined

    // const mainLoop = useEffect(()=>{runDetectLoop (webcamRef,canvasRef)},[]);
  // const mainLoop = runDetectLoop (webcamRef,canvasRef)
  // console.log(mainLoop)

    
  useMemo(()=>{ 
    if(redOrBlack){
         Voice('Wykrywanie obiektu w gotowości!') 
    }
},[redOrBlack]) 


const logMessage = (message: any) => {
  imgg(message);
};
    
  

  return (
    <CenterContainer>


      


          
  <Dekoracja
    changeColor = {redOrBlack}
  >
              <Webcam
                        ref={webcamRef}
                        muted={true} 
                        screenshotFormat="image/jpeg"
                        // style={{
                        //   position: "absolute",
                        //   marginLeft: "auto",
                        //   marginRight: "auto",
                        //   left: 0,
                        //   right: 0,
                        //   textAlign: "center",
                        //   zIndex: 9,
                        //   width: 640,
                        //   height: 480,
                        // }}
                      />
                
             </Dekoracja>
          
  
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 10,
              width: 640,
              height: 480,
            }}
          />
    

            <DetectComponent canvasRef={canvasRef} webcamRef={webcamRef} stopDetect={() => {setElo(!elo); detected()}} detectReady={() => setRedOrBlack(true) } imgg={logMessage}/>


    </CenterContainer>
    
  );
}


const Dekoracja = styled.div<ColorProps>`
  border:5px solid;
  border-color: ${({changeColor, theme})=> changeColor ? theme.colors.error : theme.colors.background  };
  /* position: absolute;
  margin-left: auto;
  margin-right:  auto;
  left: 0;
  right: 0;
  text-align: center;
  z-Index: 9; */
  width: 650px;
  height: 490px;
`


const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
`