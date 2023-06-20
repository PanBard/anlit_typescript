import { APP_CONFIG } from "lib/config"
import { useTranslations } from "lib/hooks"
import React, { useState } from "react"
import styled from "styled-components"

type WelcomePageProps = {
    lang: string
}

export const WelcomePage: React.FunctionComponent<WelcomePageProps> = ({
    lang
}) => {

    const T = useTranslations(lang);
    return(
        <ContainerMain>
            <Container>
                <h1>Let’s build from here</h1>
                <H2s>Our AI-powered platform drives  innovation with tools that boost developer velocity.</H2s>
                <H2s>GitHub Codespaces offers a complete dev environment in seconds, so you can code, build, test, and open pull requests from any repo anywhere.</H2s>
            </Container>
            <Container>
                <Imagee src={APP_CONFIG.PROBE_GALAXY_URL}></Imagee>
            </Container>
        </ContainerMain>
      
    )
}

const H2s = styled.h2`
    width:40%;
`

const Imagee = styled.img`
    border-radius: 10px;
`
const ContainerMain = styled.div`
    position: absolute;
    width: 90%;
    top: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center; 
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
     background-color:#161b22;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
     background-color:#161b22;
`