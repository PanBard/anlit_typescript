import React, { useRef, useEffect, useState, useMemo } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import * as tf from "@tensorflow/tfjs";


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
    // const video = async () => { DetectFunction(webcamRef,canvasRef)}
    
    // const f = async () => {
    //     console.log('start')
        
    //     const r = await video().then(proise=> console.log('promis',proise))
    //     console.log('po',r)
    //     } 

    // f()

   useEffect(()=>{
    console.log('wyswietlamy rezultat funkcji',elo)
   },[elo])
    

    const DetectFunction = (webcamRef: any, canvasRef: any) => {
    
    
        // const ultimateFunction = async (webcamRef: any, canvasRef: any) => {
        //      await mainFunction(webcamRef,canvasRef)
            
                
            
        // }
    
        const  mainFunction = async (webcamRef: any, canvasRef: any) => {
            // let v:any
            const model = await loadModel()  
            const model2 = await loadModelC()
            console.log('Start detect')
            return await repeatingFunc(webcamRef,model,model2,canvasRef)
           
        }
    
    // const t = (r:any) => {v=r}
            
            // nIntervId = setInterval( async() => {
            //     const elo = await detect(webcamRef, model, canvasRef)
            //        if(elo){
                   
            //         console.log('wykryto obiekt!!!')
            //         console.log('elo:',elo)
                
            //         const elo2 = await clasify(model2, elo) 
            //         if(elo2){
            //             t(elo2)
            //             console.log('elo2',elo2)
            //             clearInterval(nIntervId)
            //         }
                    
            //        }
            //     console.log('interval:')
            // }, 1000);
        const repeatingFunc = async (webcamRef: any, model1: any,model2: any,canvasRef: any)=> {
            console.log('loop');
            const elo = await detect(webcamRef, model1, canvasRef)
               if(elo){
                    console.log('wykryto obiekt!!!')
                    const elo2 = await clasify(model2, elo) 
                    if(elo2){
                        console.log('koniec petli, zwracamy:',elo2)
                        setElo(elo2)
                        }
                }
                else setTimeout(()=>{repeatingFunc(webcamRef,model1,model2,canvasRef)}, 500);
            
    
        }
    
        const loadModelC = async () => { 
            const net =  tf.loadGraphModel('https://panbard.github.io/model_host/classific/model.json')
            return net}
    
    
            const clasify = async (net:any, video:any, ) => {
                if (
                    typeof video !== "undefined" &&
                    video !== null 
                  ){
                
                const img = tf.browser.fromPixels(video)
                const resized = tf.image.resizeBilinear(img, [300,300])
                const casted = resized.cast('float32')
                const expanded = casted.expandDims(0)
                const obj = await net.execute(expanded)
               
                const all = await obj.array()
    
                if(all){
                    const classes = all[0]
          
                    const result = classes.indexOf(Math.max(...classes));
                    console.log('rezultat:',result)
                    return result
                }
    
                
    
                tf.dispose(img)
                tf.dispose(resized)
                tf.dispose(casted)
                tf.dispose(expanded)
                tf.dispose(obj)
                
          }
     
              }
    
    
    
    
    
    
    
    
    
    
        const loadModel = async () => { 
            const net =  tf.loadGraphModel('https://panbard.github.io/model_host/tfjsexport_3/model.json')
            return net}
    
        
        const detect = async (webcamRef: any,net: any,canvasRef: any) => {
         
            if (
                typeof webcamRef.current !== "undefined" &&
                webcamRef.current !== null &&
                webcamRef.current.video?.readyState === 4
            ) {
        
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
                
               
    
                if(boxes[0][0] && classes[0][0] && scores[0][0]>0.8){
                                
                        tf.dispose(img)
                        tf.dispose(resized)
                        tf.dispose(casted)
                        tf.dispose(expanded)
                        tf.dispose(obj)
                        
                        // clearInterval(nIntervId)
                        return video
                }
    
                else{
    // requestAnimationFrame(()=>{drawRect(boxes[0][0], classes[0][0], scores[0][0], 0.8, videoWidth, videoHeight, ctx, imgForScreenshot)}); 
                tf.dispose(img)
                tf.dispose(resized)
                tf.dispose(casted)
                tf.dispose(expanded)
                tf.dispose(obj)
            } 
            }
            }
    
    
          return mainFunction(webcamRef,canvasRef)
    
    }
    
    useEffect(()=>{    DetectFunction(webcamRef,canvasRef)},[])

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