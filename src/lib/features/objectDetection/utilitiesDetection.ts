import { saveAs } from "file-saver"
// Define our labelmap
const labelMap = {
    1:{name:'test_probe', color:'lime'},
    2:{name:'Thumbs', color:'yellow'},
    3:{name:'ThankYou', color:'lime'},
    4:{name:'LiveLong', color:'blue'},
}

let cam = 0

// Define a drawing function
export const drawRect = (boxes: [any], classes: [], scores: [], threshold: number, imgWidth: number, imgHeight: number, ctx: any, imgForScreenshot: any)=>{
    for(let i=0; i<=boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
            // Extract variables
            const [y,x,height,width] = boxes[i]
            const text = classes[i]
            // console.log('camera', imgWidth, imgHeight)
            // console.log('boxes:','y',y,'x',x,'height',height,'width',width)
            // Set styling
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 3
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'         
            
            // DRAW!!
            ctx.beginPath()
            // ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100 + '['+(x*imgWidth, y*imgHeight)+']'+'['+(width*imgWidth, height*imgHeight)+']', x*imgWidth, y*imgHeight-10)
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100 , x*imgWidth, y*imgHeight-10)
            // console.log("kordynaty",'x*imgWidth',x*imgWidth,'y*imgHeight', y*imgHeight,'width*imgWidth', width*imgWidth,'height*imgHeight', height*imgHeight)
            ctx.rect(x*imgWidth, y*imgHeight, 60, 400);
            // ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth, height*imgHeight);
            ctx.stroke()
            
            //  if (cam == 0){   saveAs(imgForScreenshot, 'zookdj.jpg'); cam =1}  //screenshot
            
         
        }
    }
}


