import React, { useRef, useEffect, useState, useMemo } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import { BestButton } from "lib/components/components_modules";

export const PHAnalyser: React.FunctionComponent = ({}) => {

  const webcamRef = useRef<Webcam>(null);
  const divRef = useRef<any>(null);
  const imageCanvasRef = useRef<any>(null);
  const WholeImageCanvasRef = useRef<any>(null);
  const DrawImageCanvasRef = useRef<any>(null);  


  const [source,setSource] = useState<any>();
  const [rgb,setRgb] = useState<String>();
  const [show,setShow] = useState<boolean>(false);
  const [firstPosition,setFirstPosition] = useState<any>();
  const [isDown, setIsDown] = useState<boolean>(false);
  const [rect,setRect] = useState<any>();
  const [dimension,setDimension] = useState<any>();
  const [cuttedImagesURLs, setCuttedImagesURLs] = useState<any[]>([]);
  const [componentForDisplay,setComponentForDisplay] = useState<any>();
  const [PHvalue, setPHvalue] = useState<any>();
  const [seed, setSeed] = useState(1);
  const [showLabelForm,setShowLabelForm] = useState<any>(false);


  const reset = () => {
    setSeed(Math.random()+1)
}
  useEffect(()=>{
    if(WholeImageCanvasRef.current) {setRect(WholeImageCanvasRef.current.getBoundingClientRect())
      // console.log(WholeImageCanvasRef.current.getBoundingClientRect())
    }

   
  },[])
  
  const  getFirstMousePos = ( evt:any) => {
    var rect = WholeImageCanvasRef.current.getBoundingClientRect();
    WholeImageCanvasRef.current.onMouseMove
    // console.log('evt.clientX',evt.clientX,'evt.clientY',evt.clientY)
    // console.log('rect.left',rect.left,'rect.top',rect.top)
    const position = {x: evt.clientX - rect.left, y: evt.clientY - rect.top}
    setFirstPosition(position)
    console.log('first position:',position)
    setIsDown(true)
  }


const getSecondMousePos = async (evt: any) =>{
 
    const canvas = DrawImageCanvasRef.current
    WholeImageCanvasRef.current.onMouseMove
    const position = {x: evt.clientX , y: evt.clientY-dimension?.height}
    console.log('endposition:',position)

    console.log('start point: x=',firstPosition?.x,' y=',firstPosition?.y)
    console.log('width: ',dimension?.width,' height: ',dimension?.height)

    var ctx=canvas.getContext("2d");
    ctx.fillStyle = "#9ea7b8";
    ctx.fillRect(firstPosition?.x,firstPosition?.y,dimension?.width,dimension?.height);
    canvas.style.opacity = '0.3';
  
    setIsDown(false)
   await cutImage().then(()=>{insertLabelComponent(position);setShowLabelForm(true)})

}

const handleMouseMove = (evt: any) =>{
  evt.preventDefault();
  evt.stopPropagation();

  // if we're not dragging, just return
  if(!isDown){return;}
  // console.log('move')
 
  const canvas = DrawImageCanvasRef.current
  // console.log('rect.left',rect.left,'rect.top',rect.top)
  let mouseX=evt.clientX - rect.left;
  let mouseY=evt.clientY - rect.top;
  var ctx=canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
  let width=mouseX-firstPosition?.x;
  let height=mouseY-firstPosition?.y;
  setDimension({width: width, height: height})

  //strokeRect(x, y, width, height)
  ctx.strokeRect(firstPosition?.x,firstPosition?.y,width,height);
}

const cutImage = async () =>{


  imageCanvasRef.current.width = Math.abs(dimension.width);
  imageCanvasRef.current.height =Math.abs(dimension.height) ;
  imageCanvasRef.current.getContext('2d').drawImage(WholeImageCanvasRef.current, firstPosition.x, firstPosition.y,dimension.width,dimension.height,0,0,Math.abs(dimension.width) ,Math.abs(dimension.height))
  await makeRGBAnalysis()
  

}

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
  // console.log('rgb:',rgb.r, rgb.g,rgb)
  // ~~ used to floor values
  rgb.r = ~~(rgb.r/count);
  rgb.g = ~~(rgb.g/count);
  rgb.b = ~~(rgb.b/count);
  return rgb;
  
}


const setCanvas = () => {
  if(webcamRef.current){
    WholeImageCanvasRef.current.width = 640
    WholeImageCanvasRef.current.height = 480
    DrawImageCanvasRef.current.width = 640
    DrawImageCanvasRef.current.height = 480
    WholeImageCanvasRef.current.getContext('2d').drawImage(webcamRef.current.video, 0, 0, 640, 480)
    setShow(false)
  }
}

const onNewLabelHandle = () => {
  const img = imageCanvasRef.current.toDataURL()
  const obj = {value: PHvalue, img: img}
  setCuttedImagesURLs(preVImg => [...preVImg, obj])
  console.log('lista img: ',cuttedImagesURLs)
  reset()
  setShowLabelForm(false)
  const canvas = DrawImageCanvasRef.current
  var ctx=canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
}
 
const insertLabelComponent = (position: any) =>{
  setComponentForDisplay(
    <LabelComponent  key={seed+1} style={{ top: `${(position.y )+ 'px'}`, left: `${position.x + 'px'}`}} x={position.x} y={position.y}>
      <input type="text" placeholder="Wprowadź stopień pH"  onChange = {(e) => {setPHvalue(e.target.value);console.log(e.target.value)}} />
      <BestButton onClick={onNewLabelHandle}>OK</BestButton>
    </LabelComponent>
  )
}

const diplayComponent = () => {
  return componentForDisplay
}

const makeRGBAnalysis = () => {
  let rgb = getAverageRGB(imageCanvasRef.current)
  console.log('cyferki:','rgb('+rgb.r+','+rgb.g+','+rgb.b+')')
  divRef.current.style.backgroundColor = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
  setRgb('RGB ['+rgb.r+' , '+rgb.g+' , '+rgb.b+']')
  // console.log( rgb)
}

       return (
    <CenterContainer>
        
             {show && <Webcam
                ref={webcamRef}
                muted={true} 
                screenshotFormat="image/jpeg"
                style={{margin: 10, width: 540, height: 380}}
              />    }

              {show &&  <Container>
                <BestButton onClick={ ()=>{ setCanvas(); } } >Pobierz próbkę zdjęcia</BestButton>
              </Container>  }

             
                 { !show &&  <BestButton style={{width:'auto',height:'50px'}}  onClick={()=>{setShow(true)}}> Rozpocznij nową analizę pH </BestButton>}

                 { showLabelForm && diplayComponent()}
                 <div style={{position: 'relative'}}>
                  <Canvas show={show}  ref={WholeImageCanvasRef}/>
                  <DrawCanvas onMouseMove={(e)=>{handleMouseMove(e)}}  show={show} onMouseUp={(e)=>{getSecondMousePos(e)}} onMouseDown={(e)=>{getFirstMousePos(e)}}  ref={DrawImageCanvasRef}/>
                   <canvas  ref={imageCanvasRef}/> 
                   <div style={{marginTop: '10px',width: '200px', height: '200px', zIndex: '100'}} ref={divRef}> {rgb} </div>
                   </div>
                  
                       
    </CenterContainer> 
    
  );
    
    
 
}


const CenterContainer = styled.div`
    position: absolute;
    width: 100%;  
    top: 20%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

`
type Props = {
  show?: any,
  x?: any,
  y?: any
}

const Canvas = styled.canvas<Props>`
  width: 640px;
  height: 480px;
  display: ${show => show ? 'block' : 'none'};
  position: absolute;
  right: 20%;
`

const DrawCanvas = styled(Canvas)`

`

const LabelComponent = styled.div<Props>`
  position: fixed;
  z-index: 100;
  /* background-color: gray; */
  height: auto;
`