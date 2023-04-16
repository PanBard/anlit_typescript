import React from "react"
import styled, {ThemeProvider} from "styled-components"
import {myTheme} from "lib/styles"
import { Router } from "lib/components/Router"
import { OneRouter } from "lib/components/OneRouter"
export const App = () => {

    return(
       <ThemeProvider theme={ myTheme }>
            <MojDIV>
                {/* <Router/> */}
                <OneRouter/>
            </MojDIV>
       </ThemeProvider>
    )
}     


const MojDIV = styled.div`
width: 100%;
height: 100vh;
background-color: ${ ({theme}) => theme.colors.background };
color: ${({theme}) => theme.colors.typography};
display: flex;
flex-direction: column;
justify-content: space-between;
`
