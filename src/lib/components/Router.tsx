import React from "react"
import { BrowserRouter as BrowserRouter, Route, Routes} from 'react-router-dom';
import { Footer } from "./Footer";
import { Header } from "./Header";
import { WelcomePage } from "./WelcomePage";
import { StartDetection } from "./StartDetection";
import { Dashboard } from "lib/new_concept/Dashboard";

export const Router: React.FunctionComponent = () => {



    return(
        <BrowserRouter>
        
        <Header/> {/*this bar is working outside routes, so is working in all moduls */}

        <Routes >

            <Route path='/' element={<WelcomePage/>}/>
            <Route path={'start'} element={<StartDetection/> }/>
            <Route path={'testowy'} element={<Dashboard/> }/>
           
        </Routes>

        <Footer/>
      </BrowserRouter>
    )
}