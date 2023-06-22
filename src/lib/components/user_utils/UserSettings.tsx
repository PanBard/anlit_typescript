import React, { useRef, useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { BestButton } from "../components_modules";
import { APP_CONFIG } from "lib/config";


type UserSettingsProps = {
    lang: string,
    language(param: any): any
  }
  
  
  export const UserSettings: React.FunctionComponent<UserSettingsProps> = ({
    lang,
    language
  }) => {
    
    const [status, setStatus] = useState<any>()

    const returnSetting = ()=>{
      if(status=='language'){
         return(
            <SettingContainer>
                Wybierz język: 
                <BestButton onClick={()=>{language('EN')}}>ENGLISH</BestButton>
                <BestButton onClick={()=>{language('PL')}}>POLISH</BestButton>
            </SettingContainer>
        )
      }
      if(status=='apperance'){
        return(
           <SettingContainer>
               Opcje wyglądu: 
               
           </SettingContainer>
       )
     }
    }

  return (
    <OrderContainer>        

    <UserDataContainer >
    <BestButton onClick={()=>{setStatus("language")}}> Język  </BestButton>
    <BestButton onClick={()=>{setStatus("apperance")}}> Wygląd  </BestButton>
    </UserDataContainer>


 
  <CenterContainer>
    {returnSetting()}
  </CenterContainer>
  
            
</OrderContainer>
  ); 

  }



  const OrderContainer = styled.div`
  color: ${({theme}) => theme.colors.typography};
  display: flex;
  flex-direction: row;
  flex: 1;
  margin: 30px;
  /* justify-content: space-between; */
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  z-index: 2;
  overflow: hidden;
  padding: 10px;
  margin-left: 30px;
  margin-right: 30px;
  border: 1px solid;
  border-color: rgba(255,255,255,.15);    
`
const SettingContainer = styled(Container)`
border: none;
`

const UserDataContainer = styled(Container)`
 justify-content: space-between;
 width:300px;
`

const ImageContainer = styled.div`
 display: flex;
 flex-direction: column;
  height: 400px;    
 justify-content: space-around;
`

const CenterContainer = styled.div`
display: flex;  
width:60&;
justify-content: center;
border: 1px solid;
border-color: rgba(255,255,255,.15);    
`

const DataBar = styled.span`  
padding: 10px;
height: 50px;
display: flex;
justify-content: space-between;
justify-items: center;
`
const DataBar2 = styled(DataBar)`
background-color:#282728;
`

const UserImage = styled.img`
width: 200px;
height: 200px;
`

