import React, { useRef, useEffect, useState, useMemo } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import * as tf from "@tensorflow/tfjs";


// import { runDetectLoop  } from "./function/detect";


type ColorProps = {
  changeColor: boolean
}

type DetectBaseProps = {
  return_results_to_parent_component(params: any): any
}




export const DetectBase: React.FunctionComponent<DetectBaseProps> = ({
    return_results_to_parent_component,
}) => {
    
  const [functionReturn, setFunctionReturn] = useState<any>();
  const [redOrBlack, setRedOrBlack] = useState(false);
  const [hideCamera, setHideCamera] = useState(false);
  const [detectedImage, setDetectedImage] = useState();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<any>(null);
    
  const [show, setShow] = useState<boolean>(false)
  
   useEffect(()=>{
    if(functionReturn){
console.log('wyswietlamy rezultat funkcji',functionReturn)
    const obj = [functionReturn,detectedImage]
    console.log('---------------------------------------------------- KONIEC : '+tf.memory().numTensors)
    return_results_to_parent_component(obj)
    }
    
   },[functionReturn])
    

    const DetectFunction = (webcamRef: any, canvasRef: any) => {
    
    
        const  mainFunction = async (webcamRef: any, canvasRef: any) => {
            const detectModel = await loadModel()  
            const classifyModel = await loadModelC()
            console.log('Start detect')
            return await repeatingFunction(webcamRef,detectModel,classifyModel,canvasRef)
           
        }
        
  
        const repeatingFunction = async (webcamRef: any, model1: any,model2: any,canvasRef: any)=> {
            console.log('loop');
            const detectResult = await detect(webcamRef, model1, canvasRef)
               if(detectResult){
                    console.log('wykryto obiekt!!!')
                    const classifyResult = await clasify(model2, detectResult) 
                    if(classifyResult){
                        console.log('koniec petli, zwracamy:',classifyResult)
                          console.log('totalny koniec: '+tf.memory().numTensors)
                        setFunctionReturn(classifyResult)
                        }
                }
                else setTimeout(()=>{repeatingFunction(webcamRef,model1,model2,canvasRef)}, 500);
            
    
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
                    
                    const number_of_label = classes.indexOf(Math.max(...classes));
                    console.log('rezultat:',number_of_label )
                 
                    tf.dispose(img)
                    tf.dispose(resized)
                    tf.dispose(casted)
                    tf.dispose(expanded)
                    tf.dispose(obj)
                    tf.dispose(net)
                    tf.dispose(all)
                    tf.dispose(classes)
                    console.log(tf.memory().numTensors)
                    tf.disposeVariables()
                    console.log('koniec CLASIFY')
                    console.log('tyle tensorów zostało:'+tf.memory().numTensors)
                    return number_of_label
                }
    
                tf.dispose(img)
                tf.dispose(resized)
                tf.dispose(casted)
                tf.dispose(expanded)
                tf.dispose(obj)
                tf.dispose(all)
                
                console.log(tf.memory().numTensors)
                
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
              
                const detected_image = webcamRef.current.getScreenshot();

                // Get Video Properties
                const video = webcamRef.current.video;
                const videoWidth = webcamRef.current.video.videoWidth;
                const videoHeight = webcamRef.current.video.videoHeight;
        
                // Set video width
                webcamRef.current.video.width = videoWidth;
                webcamRef.current.video.height = videoHeight;
        
                // Set canvas height and width
                // canvasRef.current.width = videoWidth;
                // canvasRef.current.height = videoHeight;
        
                // 4. TODO - Make Detections
                const img = tf.browser.fromPixels(video)
                const resized = tf.image.resizeBilinear(img, [640,480])
                const casted = resized.cast('int32')
                const expanded = casted.expandDims(0)
                const obj = await net.executeAsync(expanded)
        
                
                const boxes = await obj[4].array()
                const classes = await obj[7].array()
                const scores = await obj[5].array()
                
                if (boxes)  setRedOrBlack(true) //red border if ready
    
                if(boxes[0][0] && classes[0][0] && scores[0][0]>0.8){
                                
                        tf.dispose(img)
                        tf.dispose(resized)
                        tf.dispose(casted)
                        tf.dispose(expanded)
                        tf.dispose(obj)
                        tf.dispose(boxes)
                        tf.dispose(classes)
                        tf.dispose(scores)
                        tf.dispose(net)
                        setDetectedImage(detected_image)
                        setHideCamera(true)
                        console.log(tf.memory().numTensors)
                        tf.disposeVariables()
                        console.log('koniec detect')
                        return video
                }
    
                else{
                tf.dispose(img)
                tf.dispose(resized)
                tf.dispose(casted)
                tf.dispose(expanded)
                tf.dispose(obj)
                tf.dispose(boxes)
                tf.dispose(classes)
                tf.dispose(scores)
                console.log(tf.memory().numTensors)
            } 
            tf.dispose(img)
            tf.dispose(resized)
            tf.dispose(casted)
            tf.dispose(expanded)
            tf.dispose(obj)
            tf.dispose(boxes)
            tf.dispose(classes)
            tf.dispose(scores)
            console.log(tf.memory().numTensors)
            }
            }
    
    
          return mainFunction(webcamRef,canvasRef)
    
    }
    
    useEffect(()=>{ if(show) DetectFunction(webcamRef,canvasRef)},[show])


    if(show){
       return (
    <CenterContainer>
       {!hideCamera  && <Dekoracja changeColor = {redOrBlack}>
             <Webcam
                        ref={webcamRef}
                        muted={true} 
                        screenshotFormat="image/jpeg"
                        style={{
                          // position: "absolute",
                          // marginLeft: "auto",
                          // marginRight: "auto",
                          // left: 0,
                          // right: 0,
                          // textAlign: "center",
                          // zIndex: 9,
                          width: 640,
                          height: 480,
                        }}
                      />
                
             </Dekoracja>}
          
  
          {/* <canvas
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
          /> */}


        {/* <img src={detectedImage}></img> */}
    </CenterContainer> 
    
  );
    }
    else {return(
      <MojButton onClick={()=>{setShow(true) ;   console.log('---------------------------------------------- START : '+tf.memory().numTensors)}}>Rozpocznij analizę</MojButton>
    )} 
 
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



const MojButton = styled.button`
    padding: 10px 5px;
    text-align: center;
    border-radius: 8px; 
    background-color: ${({theme})=> theme.colors.primary};
    /* background-color: red; */
    cursor: pointer;
`