import React from "react"
import { BrowserRouter as BrowserRouter, Route, Routes} from 'react-router-dom';
import { Footer } from "./Footer";
import { Header } from "./Header";
import { WelcomePage } from "./WelcomePage";
import { StartDetection } from "./StartDetection";
import { Dashboard } from "lib/new_concept/Dashboard";
import { DataDashboard } from "lib/database/DataDashboard";
import { TestowyDashboard } from "lib/new_concept/testowy/TestowyDashboard";
import { IntegracyjnyDashboard } from "lib/new_concept/integracja_testowy/IntegracyjnyDashboard";

export const Router: React.FunctionComponent = () => {



    return(
        <BrowserRouter>
        
        <Header/> {/*this bar is working outside routes, so is working in all moduls */}

        <Routes >

            <Route path='/' element={<WelcomePage/>}/>
            <Route path={'start'} element={<StartDetection/> }/>
            <Route path={'testowy'} element={<Dashboard/> }/>
            <Route path={'baza_danych'} element={<DataDashboard/> }/>
            <Route path={'udawacz'} element={<TestowyDashboard/> }/>
            <Route path={'integracja'} element={<IntegracyjnyDashboard/> }/>
        </Routes>

        <Footer/>
      </BrowserRouter>
    )
}