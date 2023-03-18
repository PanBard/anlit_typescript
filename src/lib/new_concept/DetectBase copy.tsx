import React, { useRef, useEffect, useState, useMemo } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import { DetectFunction } from "./detect";

// import { runDetectLoop  } from "./function/detect";


type ColorProps = {
  changeColor: boolean
}

type ObjDetectProps = {
  detected(): void
  imgg(params: any): any
}



export const DetectBase: React.FunctionComponent= () => {
    
  const [elo, setElo] = useState(false);
  const [redOrBlack, setRedOrBlack] = useState(false);

    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<any>(null);
    const video = async () => { DetectFunction(webcamRef,canvasRef)}
    
    const f = async () => {
        console.log('start')
        
        const r = await video().then(proise=> console.log('promis',proise))
        console.log('po',r)
        } 

    f()

   
    



//    const repeatingFunc= async ()=> {
//         console.log("It's been 5 seconds. Execute the function again.");
        
//         const elo = true
//         if(elo){
//             return elo
//         }
//         setTimeout(repeatingFunc, 500);

//     }
//     console.log( 'typpo',typeof setTimeout(repeatingFunc,500))
    




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