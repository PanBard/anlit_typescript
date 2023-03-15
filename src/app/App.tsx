import React from "react"
import styled, {ThemeProvider} from "styled-components"
import {myTheme} from "lib/styles"
import { DevScreen } from "lib/features"
export const App = () => {

    return(
       <ThemeProvider theme={ myTheme }>
            <MojDIV>
                <DevScreen/>
            </MojDIV>
       </ThemeProvider>
    )
}     


const MojDIV = styled.div`
width: 100%;
height: 100vh;
background-color: ${ ({theme}) => theme.colors.background };
display: flex;
flex-direction: column;
justify-content: space-between;
`
