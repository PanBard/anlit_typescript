import { Label } from "@mui/icons-material"
import React, { useState } from "react"
import styled from "styled-components"

type TestowyGalleryProps = {
    images: Array<any>,

}

type PrzyciskProps = {
    e: any
}   

export const TestowyGallery: React.FunctionComponent<TestowyGalleryProps> = ({
    images
}) => {
    const [ernest,setErnesta] = useState(false)

    const mogol = (index: any ) => {
        console.log('selected:',index)
        setErnesta(!ernest)
        
    }

    
    return(
        <Container>
            {images.map((image, index)=>(
               
                    // nom
                    <MyImage key={index}   e={ernest} src={image} onClick={()=>{mogol(index)}}></MyImage>
              
            ))}
        </Container>
    )
}

const Container = styled.div`
    border: 5px solid red;
    display: inline-block;
    flex: 1;

`

const Container2 = styled.div`
    /* display: flex;
    flex-direction: column; */

`


const MyImage = styled.img<PrzyciskProps>`
width: ${({e}) => e ? '300px' :  '100px'};
height: ${({e}) => e ? '300px' :  '100px'};


`