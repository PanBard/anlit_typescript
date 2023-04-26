import React, { useRef, useEffect, useState, useMemo } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import * as tf from "@tensorflow/tfjs";
import { BestButton } from "lib/components/components_modules";


// import { runDetectLoop  } from "./function/detect";


type ColorProps = {
  changeColor: boolean
}






export const CroppImageTest: React.FunctionComponent = ({}) => {
    
  const [functionReturn, setFunctionReturn] = useState<any>();
  const [redOrBlack, setRedOrBlack] = useState(false);
  const [hideCamera, setHideCamera] = useState(false);
  const [detectedImage, setDetectedImage] = useState();

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<any>(null);
  const wholeImageCanvasRef = useRef<any>(null);

  const croppedImageCanvasRef = useRef<any>(null);
  const [runTestDetect,setRunTestDetect] = useState<boolean>(false);
  const [x,setx] = useState<any>('200px')
  const [y,sety] = useState<any>('200px')
    
  const [show, setShow] = useState<boolean>(false)
  
   useEffect(()=>{
    if(functionReturn){
console.log('wyswietlamy rezultat funkcji',functionReturn)
    const obj = [functionReturn,detectedImage]
    // console.log('---------------------------------------------------- KONIEC : '+tf.memory().numTensors)

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
            const net =  tf.loadGraphModel('https://panbard.github.io/model_host/tfjsexport_3/model.json')
            return net}
    
    
            const clasify = async (net:any, video:any, ) => {
                if (
                    typeof video !== "undefined" &&
                    video !== null 
                  ){
                
                    const img = tf.browser.fromPixels(video)
                    const resized = tf.image.resizeBilinear(img, [640,480])
                    const casted = resized.cast('int32')
                    const expanded = casted.expandDims(0)
                    const obj = await net.executeAsync(expanded)
            
                    
                    const all = await obj[4].array()
                    const classes = await obj[7].array()
                    const scores = await obj[5].array()
                
               
                console.log('po all',all)    
                if(all){
                    console.log('wsio result -------------------------------------------------------------------------------------',all[0])
                    console.log('all',all[0][0])
                    console.log('classes',classes[0][0])
                    console.log('scores',scores[0][0])
                    // const classes = all[0]
                    const mapArray = [1,0,8,2,10,7,6,4,9,5,3,11]
                    const number_of_label = classes.indexOf(Math.max(...classes));
                    const label_after_amp = mapArray[number_of_label]
                    console.log('rezultat z modelu:',number_of_label )
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

                // const ctx = imageCanvasRef.current.getContext('2d').drawImage(webcamRef.current.video, 0, 0, videoWidth, videoHeight)

                if (boxes)  {setRedOrBlack(true);} //red border if ready
    
                if(boxes[0][0] && classes[0][0] && scores[0][0]>0.8){


                  
                  // [ymin, xmin, ymax, xmax] 
                  console.log('tensor:++++++++++++++++',img)

                  console.log('boxes: ', boxes[0][0])
                
                  const ymin =  parseInt((boxes[0][0][0]*videoHeight).toString())
                  const xmin =  parseInt((boxes[0][0][1]*videoWidth).toString())
                  const ymax =  parseInt((boxes[0][0][2]*videoWidth).toString())
                  const xmax =  parseInt((boxes[0][0][3]*videoWidth).toString())

                  console.log('ymin: ',ymin )
                  console.log('xmin: ', xmin)
                  console.log('ymax: ',ymax )
                  console.log('xmax: ', xmax)
                  console.log('roznicza: ',xmax-xmin)
                  

                  // imageCanvasRef.current.width = 200;
                  // imageCanvasRef.current.height = 200;
                  croppedImageCanvasRef.current.width = 90;
                  croppedImageCanvasRef.current.height = 220;
                  
                  
                  // imageCanvasRef.current.width = webcamRef.current.video.width;
                  // imageCanvasRef.current.height = webcamRef.current.video.height;
                  // imageCanvasRef.current.getContext('2d').drawImage(webcamRef.current.video, 0, 0, webcamRef.current.video.width, webcamRef.current.video.height)
                  
                  croppedImageCanvasRef.current.getContext('2d').drawImage(video, xmin-10, ymin+200, 90, 220, 0, 0,90,220 ) //wery gud
                  // ####################### cale zdj
                      wholeImageCanvasRef.current.width = 640;
                      wholeImageCanvasRef.current.height = 480;
                      wholeImageCanvasRef.current.getContext('2d').drawImage(webcamRef.current.video, 0, 0, webcamRef.current.video.width, webcamRef.current.video.height )
                  // ####################### cale zdj
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



    const clasify = async (net:any, video:any, ) => {
      if (
          typeof video !== "undefined" &&
          video !== null 
        ){
      
          const img = tf.browser.fromPixels(video)
          const resized = tf.image.resizeBilinear(img, [640,480])
          const casted = resized.cast('int32')
          const expanded = casted.expandDims(0)
          const obj = await net.executeAsync(expanded)
  
          
          const all = await obj[4].array()
          const classes = await obj[7].array()
          const scores = await obj[5].array()
      
     
      console.log('po all',all)    
      if(all){
          console.log('wsio result -------------------------------------------------------------------------------------',all[0])
          console.log('all',all[0][0])
          console.log('classes',classes[0][0])
          console.log('scores',scores[0][0])
          // const classes = all[0]
          const mapArray = [1,0,8,2,10,7,6,4,9,5,3,11]
          const number_of_label = classes.indexOf(Math.max(...classes));
          const label_after_amp = mapArray[number_of_label]
          console.log('rezultat z modelu:',number_of_label )
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

    
    useEffect(()=>{  DetectFunction(webcamRef,canvasRef)},[])

    const loadModelC = async () => { 
      const net =  tf.loadGraphModel('https://panbard.github.io/model_host/tfjsexport_3/model.json')
      console.log('lojdujemy model')
      return net}

    useMemo(async ()=>{
      if(runTestDetect){
        await loadModelC()
        .then((e)=>{console.log('imageCanvasRef.current.image',croppedImageCanvasRef.current.image)
        var target = new Image(640,480);
        let op = ''
        if (webcamRef.current?.video){op = webcamRef.current.getScreenshot() || ''; 
        target.src = croppedImageCanvasRef.current.toDataURL();
        
        //  target.src = op
        console.log('target',target)
        console.log('cropped image',croppedImageCanvasRef.current.toDataURL())
        clasify(e,target)}})
      }

    },[runTestDetect])



    
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
                        <Container>
                            <canvas style={{width: 90, height: 220}} ref={croppedImageCanvasRef}/>
                            <canvas style={{width: 640, height: 480, margin: 5}} ref={wholeImageCanvasRef}/>
                        </Container>
                        

              <BestButton onClick={()=>{ if(webcamRef.current?.video) 
                { croppedImageCanvasRef.current.width = 200;
                  croppedImageCanvasRef.current.height = 200;
                  // imageCanvasRef.current.width = webcamRef.current.video.width;
                  // imageCanvasRef.current.height = webcamRef.current.video.height;
                  // imageCanvasRef.current.getContext('2d').drawImage(webcamRef.current.video, 0, 0, webcamRef.current.video.width, webcamRef.current.video.height)
                  croppedImageCanvasRef.current.getContext('2d').drawImage(webcamRef.current.video, 100, 100,200,200,0,0,200,200 )
                  setRunTestDetect(!runTestDetect)
                }}} >wez klatkę</BestButton>
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

        <img src="/crop_image.jpg" width={100} height={100} ></img>
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
    flex-direction: column;
`

const Container = styled.div`
  
`



const MojButton = styled.button`
    padding: 10px 5px;
    text-align: center;
    border-radius: 8px; 
    background-color: ${({theme})=> theme.colors.primary};
    /* background-color: red; */
    cursor: pointer;
`