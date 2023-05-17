import zIndex from "@mui/material/styles/zIndex"
import React from "react"
import styled from "styled-components"
import { BestButton } from "./components_modules"
import { OneHeader } from "./OneHeader"
import { Footer } from "./Footer"

type BeforeLoginProps = {
    choosenWeb(params: any): any
}

export const BeforeLogin: React.FunctionComponent<BeforeLoginProps> = ({
    choosenWeb
}) => {



    return(
        // <CenterContainer id="morek">
        //     no ciekawe
        // </CenterContainer>

        <div>
            <div style={{position: 'inherit' , width: '1800px' , height: '100%'}}>
                   <OneHeader choosenWeb={e=>{console.log(e)}}/>
            </div>
         
         
             <div className="cloac">
                <div>
                         <img id="kop" src="/gala.jpg" alt="" />
                </div>

                <div style={{position: 'inherit'  , height: '100%', zIndex:100}}>
                 <Footer/>
            </div>


           
                <div className="area" >
                    <div className="circles">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                    </div>
                
                </div >  
               

                   
            </div>

         
      
        </div>
       
       
    )
}

const Imagee = styled.img`
    /* width: 1200px;
    height: 480px; */
    border-radius: 10px;
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