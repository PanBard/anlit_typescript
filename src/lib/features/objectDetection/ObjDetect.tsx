import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { runDetectLoop  } from "./function/detect";

export const ObjDetect: React.FunctionComponent = () => {
    
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<any>(null);
   
    // let nIntervId: ReturnType<typeof setInterval> | undefined
    // let image: ReturnType<any> | undefined

    const mainLoop = useEffect(()=>{runDetectLoop (webcamRef,canvasRef)},[]);
  
  return (
    <section>
    <div className="App">
        <canvas>elo</canvas>
        <Webcam
          ref={webcamRef}
          muted={true} 
          screenshotFormat="image/jpeg"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />

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
      
    </div>
    </section>
  );
}


