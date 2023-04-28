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
  refreshChat(params: any): any
}




export const DetectBase_v2: React.FunctionComponent<DetectBaseProps> = ({
    return_results_to_parent_component,
    refreshChat
}) => {
    
  const [functionReturn, setFunctionReturn] = useState<any>();
  const [redOrBlack, setRedOrBlack] = useState(false);
  const [hideCamera, setHideCamera] = useState(false);
  const [detectedImage, setDetectedImage] = useState();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<any>(null);
    
  const [show, setShow] = useState<boolean>(false)
  
   useEffect(()=>{
    if(functionReturn || functionReturn==0){
console.log('wyswietlamy rezultat funkcji',functionReturn)
    const obj = [functionReturn,detectedImage]
    // console.log('---------------------------------------------------- KONIEC : '+tf.memory().numTensors)
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
                    console.log('classifyResult',classifyResult)
                    if(classifyResult || classifyResult==0){
                        console.log('koniec petli, zwracamy:',classifyResult)
                          // console.log('totalny koniec: '+tf.memory().numTensors)
                        setFunctionReturn(classifyResult)
                        }
                }
                else setTimeout(()=>{repeatingFunction(webcamRef,model1,model2,canvasRef)}, 500);
            
    
        }
    
        const loadModelC = async () => { 
            // const net =  tf.loadGraphModel('https://panbard.github.io/model_host/nc/model.json')
            // const net =  tf.loadGraphModel('https://panbard.github.io/model_host/class4/model.json')
            const net =  tf.loadGraphModel('tfjsexport_3/model.json')
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
                    console.log('wsio result -------------------------------------------------------------------------------------',obj,all,all[0])
                    const classes = all[0]
                    const mapArray_small = [1,2,10,7,6,4,9,5,3,11]
                    // const mapArray = [1,0,8,2,10,7,6,4,9,5,3,11]
                    const number_of_label = classes.indexOf(Math.max(...classes));
                    // const label_after_amp = mapArray[number_of_label]
                    const label_after_amp = mapArray_small[number_of_label]
                    console.log('rezultat z DetectBase_v2:',number_of_label )
                    console.log('rezultat po mapowaniu:',label_after_amp )


                 
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
                    return label_after_amp
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
            // const net =  tf.loadGraphModel('https://panbard.github.io/model_host/tfjsexport_3/model.json')
            // const net =  tf.loadGraphModel('tfjsexport_3/model.json')
            const net =  tf.loadGraphModel('tfjs_2/model.json')
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
                console.log('-------------------------------------------')
                console.log('0',await obj[0].array())
                console.log('1',await obj[1].array())
                console.log('2',await obj[2].array())
                console.log('3',await obj[3].array())
                console.log('4',await obj[4].array())
                console.log('5',await obj[5].array())
                console.log('6',await obj[6].array())
                console.log('7',await obj[7].array())

                
                if (boxes)  {setRedOrBlack(true); refreshChat(true)} //red border if ready
    
                if(boxes[0][0] && classes[0][0] && scores[0][0]>0.8){

                  console.log('tensor:++++++++++++++++',img)
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
                        // console.log('ZDHECIE-------------------',detected_image)
                        const video2 = webcamRef.current.video;
                        return video2
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
    
    useEffect(()=>{  DetectFunction(webcamRef,canvasRef)},[])


    
       return (
    <CenterContainer>
        <Dekoracja changeColor = {redOrBlack}>
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
                
             </Dekoracja>
          
  
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