import React from "react"
import styled from "styled-components"

export const WelcomePage: React.FunctionComponent = () => {



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