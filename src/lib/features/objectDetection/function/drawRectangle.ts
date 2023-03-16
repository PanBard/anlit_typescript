import { saveAs } from "file-saver"

// Define our labelmap
const labelMap = {
    1:{name:'test_probe', color:'lime'}
}

let cam = 0

export const przesylanieDanych = (innazmienna: string) => {
    let zmienna = []
    if(innazmienna){
        zmienna.push(innazmienna)
    }
    return zmienna
}


export const drawRect = (boxes: any, classes: number, scores: number, threshold: number, imgWidth: number, imgHeight: number, ctx: any, imgForScreenshot: any)=>{
    
    
        if(boxes && classes && scores>threshold){
            // Extract variables
            const [y,x,height,width] = boxes

            ctx.strokeStyle = labelMap[1]['color']
            ctx.lineWidth = 3
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'         
            
            // DRAW!!
            ctx.beginPath()
            
            ctx.fillText(labelMap[1]['name'] + ' - ' + Math.round(scores*100)/100 , x*imgWidth, y*imgHeight-10)
            
            ctx.rect(x*imgWidth, y*imgHeight, 60, 400);
            
            ctx.stroke()
            
            console.log('licznik=',cam)
            cam +=1
            ctx.clearRect(0, 0,imgWidth, imgHeight);
            return true
            
        }
    }










