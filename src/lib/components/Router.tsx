import React from "react"
import { BrowserRouter as BrowserRouter, Route, Routes} from 'react-router-dom';
import { Footer } from "./Footer";
import { Header } from "./Header";
import { BossState } from "lib/sate/BossState";
import { WelcomePage } from "./WelcomePage";
import { StartDetection } from "./StartDetection";
import { DetectBase } from "lib/new_concept/DetectBase";

export const Router: React.FunctionComponent = () => {



    return(
        <BrowserRouter>
        
        <Header/> {/*this bar is working outside routes, so is working in all moduls */}

        <Routes >

            <Route path='/' element={<WelcomePage/>}/>
            <Route path={'start'} element={<StartDetection/> }/>
            <Route path={'testowy'} element={<DetectBase/> }/>
           
        </Routes>

        <Footer/>
      </BrowserRouter>
    )
}