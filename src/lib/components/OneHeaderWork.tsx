import { APP_CONFIG } from "lib/config"
import styled from "styled-components"
import { BestButton } from './components_modules';
import { useTranslations } from "lib/hooks/useTranslations";
import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";
import { useEffect, useState } from "react";


type OneHeaderWorkProps = {
    choosenWeb(params: any): any,
    userName: any,
    lang: string
}

export const OneHeaderWork: React.FunctionComponent<OneHeaderWorkProps> = ({
    choosenWeb,
    userName,
    lang
}) => {
    const T = useTranslations(lang)
    const [userImage,setUserImage] = useState()

    useEffect(()=>{
        getUserImage()
    },[])

    const getUserImage = async ()=> {
        const query = `select CONVERT(img1 USING utf8) as img1 from face_img_storage where username='${userName}'`
        await Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
            .then((response)=>{ setUserImage(response.data[0].img1)  })
            .catch((err)=>{console.log('send status :(',err)})
    }


    const DropdownMenu_analysis = () =>{
        return(
            <div className="dropdown">
           <UserImage className="dropbtn"  src={userImage ? userImage : APP_CONFIG.USER_IMG_URL}  alt=""  />      {/* take img from db or set default img as avatar*/}
            <div className="dropdown-content-user">
              <a onClick={()=>{choosenWeb('UserProfile')}}>{T.dashboard_header.dropdown_profile}</a>
              <a onClick={()=>{choosenWeb('RegisterFaceRecognition')}} >{T.dashboard_header.dropdown_faceid}</a>
              <a onClick={()=>{choosenWeb('UserIonAnalysis')}} >{T.dashboard_header.dropdown_ion}</a>
              <a onClick={()=>{choosenWeb('UserPHAnalysis')}}>{T.dashboard_header.dropdown_ph}</a>              
              <a onClick={()=>{choosenWeb('UserHelp')}}>{T.dashboard_header.dropdown_help}</a>
              <a onClick={()=>{choosenWeb('UserSettings')}} >{T.dashboard_header.dropdown_Settings}</a>
              <a onClick={()=>{location.reload()}} >{T.dashboard_header.dropdown_signout}</a>
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
                <img src={APP_CONFIG.LOGO_URL} alt=""  height={25} width={25}/>              
            </LogoContainer>

            <LinkContainer>  
            <BestButton onClick={()=>{choosenWeb('Analysis')}}>{T.dashboard_header.analysis} </BestButton>            
            <BestButton onClick={()=>{choosenWeb('DataBase')}}> {T.dashboard_header.database}  </BestButton>
            <BestButton onClick={()=>{choosenWeb('pH')}}> {T.dashboard_header.ph}  </BestButton>            
            <BestButton onClick={()=>{choosenWeb('FaceRecognition')}}> {T.dashboard_header.face_recognition}  </BestButton>
            <BestButton onClick={()=>{choosenWeb('Screenshot')}}> {T.dashboard_header.others}  </BestButton>
            </LinkContainer>

            <LinkContainer>
                <DropdownMenu_analysis />
                <div>{T.dashboard_header.user_id} {userName}</div>
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

const UserImage = styled.img`
    cursor: pointer;
    background-color:rgb(200, 214, 229);
    border-radius: 15px;
    margin: 10px;
    height:30px;
    width:30px;
`
