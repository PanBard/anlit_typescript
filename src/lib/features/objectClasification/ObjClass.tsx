import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { useLabel } from "lib/hooks/useDetectFlow";

type ObjClass = {
    video:any
    labelName(params: any): any
}


export const ObjClass: React.FunctionComponent<ObjClass> = ({
    video,
    labelName
    
}) => {

    const labels = useLabel()

    useEffect(()=>{
        classifyImage(video)
        // Voice('Następuje klasyfikacja obrazu.')
    },[])

    const classifyImage = async (video:any)=>{
        const netto = await tf.loadGraphModel('https://panbard.github.io/model_host/classific/model.json')
             detect(netto, video);
      }


    const detect = async (net:any, video:any, ) => {
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
        const classes = all[0]
        // console.log("object badany",await classes)
        // console.log("¬¬¬¬¬¬¬¬¬¬¬¬¬¬")
        // console.log(all,classes)
        // for(let i=0,len=classes.length; i<=len; i+=1){
        //   if (classes[i] > 0.1){
        //     console.log(classes[i])
        //     console.log([labelMap[i]])
        //   }
          
        // }
      //   for(let i=0,len=classes.length; i<=len; i+=1){
      //             console.log([labelMap[i]+'=='+classes[i]]);
      //         }
        
        const result = classes.indexOf(Math.max(...classes));
        // console.log(labelMap[result]+' ['+parseFloat(classes[result]).toFixed(2)+']')
        
        labelName(labels[result])

        tf.dispose(img)
        tf.dispose(resized)
        tf.dispose(casted)
        tf.dispose(expanded)
        tf.dispose(obj)
        setTimeout(()=>{console.log('koniec c')}, 2000);
  }

       
      }
     


    return null
}


    


 

