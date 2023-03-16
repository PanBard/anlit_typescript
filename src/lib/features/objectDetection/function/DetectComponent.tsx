import React ,{useEffect, useState} from "react";
import * as tf from "@tensorflow/tfjs";
import { drawRect } from "./drawRectangle";

type DetectComponentProps = {
  webcamRef: any,
  canvasRef: any,
  stopDetect(): void,
  detectReady(): void,
}


export const DetectComponent: React.FunctionComponent<DetectComponentProps> = ({
  webcamRef,
  canvasRef,
  stopDetect,
  detectReady
}) => {

  const [elo, setElo] = useState(false);

  const runDetectLoop = async (webcamRef: any, canvasRef: any) => {
    let nIntervId: ReturnType<typeof setInterval> | undefined //to stop interval in future
    let warningson = false
      const net = await tf.loadGraphModel('https://panbard.github.io/model_host/tfjsexport_3/model.json')
      // Loop and detect 
      let m = 0
      nIntervId = setInterval(() => {
           detect(webcamRef,net, canvasRef)
           console.log('interval:',m)
           m+=1
           if (warningson)
           {console.log('powinienem tego NIE zobaczyc');return true}
      }, 1000);
  
  
      const detect = async (webcamRef: any,net: any,canvasRef: any) => {
          // Check data is available
          if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video?.readyState === 4
          ) {
              // let warningson = false
            // //////////////////-------------------------------------------skrin
            const imgForScreenshot = webcamRef.current.getScreenshot();
            // //////////////////------------------------------------------------
      
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;
      
            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;
      
            // Set canvas height and width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
      
            // 4. TODO - Make Detections
            const img = tf.browser.fromPixels(video)
            const resized = tf.image.resizeBilinear(img, [640,480])
            const casted = resized.cast('int32')
            const expanded = casted.expandDims(0)
            const obj = await net.executeAsync(expanded)
      
            // console.log("object badany",await obj[7].array())
            
            const boxes = await obj[4].array()
            const classes = await obj[7].array()
            const scores = await obj[5].array()
            
            if (boxes){
              detectReady()
            }
            
            // Draw mesh
            const ctx = canvasRef.current.getContext("2d");
      
            
            // 5. TODO - Update drawing utility
        
            if(boxes[0][0] && classes[0][0] && scores[0][0]>0.8){
              
              requestAnimationFrame(()=>{drawRect(boxes[0][0], classes[0][0], scores[0][0], 0.8, videoWidth, videoHeight, ctx, imgForScreenshot)})
              
              tf.dispose(img)
              tf.dispose(resized)
              tf.dispose(casted)
              tf.dispose(expanded)
              tf.dispose(obj)
              
  
              clearInterval(nIntervId);
              console.log('po interwale')
              
              ctx.clearRect(0, 0, videoWidth, videoHeight);
              warningson = true
              setElo(true)
              stopDetect()
              return true
            }
            
            // requestAnimationFrame(()=>{drawRect(boxes[0][0], classes[0][0], scores[0][0], 0.8, videoWidth, videoHeight, ctx, imgForScreenshot)}); 
            tf.dispose(img)
            tf.dispose(resized)
            tf.dispose(casted)
            tf.dispose(expanded)
            tf.dispose(obj)
           
          }
        }
  
        if(warningson){return true}
    };

    const mainLoop = useEffect(()=>{runDetectLoop (webcamRef,canvasRef)},[]);  

    return null
}





 

  