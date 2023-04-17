// import { BrowserRouter as  Link, NavLink } from 'react-router-dom';
import { APP_CONFIG } from "lib/config"
import { useCommons } from "lib/hooks/useCommons" 
import styled from "styled-components"
import { BestButton } from './components_modules';
import { useState } from 'react';


type OneHeaderProps = {
    choosenWeb(params: any): any
}



export const OneHeader: React.FunctionComponent<OneHeaderProps> = ({
    choosenWeb
}) => {
    const T = useCommons()

  
    return(
        <HeaderContainer>
            <LogoContainer>
                <Linkos onClick={()=>{choosenWeb('Start')}}>
                    <Title>
                        {T.components.header.title}
                    </Title>
                </Linkos>                
            </LogoContainer>

            <LinkContainer>  
            <BestButton onClick={()=>{choosenWeb('Analysis')}}> Analysis </BestButton>
            {/* <BestButton onClick={()=>{choosenWeb('ObjDetect')}}> Analysis - Object detection </BestButton> */}
            <BestButton onClick={()=>{choosenWeb('DataBase')}}> DataBase </BestButton>
            <BestButton onClick={()=>{choosenWeb('voice')}}> Voicerecognition </BestButton>
            </LinkContainer>


            <LinkContainer>
                 <Linkos href={APP_CONFIG.GITHUB_URL} target='_blank'>  {/* target='_blank' eby otwierao sié w nowym oknie */}
                    User
                </Linkos>
                <Linkos href={APP_CONFIG.DISCORD_URL} target='_blank'>
                    {T.components.header.diskord}
                </Linkos>
            </LinkContainer>


        </HeaderContainer>
    )
}


const HeaderContainer = styled.div`
    height: 60px;
    background-color: ${({theme}) => theme.colors.foreground };
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

const Logo = styled.img`
    height: 36px;
    width: 36px;
    margin-right: 18px;
`

const Title = styled.h1`
    display: inline;
    font-size: 20px;
    color: ${({theme})=> theme.colors.typography};
`

const LinkContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const Linkos = styled.a`
      color: ${({theme})=> theme.colors.typography};
      text-decoration: underline;
      cursor: pointer; 
      padding: 0 10px;
      text-decoration: none;
`


