import React, { useState } from "react"
import styled from "styled-components"
import { Attention } from "./Attention"



export const WelcomePage: React.FunctionComponent = () => {

    const [show,setShow] = useState<boolean>(false);

    const showAttention = () => {
        setShow(true)
    }

    return(
        <CenterContainer>
          <Imagee src="/galaxy.jpg"></Imagee>
        </CenterContainer>
    )
}

const Imagee = styled.img`
    /* width: 1200px;
    height: 480px; */
    border-radius: 10px;
`
const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
`