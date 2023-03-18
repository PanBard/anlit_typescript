import * as tf from "@tensorflow/tfjs";


let nIntervId: ReturnType<typeof setInterval> | undefined //to stop interval in future


export const DetectFunction = (webcamRef: any, canvasRef: any) => {
    
    
    // const ultimateFunction = async (webcamRef: any, canvasRef: any) => {
    //      await mainFunction(webcamRef,canvasRef)
        
            
        
    // }

    const  mainFunction = async (webcamRef: any, canvasRef: any) => {
        // let v:any
        const model = await loadModel()  
        const model2 = await loadModelC()
        console.log('Start detect')
        return await repeatingFunc(webcamRef,model,model2,canvasRef)
       
    }

// const t = (r:any) => {v=r}
        
        // nIntervId = setInterval( async() => {
        //     const elo = await detect(webcamRef, model, canvasRef)
        //        if(elo){
               
        //         console.log('wykryto obiekt!!!')
        //         console.log('elo:',elo)
            
        //         const elo2 = await clasify(model2, elo) 
        //         if(elo2){
        //             t(elo2)
        //             console.log('elo2',elo2)
        //             clearInterval(nIntervId)
        //         }
                
        //        }
        //     console.log('interval:')
        // }, 1000);
    const repeatingFunc = async (webcamRef: any, model1: any,model2: any,canvasRef: any)=> {
        console.log('loop');
        const elo = await detect(webcamRef, model1, canvasRef)
           if(elo){
                console.log('wykryto obiekt!!!')
                const elo2 = await clasify(model2, elo) 
                if(elo2){
                    console.log('koniec petli, zwracamy:',elo2)
                    return elo2
                    }
            }
            else setTimeout(()=>{repeatingFunc(webcamRef,model1,model2,canvasRef)}, 500);
        

    }

    const loadModelC = async () => { 
        const net =  tf.loadGraphModel('https://panbard.github.io/model_host/classific/model.json')
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
                const classes = all[0]
      
                const result = classes.indexOf(Math.max(...classes));
                console.log('rezultat:',result)
                return result
            }

            

            tf.dispose(img)
            tf.dispose(resized)
            tf.dispose(casted)
            tf.dispose(expanded)
            tf.dispose(obj)
            
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
    
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;
    
            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;
    
            // Set canvas height and width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
    
            // 4. TODO - Make Detections
            const img = tf.browser.fromPixels(video)
            const resized = tf.image.resizeBilinear(img, [640,480])
            const casted = resized.cast('int32')
            const expanded = casted.expandDims(0)
            const obj = await net.executeAsync(expanded)
    
            // console.log("object badany",await obj[7].array())
            
            const boxes = await obj[4].array()
            const classes = await obj[7].array()
            const scores = await obj[5].array()
            
           

            if(boxes[0][0] && classes[0][0] && scores[0][0]>0.8){
                            
                    tf.dispose(img)
                    tf.dispose(resized)
                    tf.dispose(casted)
                    tf.dispose(expanded)
                    tf.dispose(obj)
                    
                    // clearInterval(nIntervId)
                    return video
            }

            else{
// requestAnimationFrame(()=>{drawRect(boxes[0][0], classes[0][0], scores[0][0], 0.8, videoWidth, videoHeight, ctx, imgForScreenshot)}); 
            tf.dispose(img)
            tf.dispose(resized)
            tf.dispose(casted)
            tf.dispose(expanded)
            tf.dispose(obj)
        } 
        }
        }


      return mainFunction(webcamRef,canvasRef)

}





 

  