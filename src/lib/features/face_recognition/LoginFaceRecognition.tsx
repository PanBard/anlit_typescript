import { BestButton } from "lib/components/components_modules"
import { useEffect, useMemo, useRef, useState } from "react";
import Webcam from "react-webcam"
import styled from "styled-components"
import * as faceapi from '@vladmandic/face-api';
import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";
import { useTranslations } from "lib/hooks/useTranslations";


type LoginFaceRecognitionProps = {
  returnResult(params: any): any

}

export const LoginFaceRecognition: React.FunctionComponent<LoginFaceRecognitionProps> = ({
  returnResult
}) => {
  const T = useTranslations();
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const [captureVideo, setCaptureVideo] = useState<boolean>(false);
  const [data,setData] = useState<any>([])
  const [component, setComponent] = useState<any>()

  const videoRef = useRef<Webcam>(null);
  const videoHeight = 340;
  const videoWidth = 420;
  const canvasRef = useRef<any>(null);
  const wholeImageCanvasRef = useRef<any>(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL =  '/face_recognition_model';

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),        
      ]).then(async () => {setModelsLoaded(true);
        const query = 'SELECT id, CONVERT(img1 USING utf8) as img1, CONVERT(img2 USING utf8) as img2, CONVERT(img3 USING utf8) as img3, username, password, date FROM face_img_storage'
       await Axios.post(SERVER_ROUTS.custom_query.get, {query: query}).then((response)=>{setData(response.data)})
      
      });
    }
    loadModels();
  }, []);


  const startVideo = () => {
    setCaptureVideo(true);
  }


  //          https://www.youtube.com/watch?v=yBgXx0FLYKc&ab_channel=Computervisionengineer


  const closeWebcam = () => {
    setCaptureVideo(false);
  }

  const getLabeledFaceDescriptions =async () => {
    if(typeof videoRef.current !== "undefined" && videoRef.current !== null && videoRef.current.video ){

    const face_number = Object.keys(data)
    return Promise.all(
      face_number.map(async (nr: any)=>{
        let description: any = []
        const userData = data[nr]
      
        for(let i =1; i==1; i++){
            const url = userData[`img${i}`]
            const image = await faceapi.fetchImage(url)
            const detection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
            description.push(detection?.descriptor)                      
          }
      
          if(typeof description != 'undefined') {            
          return  new faceapi.LabeledFaceDescriptors(userData['username'], description )
          }
        })     
    )    
    }

  }

  
  const rightInFace = async () => {    
      if(typeof videoRef.current !== "undefined" && videoRef.current !== null && videoRef.current.video ){
            const labeledFaceDescriptor = await getLabeledFaceDescriptions() 
            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptor)

            const displaySize = {
              width: videoWidth,
              height: videoHeight
            }

            faceapi.matchDimensions(canvasRef.current, displaySize);

            setInterval( async ()=>{
                if(videoRef.current?.video){
                    
                    const detections = await  faceapi.detectAllFaces(videoRef.current.video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

                    const resizedDetections = faceapi.resizeResults(detections, displaySize);
                    canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
                    canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                    canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
                    const results = resizedDetections.map((den)=>{
                      return faceMatcher.findBestMatch(den.descriptor)
                    })

                    results.forEach(async (result , i)=>{
                      const box = resizedDetections[i].detection.box
                      const drawBox = new faceapi.draw.DrawBox(box, {label: result} )
                   
                      const keys = Object.keys(data);
                      keys.map(async (obj: any)=>{
                         if (data[obj]['username'] == await drawBox['options']['label']['_label']){                      
                            returnResult({result: 'Login', userName : data[obj]['username']})
                         }
                      })
                     
                      drawBox.draw(canvasRef.current)
                    })
                  }
                },100)
      } 
  }

  useMemo(()=>{
    let condition = true;
    if(captureVideo){
      const interval =  setInterval(()=>{
    if(typeof videoRef.current !== "undefined" && videoRef.current !== null && videoRef.current.video ){
      clearInterval(interval);
      condition = false
       rightInFace()
    }
    },100)
    }
    },[captureVideo])


    const showFullImage = ()=>{
      setComponent( 
      <div>
          <Shade ></Shade>
          <Modal > 
              <Container >
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>                
                      <Webcam ref={videoRef} height={videoHeight} width={videoWidth}  style={{ borderRadius: '10px' }} />
                      <canvas ref={canvasRef} style={{ position: 'absolute' }} />
                      </div>
              </Container>
              <BestButton style={{float:'right', backgroundColor:'black'}} onClick={()=>{setComponent('')}} id="close">{T.common.close}</BestButton>
          </Modal>
      </div>)
   }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>      
      <div style={{ textAlign: 'center' }}>       
      <BestButton onClick={()=>{startVideo() ;showFullImage()}} style={{cursor: 'pointer', display: data[0] ? 'block' : 'none'}}>{T.login_form.button_scan}</BestButton>    
      </div>
      
      {captureVideo ? modelsLoaded ?
            <div>             
              {component}
            </div>
            :   <div>loading...</div>  : <>  </>
        }
        <canvas style={{width: 640, height: 480, margin: 5, display: 'none'}} ref={wholeImageCanvasRef} />

    </div>
  );

}

const Container = styled.div`
`
const Shade = styled.div`
  display: block;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.5;
  filter: alpha(opacity=50);
`
const Modal = styled.div`
  display: block;
  position: fixed;
  z-index: 101;
  top: 10%;
  left: center;
`