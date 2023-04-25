import React, { useRef, useEffect, useState, useMemo } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import { BestButton } from "lib/components/components_modules";

export const ColorAverage: React.FunctionComponent = ({}) => {

  const webcamRef = useRef<Webcam>(null);
  const divRef = useRef<any>(null);
  const imageCanvasRef = useRef<any>(null);
  
    
  const [source,setSource] = useState<any>();
  const [rgb,setRgb] = useState<String>();

  
const  getAverageRGB = (img: any) =>{
  
  var blockSize = 5, // only visit every 5 pixels
      defaultRGB = {r:12,g:12,b:12}, // for non-supporting envs
      canvas = document.createElement('canvas'),
      context = img.getContext('2d'),
      data, width, height,
      i = -4,
      length,
      rgb = {r:10,g:10,b:10},
      count = 0;
      
  if (!context) {
      return defaultRGB;
  }
  
  height = canvas.height = img.naturalHeight || img.offsetHeight || img.height;
  width = canvas.width = img.naturalWidth || img.offsetWidth || img.width;
  context.drawImage(img, 0, 0);

  try {
      data = context.getImageData(0, 0, width, height);
  } catch(e) {
      /* security error, img on diff domain */alert('x');
      return defaultRGB;
  }
  
  length = data.data.length;
  
  while ( (i += blockSize * 4) < length ) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i+1];
      rgb.b += data.data[i+2];
  }
  console.log('rgb:',rgb.r, rgb.g,rgb)
  // ~~ used to floor values
  rgb.r = ~~(rgb.r/count);
  rgb.g = ~~(rgb.g/count);
  rgb.b = ~~(rgb.b/count);
  return rgb;
  
}

const setCanvas = () => {
  if(webcamRef.current){
    imageCanvasRef.current.width = 200;
    imageCanvasRef.current.height = 200;
    // imageCanvasRef.current.getContext('2d').drawImage(webcamRef.current.video, 0, 0, webcamRef.current.video.width, webcamRef.current.video.height)
    imageCanvasRef.current.getContext('2d').drawImage(webcamRef.current.video, 100, 100,200,200,0,0,200,200 )
    setSource(imageCanvasRef.current.toDataURL())
  }
}

useMemo(async ()=>{
  if(source){
    console.log('elo')
    let rgb = getAverageRGB(imageCanvasRef.current)
    console.log('cyferki:','rgb('+rgb.r+','+rgb.g+','+rgb.b+')')
    divRef.current.style.backgroundColor = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
    setRgb('RGB ['+rgb.r+' , '+rgb.g+' , '+rgb.b+']')
    console.log( rgb)
  }
},[source])


       return (
    <CenterContainer>
        
             <Webcam
                ref={webcamRef}
                muted={true} 
                screenshotFormat="image/jpeg"
                style={{margin: 10, width: 640, height: 480}}
              />    

              <Container>
                <BestButton onClick={ ()=>{ setCanvas() } } >wez klatkę</BestButton>
                  <canvas style={{width: '200px', height: '200px'}} ref={imageCanvasRef}/>
                  <div style={{marginTop: '10px',width: '200px', height: '200px'}} ref={divRef}> {rgb} </div>
              </Container>  

               <canvas
            
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


const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
    /* flex-direction: column; */
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

`


