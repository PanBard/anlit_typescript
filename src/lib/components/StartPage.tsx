import zIndex from "@mui/material/styles/zIndex"
import React, { useState } from "react"
import styled from "styled-components"
import { BestButton } from "./components_modules"
import { OneHeader } from "./OneHeader"
import { Footer } from "./Footer"
import { RegistrationForm } from "./RegistrationForm"
import { LoginForm } from "./LoginForm"

type BeforeLoginProps = {
    choosenWeb(params: any): any
}

export const StartPage: React.FunctionComponent<BeforeLoginProps> = ({
    choosenWeb
}) => {

    const [loginStatus,setLoginStatus] = useState('Start')


    return(
        <Container>
            <OneHeader insideChoice={(e)=>{setLoginStatus(e)}} choosenWeb={e=>{ choosenWeb(e)}}/>
            
           { loginStatus =='Start' && <ContainerMain>
        <Containerr>
          <h1>Hi there!</h1>
          <H2s>Our AI-powered platform drives  innovation with tools that boost developer velocity.</H2s>
          <H2s>GitHub Codespaces offers a complete dev environment in seconds, so you can code, build, test, and open pull requests from any repo anywhere.</H2s>
        </Containerr>
        <Containerr>
        </Containerr>
        
        </ContainerMain>}

            <div className="circles" style={{position: 'absolute'}}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
            </div>

            {loginStatus=='Register'&&
                <RegistrationForm result={(e)=>{ choosenWeb(e)}}/>
            }

            {loginStatus=='Login'&&
                <LoginForm result={(e)=>{choosenWeb(e)}}/>
            }

           <Footer/>
      
        </Container>
    )
}

const Container = styled.div`
    background-image: url("/gala.jpg");
    /* background-color: gold; */
    width: 100%;
    height: 100vh;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index:1;
`





const H2s = styled.h3`
    width:50%;
`

const Imagee = styled.img`
    /* width: 1200px;
    height: 480px; */
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
    /* border: 1px solid; */
    /* border-color: rgba(255,255,255,.15); */
     /* background-color:#161b22; */
`

const Containerr = styled.div`
    /* position: absolute; */
    /* width: 100%; */
    /* top: 20%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    /* border: 1px solid; */
    /* border-color: rgba(255,255,255,.15); */
     /* background-color:#161b22; */
`