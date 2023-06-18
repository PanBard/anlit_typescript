// import { BrowserRouter as  Link, NavLink } from 'react-router-dom';
import { APP_CONFIG } from "lib/config"
import { useCommons } from "lib/hooks/useCommons" 
import styled from "styled-components"
import { BestButton } from './components_modules';
import { useState } from 'react';


type OneHeaderWorkProps = {
    choosenWeb(params: any): any,
    userName: any
}

export const OneHeaderWork: React.FunctionComponent<OneHeaderWorkProps> = ({
    choosenWeb,
    userName
}) => {
    const T = useCommons()


    const DropdownMenu_analysis = () =>{
        return(
            <div className="dropdown">
            <img className="dropbtn" style={{cursor:'pointer', backgroundColor: 'rgb(200, 214, 229)' , borderRadius: '15px', margin: '10px'}} src="/user_icon.svg" alt=""  height={25} width={25}/>    
            <div className="dropdown-content-user">
              <a >Your profile</a>
              <a onClick={()=> choosenWeb('RegisterFaceRecognition')} >Make webcam login</a>
              <a >Your organizations</a>
              <a >Your projects</a>
              <a >Upgrade</a>
              <a >Help</a>
              <a >Settings</a>
              <a >Sign out</a>
            </div>
          </div> 
        )
    }

  
    return(
        <HeaderContainer>
             <LogoContainer>
                <Linkos onClick={()=>{choosenWeb('Start')}}>
                    <Title>
                        {T.components.header.title}
                    </Title>
                </Linkos>  
                <img src="/logo.svg" alt=""  height={25} width={25}/>              
            </LogoContainer>

            <LinkContainer>  
            <BestButton onClick={()=>{choosenWeb('Analysis')}}>Make new analysis </BestButton>            
            <BestButton onClick={()=>{choosenWeb('DataBase')}}> DataBase </BestButton>
            <BestButton onClick={()=>{choosenWeb('pH')}}> pH </BestButton>            
            <BestButton onClick={()=>{choosenWeb('FaceRecognition')}}> FaceRecognition </BestButton>
            <BestButton onClick={()=>{choosenWeb('Screenshot')}}> Screenshot </BestButton>
            </LinkContainer>


            <LinkContainer>
                <DropdownMenu_analysis />
                <div>User id: {userName}</div>
            </LinkContainer>
        </HeaderContainer>
    )
}


const HeaderContainer = styled.div`
    height: 60px;
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Title = styled.h1`
    display: inline;
    font-size: 20px;
    color: ${({theme})=> theme.colors.typography};
`

const LinkContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Linkos = styled.a`
      color: ${({theme})=> theme.colors.typography};
      text-decoration: underline;
      cursor: pointer; 
      padding: 0 10px;
      text-decoration: none;
`


