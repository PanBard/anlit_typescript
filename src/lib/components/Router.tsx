import React from "react"
import { Start } from "./Start"
import { BrowserRouter as BrowserRouter, Route, Routes} from 'react-router-dom';
import { Footer } from "./Footer";
import { Header } from "./Header";
import { BossState } from "lib/sate/BossState";

export const Router: React.FunctionComponent = () => {



    return(
        <BrowserRouter>
        
        <Header/> {/*this bar is working outside routes, so is working in all moduls */}

        <Routes >

            <Route path='/' element={<Start/>}/>
            <Route path={'start'} element={<BossState/>}/>
           
        </Routes>

        <Footer/>
      </BrowserRouter>
    )
}