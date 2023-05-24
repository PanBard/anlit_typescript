import { BestButton } from "lib/components/components_modules"
import { useEffect, useMemo, useRef, useState } from "react";
import Webcam from "react-webcam"
import styled from "styled-components"
import * as faceapi from '@vladmandic/face-api';
import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";


type LoginFaceRecognitionProps = {
  returnResult(params: any): any

}

export const FaceRecognitionDemo: React.FunctionComponent<LoginFaceRecognitionProps> = ({
  returnResult
}) => {
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const [captureVideo, setCaptureVideo] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [age, setAge] = useState<any>()
  const [gender, setGender] = useState<any>()
  const [expression, setExpression] = useState<any>()
  const [name,setName] = useState<any>()
  const [images,setImages] = useState<Array<string>>([])
  const [data,setData] = useState<any>([])

  const imgRef = useRef<any>()

  const videoRef = useRef<Webcam>(null);
  const videoHeight = 340;
  const videoWidth = 520;
  const canvasRef = useRef<any>(null);
  const wholeImageCanvasRef = useRef<any>(null);

  useEffect(() => {
    // setName(userName)
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
      ]).then(async () => {setModelsLoaded(true);
        const query = 'SELECT id, CONVERT(img1 USING utf8) as img1, CONVERT(img2 USING utf8) as img2, CONVERT(img3 USING utf8) as img3, name, password, date FROM face_img_storage'
       await Axios.post(SERVER_ROUTS.custom_query.get, {query: query}).then((response)=>{setData(response.data), console.log('response.data',response.data)})
      
      });
    }
    loadModels();
  }, []);


  const startVideo = () => {
    setCaptureVideo(true);
    setShowVideo(true)

  }


  //          https://www.youtube.com/watch?v=yBgXx0FLYKc&ab_channel=Computervisionengineer


  const closeWebcam = () => {
    
    // videoRef.current.pause();
    // videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  }

  const getLabeledFaceDescriptions =async () => {
    if(typeof videoRef.current !== "undefined" && videoRef.current !== null && videoRef.current.video ){

    const face_number = Object.keys(data)
    console.log('face_number',face_number)
    return Promise.all(
      face_number.map(async (nr: any)=>{
        let description = []
        const userData = data[nr]
      
        for(let i =1; i==1; i++){
            const url = userData[`img${i}`]
            const image = await faceapi.fetchImage(url)
            const detection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
            description.push(detection?.descriptor)
            
            console.log('zdj nr: ',i,' dla: ',userData['name'])
          }
      
          if(typeof description != 'undefined') {  
          //  await send_data_to_db()
          return  new faceapi.LabeledFaceDescriptors(userData['name'], description )
          }
        })
      
    )
    console.log('koniec :(')
    }

  }

  
  const rightInFace = async () => {
    // console.log('userName',userName)
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
                      console.log( 'Result: ' , await drawBox['options']['label']['_label'])
                      // const keys = Object.keys(data);
                      // keys.map(async (obj: any)=>{
                      //    if (data[obj]['name'] == await drawBox['options']['label']['_label']){
                      //     console.log('w mapowaniu')
                      //       console.log( 'Result: ' , await drawBox['options']['label']['_label'])
                      //       returnResult({result: 'Login', userName : data[obj]['name']})
                      //    }
                      // })
                     
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
      console.log('weszlo')
      clearInterval(interval);
      condition = false
       rightInFace()
    }
    console.log('loop')
   
    },100)
    }
  

    },[captureVideo])




  return (
    <ContainerC >

      

      <div style={{ textAlign: 'center', padding: '10px' }}>

        {/* {captureVideo && modelsLoaded ? <BestButton onClick={closeWebcam} > Close Webcam </BestButton> : <BestButton onClick={startVideo} > Open Webcam </BestButton> } */}

      <BestButton onClick={startVideo} style={{cursor: 'pointer', display: data[0] ? 'block' : 'none'}}>Rozpocznij skan</BestButton>
      {/* <input type="text" onChange={(e)=>{setName(e.target.value)}}></input> */}
      </div>
      
      {captureVideo ? modelsLoaded ?
            <div>
              <Container >
                {/* <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}> */}
                  {/* <Webcam ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} /> */}
                  <Webcam ref={videoRef} height={videoHeight} width={videoWidth}  style={{display:'block',position: 'fixed', right:'30%',  borderRadius: '10px' }} />
                  <canvas ref={canvasRef} style={{ display:'block',position: 'fixed', right:'30%'}} />
                  {/* </div> */}
              </Container>

            </div>
            :   <div>loading...</div>  : <>  </>
        }

        <canvas style={{width: 640, height: 480, margin: 5, display: 'none'}} ref={wholeImageCanvasRef} />

    </ContainerC>
  );

}


const Container = styled.div`
  position: relative;
  top: 20%;
  z-index: 5;
  justify-content: center;
`

const ContainerC = styled.div`
    position: absolute;
    width: 100%;
    top: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
`