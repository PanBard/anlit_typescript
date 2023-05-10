import React, { useRef, useEffect, useState, useMemo } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import * as tf from "@tensorflow/tfjs";
import { BestButton } from "lib/components/components_modules";
import { images_from_base64 } from "./images_from_base64";
import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";


// import { runDetectLoop  } from "./function/detect";


type ColorProps = {
  changeColor: boolean
}





export const CroppImageTest: React.FunctionComponent = ({}) => {
    
  const [data, setData] = useState<any[]>([])
  const wholeImageCanvasRef = useRef<any>(null);
  const croppedImageCanvasRef = useRef<any>(null);
  const [image, setImage] = useState<any>()
  const [wynik, setWynik] = useState<any>()
  const [zdjecie_w_klasyfikatorze, setZdjecie_w_klasyfikatorze] = useState<any>()
  const classification_labels = ['pomaranczowy_plyn','fioletowy_plyn','zolty_plyn','bialy','czarny','zolty','pomaranczowy','zielony','niebieski','niebiesko_rozowy']

   useEffect( ()=>{
    get_data()
   },[])
   
   const get_data = async () => {
    await  Axios.get(SERVER_ROUTS.image_storage.get)
      .then( (response: any)=>{setData(response.data); console.log(response.data) })
      .catch((err)=>{console.log('db status :(')})
    }





    const loadTestModel = async () => { 
      // const net =  tf.loadGraphModel('https://panbard.github.io/model_host/tfjsexport_3/model.json')
      // const net =  tf.loadGraphModel('tfjs_2/model.json')
      const net =  tf.loadGraphModel('tfjsexport_3/model.json')
      return net}

    const try_model = async () => {

      for(let i =0; i<3; i++){
        await loadTestModel()
        .then((e)=>{
          detect_from_img(e)
        })
      }
    }
    

    const detect_from_img = async (net:any ) => {
          var target = new Image(640,480);
          target.src = image;
   

          const img = tf.browser.fromPixels(target)
          const resized = tf.image.resizeBilinear(img, [640,480])
          const casted = resized.cast('int32')
          const expanded = casted.expandDims(0)
          const obj = await net.executeAsync(expanded)

          const boxes = await obj[4].array()
          const classes = await obj[7].array()
          const scores = await obj[5].array()
  
        // console.log('0',await obj[0].array())
        // console.log('1',await obj[1].array())
        // console.log('2',await obj[2].array())
        // console.log('3',await obj[3].array())
        // console.log('4',await obj[4].array())
        // console.log('5',await obj[5].array())
        // console.log('6',await obj[6].array())
        // console.log('7',await obj[7].array())
  
      if(boxes[0][0] && classes[0][0] && scores[0][0]>0.6){
        // console.log('boxes [3]',await boxes[0][0])
        //   console.log('scores [7]',await scores[0][0])
        //   console.log('classes [1]',await classes[0][0])

          const ymin =  parseInt((boxes[0][0][0]*target.height).toString())
          const xmin =  parseInt((boxes[0][0][1]*target.width).toString())
          const ymax =  parseInt((boxes[0][0][2]*target.height).toString())
          const xmax =  parseInt((boxes[0][0][3]*target.width).toString())

          croppedImageCanvasRef.current.width = 90;
          croppedImageCanvasRef.current.height = 220;
          croppedImageCanvasRef.current.getContext('2d').drawImage(target, xmin-10, ymin+200, 90, 220, 0, 0,90,220 ) //wery gud
              
          tf.dispose(img)
          tf.dispose(resized)
          tf.dispose(casted)
          tf.dispose(expanded)
          tf.dispose(obj)
          tf.dispose(net)
          
          tf.dispose(classes)
          tf.disposeVariables()
          try_model_klasyfikatora()
      }
      else{
        console.log('not pass treshold')
      }

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)
      
    }




    const loadTestModel_klasyfikatora = async () => { 
      // const net =  tf.loadGraphModel('https://panbard.github.io/model_host/tfjsexport_3/model.json')
      // const net =  tf.loadGraphModel('tfjs_2/model.json')
      // const net =  tf.loadGraphModel('klasyfikator/model.json')
      // const net =  tf.loadGraphModel('custom_model/model.json')
      // const net =  tf.loadGraphModel('dla10/model.json')
      const net =  tf.loadGraphModel('super10_imageclassifier_V6/model.json')
      return net}

    const try_model_klasyfikatora = async () => {

      for(let i = 0; i<3; i++){
        await loadTestModel_klasyfikatora()
      .then((e)=>{
        detect_from_img_klasyfikatora(e)
      })
      console.log('i',i)
      }
    }


    const detect_from_img_klasyfikatora = async (net:any ) => {
          var target = new Image(90,220);
          target.src = croppedImageCanvasRef.current.toDataURL();
          setZdjecie_w_klasyfikatorze(croppedImageCanvasRef.current.toDataURL())
          const img = tf.browser.fromPixels(target)
          const resized = tf.image.resizeBilinear(img, [220,90])
          const casted = resized.cast('float32')
          const expanded = casted.expandDims(0)
          const obj = await net.execute(expanded)
          
        const scores = await obj.array()
        console.log('obj',await scores)
        console.log('obj',await scores[0])
        if(scores){

          const indexOfMaxValue = scores[0].reduce((iMax: any, x: any, i: any, arr: any) => x > arr[iMax] ? i : iMax, 0);
  
        setWynik(`[${indexOfMaxValue}] - ${classification_labels[indexOfMaxValue]}`)
        }
        

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)
      
    }



    const cut_image =async () => {
      await try_model()
    } 

    



       return (
    <CenterContainer>

      <Container>
      <Container>
                      <label>Wybierz</label>
                      <select name="op" id="op" onChange={(obj)=>{ 
                            console.log('source img label:',obj.target.value)
                            setImage(data[obj.target.value as keyof typeof  data].img);
                            // console.log('select:  ','label: ',obj.target.value, 'image: ', keys[obj.target.value as keyof typeof keys] )
                          }}>
                          <option key={89} value={images_from_base64.bialy}> CHOOSE IMAGE </option>
                          {data.map((obj,index)=>{
                          return(  <option key={index} value={index}> {obj.label} </option>  )
                          })}

                      </select>                     
                    </Container>

                    <Container>
                      <div>
                       Przycięte zdjęcie: 
                       <canvas style={{width: 90, height: 220}} ref={croppedImageCanvasRef}/>
                    </div>
                      
                       <BestButton onClick={()=>{ try_model()}} >probowanie modelu (utnij zdjecie)</BestButton>                           
                    </Container>

                    <Container>
                      <div>
                           Zdjęcie w klasyfikatorze:
                           <img width={90} height={220} src={zdjecie_w_klasyfikatorze}/>
                      </div>                                               
                           <BestButton onClick={()=>{ try_model_klasyfikatora()}} >probowanie klasyfikatora</BestButton>
                    </Container>

                    <Container style={{width:'200px'}}>
                      Wynik:
                      <div>{wynik}</div>
                    </Container>
                          
                        <Container>                                                 
                            {/* <canvas style={{width: 90, height: 220}} ref={croppedImageCanvasRef}/> */}
                            <canvas style={{width: 640, height: 480, margin: 5}} ref={wholeImageCanvasRef}/>
                        </Container>
                        

        <img src="/crop_image.jpg" width={100} height={100} ></img>
      </Container>

      <Container>
        elo
      </Container>

               
    </CenterContainer> 
    
  );
    
    
 
}


const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
   
`

const Container = styled.div`
    display: block;
    justify-content: center;
`
