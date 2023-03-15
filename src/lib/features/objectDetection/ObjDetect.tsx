// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";

// import { nextFrame } from "@tensorflow/tfjs";
// 2. TODO - Import drawing utility here
import {drawRect} from "./utilitiesDetection"; 

export const ObjDetect: React.FunctionComponent = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<any>(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    // const net = await tf.loadGraphModel('https://directionstfod.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json')
    
    const net = await tf.loadGraphModel('https://panbard.github.io/model_host/tfjsexport_3/model.json')
    // Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 17);
  };

  const detect = async (net: any) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      // //////////////////-------------------------------------------skrin
      const imgForScreenshot = webcamRef.current.getScreenshot();
      // //////////////////------------------------------------------------

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
      
      // console.log("box",await boxes[0])
      // console.log("clas",await classes[0])
      // console.log("scores",await scores[0][0])
      
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
      requestAnimationFrame(()=>{drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx, imgForScreenshot)}); 
      // requestAnimationFrame(()=>{drawRectegggg(videoWidth, videoHeight, ctx)}); 

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)

    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <section>
    <div className="App">
        <canvas>elo</canvas>
        <Webcam
          ref={webcamRef}
          muted={true} 
          screenshotFormat="image/jpeg"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
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
        />
      
    </div>
    </section>
  );
}


