import React, { useState } from "react"
import styled from "styled-components"

type GalleryProps = {
    images: Array<any>
}

type PrzyciskProps = {
    e: any
}   

export const Gallery: React.FunctionComponent<GalleryProps> = ({
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
                <MyImage   e={ernest} src={image} key={index} onClick={()=>{mogol(index)}}></MyImage>
            ))}
        </Container>
    )
}

const Container = styled.div`
    border: 5px solid red;
    display: inline-block;
    flex: 1;

`


const MyImage = styled.img<PrzyciskProps>`
width: ${({e}) => e ? '300px' :  '100px'};
height: ${({e}) => e ? '300px' :  '100px'};


`