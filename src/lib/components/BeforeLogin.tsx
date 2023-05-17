import zIndex from "@mui/material/styles/zIndex"
import React, { useState } from "react"
import styled from "styled-components"
import { BestButton } from "./components_modules"
import { OneHeader } from "./OneHeader"
import { Footer } from "./Footer"
import { RegistrationForm } from "./RegistrationForm"

type BeforeLoginProps = {
    choosenWeb(params: any): any
}

export const BeforeLogin: React.FunctionComponent<BeforeLoginProps> = ({
    choosenWeb
}) => {

    const [loginStatus,setLoginStatus] = useState('Start')


    return(
        <Container>
            <OneHeader choosenWeb={e=>{console.log(e); setLoginStatus(e)}}/>

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
                <RegistrationForm/>
            }

           <Footer/>
      
        </Container>
    )
}

const Container = styled.div`
    background-image: url("/gala.jpg");
    background-color: gold;
    width: 100%;
    height: 100vh;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index:1;
`

const CenterContainer = styled.div`
    width: 100%;
height: 100vh;
background-color: ${ ({theme}) => theme.colors.background };
color: ${({theme}) => theme.colors.typography};
display: flex;
flex-direction: column;
justify-content: space-between;
`


const HeaderContainer = styled.div`
    height: 60px;
    /* background-color: ${({theme}) => theme.colors.foreground }; */
    background: transparent;
    padding: 0 15px;
    /* position: absolute; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 3;
`