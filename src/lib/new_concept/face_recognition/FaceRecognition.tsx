import { BestButton } from "lib/components/components_modules"
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam"
import styled from "styled-components"
import * as faceapi from '@vladmandic/face-api';


export const FaceRecognition: React.FunctionComponent = () => {
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const [captureVideo, setCaptureVideo] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [age, setAge] = useState<any>()
  const [gender, setGender] = useState<any>()
  const [expression, setExpression] = useState<any>()

  const imgRef = useRef<any>()

  const videoRef = useRef<Webcam>(null);
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL =  '/models';

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        // console.log('za modelami')
      ]).then(() => {setModelsLoaded(true)});
    }
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    setShowVideo(true)
  
    // navigator.mediaDevices
    //   .getUserMedia({ video: { width: 300 } })
    //   .then(stream => {
    //     let video = videoRef.current;
    //     video.srcObject = stream;
    //     video.play();
    //   })
    //   .catch(err => {
    //     console.error("error:", err);
    //   });
  }

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef && canvasRef.current && videoRef.current?.video) {
        // canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        const displaySize = {
          width: videoWidth,
          height: videoHeight
        }

        faceapi.matchDimensions(canvasRef.current, displaySize);
        const detections = await faceapi.detectAllFaces(videoRef.current.video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender().withFaceDescriptors();
        // const detections = await faceapi.detectAllFaces(videoRef.current.video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
        
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
        // canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
        setAge(  parseInt((detections[0].age).toString()))
        setGender(detections[0].gender)
        // setExpression(detections[0].expressions.asSortedArray)
        if(detections){
          const expression = detections[0].expressions
          const propertyNames = Object.keys(expression);
          // const number_of_label = expression.indexOf(Math.max(...expression));
          const value = Object.values(expression)
          propertyNames.map((name)=>{
            if(expression[name as keyof  typeof expression] == Math.max(...value)) setExpression(name)
          })
          // console.log(propertyNames)
        }
        
        // const text = [
        //   'This is a textline!',
        //   'This is another textline!'
        // ]
        // const anchor = { x: 200, y: 200 }
        // // see DrawTextField below
        // const drawOptions = {
        //   anchorPosition: 'TOP_LEFT',
        //   backgroundColor: 'rgba(0, 0, 0, 0.5)'
        // }
        // const drawBox = new faceapi.draw.DrawTextField(text, anchor,drawOptions as Object)
        // drawBox.draw(canvasRef.current)
        
        
      }
    }, 100)
  }

  const closeWebcam = () => {
    
    // videoRef.current.pause();
    // videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  }

  // const smallDetection = async () => {
  //   const detections = await faceapi.detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
  //   console.log(detections)
  // }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        {
          captureVideo && modelsLoaded ?
            <button onClick={closeWebcam} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
              Close Webcam
            </button>
            :
            <button onClick={startVideo} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
              Open Webcam
            </button>
        }
      </div>
        {/* <div>
        <img
              ref={imgRef}
              crossOrigin="anonymous"
              src="https://images.pexels.com/photos/9371782/pexels-photo-9371782.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
              height={480}
              width={640}
            />
            <button onClick={smallDetection}>jazda</button>
        </div> */}

      {
        captureVideo ?
          modelsLoaded ?
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <Webcam ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} />
                <canvas ref={canvasRef} style={{ position: 'absolute' }} />
                
              </div>
              <div>
                  <div>WIEK: {age}</div>
                  <div>PŁEĆ: {gender}</div>
                  <div>NASTRÓJ: {expression}</div>
                </div>
            </div>
            :
            <div>loading...</div>
          :
          <>
          </>
      }
    </div>
  );

}


