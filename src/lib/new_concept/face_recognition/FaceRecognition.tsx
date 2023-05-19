import { BestButton } from "lib/components/components_modules"
import { useEffect, useMemo, useRef, useState } from "react";
import Webcam from "react-webcam"
import styled from "styled-components"
import * as faceapi from '@vladmandic/face-api';
import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";


type FaceRecognitionProps = {
  userName: any
}

export const FaceRecognition: React.FunctionComponent<FaceRecognitionProps> = ({
  userName
}) => {
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const [captureVideo, setCaptureVideo] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [age, setAge] = useState<any>()
  const [gender, setGender] = useState<any>()
  const [expression, setExpression] = useState<any>()
  const [name,setName] = useState<any>()
  const [images,setImages] = useState<Array<string>>([])


  const imgRef = useRef<any>()

  const videoRef = useRef<Webcam>(null);
  const videoHeight = 240;
  const videoWidth = 320;
  const canvasRef = useRef<any>(null);
  const wholeImageCanvasRef = useRef<any>(null);

  useEffect(() => {
    setName(userName)
    const loadModels = async () => {
      const MODEL_URL =  '/models';

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        // console.log('za modelami')
      ]).then(() => {setModelsLoaded(true)});
    }
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    setShowVideo(true)

  }

  
  const send_data_to_db = async () => {
    if(typeof images[2] != 'undefined'){
    console.log(' przeszło ')
    console.log(images[0],images[1],images[2])
    const query = `INSERT INTO face_img_storage (name, img1, img2, img3) VALUES ('${userName}','${images[0]}','${images[1]}','${images[2]}') `
    await Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
        .then((response)=>{console.log('new user created') ; console.log(response.data)})
        // .then(  result('Login'))
        .catch((err)=>{console.log('send status :(')})
    }
    }

    useMemo(()=>{
      send_data_to_db()
    },[images])
  


  const closeWebcam = () => {
    
    // videoRef.current.pause();
    // videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  }

  const getLabeledFaceDescriptions =async () => {
    if(typeof videoRef.current !== "undefined" && videoRef.current !== null && videoRef.current.video ){
      const videoo = videoRef.current.video

      wholeImageCanvasRef.current.width = 640;
      wholeImageCanvasRef.current.height = 480;
      let description = []
      
    const labelos = name 
    // const url = wholeImageCanvasRef.current.toDataURL()
    // console.log(url)
    for(let i =1; i<=3; i++){
    wholeImageCanvasRef.current.getContext('2d').drawImage(videoo, 0, 0, 640, 480 )
    const url = wholeImageCanvasRef.current.toDataURL()
   
    const image = await faceapi.fetchImage(url)
    // console.log(i ,url)
    setImages(images => [...images, url]);
    console.log('po fetch')
    const detection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
    description.push(detection?.descriptor)
    console.log('zdj nr: ',i)
  }

    console.log('po detect',description)
    if(typeof description != 'undefined') {  
     await send_data_to_db()
     return  new faceapi.LabeledFaceDescriptors(labelos, description )
    }
      console.log('koniec :(')
     
    }

  }

  
  const rightInFace = async () => {
    console.log('userName',userName)
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
                    console.log('mok')
                    const detections = await  faceapi.detectAllFaces(videoRef.current.video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

                    const resizedDetections = faceapi.resizeResults(detections, displaySize);
                    canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
                    canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                    canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
                    const results = resizedDetections.map((den)=>{
                      return faceMatcher.findBestMatch(den.descriptor)
                    })

                    results.forEach((result , i)=>{
                      const box = resizedDetections[i].detection.box
                      const drawBox = new faceapi.draw.DrawBox(box, {label: result} )
                      console.log("'drawBox['options']['label']'",drawBox['options']['label']['_label'])
                      drawBox.draw(canvasRef.current)
                    })
                  }
                },100)


      } 

  }



  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>

      

      <div style={{ textAlign: 'center', padding: '10px' }}>

        {captureVideo && modelsLoaded ? <BestButton onClick={closeWebcam} > Close Webcam </BestButton> : <BestButton onClick={startVideo} > Open Webcam </BestButton> }

      <BestButton onClick={rightInFace} style={{cursor: 'pointer'}}>Rozpocznij skan</BestButton>
      {/* <input type="text" onChange={(e)=>{setName(e.target.value)}}></input> */}
      </div>
      
      {captureVideo ? modelsLoaded ?
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                {/* <Webcam ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} /> */}
                <Webcam ref={videoRef} height={videoHeight} width={videoWidth}  style={{ borderRadius: '10px' }} />
                <canvas ref={canvasRef} style={{ position: 'absolute' }} />
                
              </div>
              <div>
                  <div>WIEK: {age}</div>
                  <div>PŁEĆ: {gender}</div>
                  <div>NASTRÓJ: {expression}</div>
                </div>
            </div>
            :   <div>loading...</div>  : <>  </>
        }

        <canvas style={{width: 640, height: 480, margin: 5}} ref={wholeImageCanvasRef}/>

    </div>
  );

}


