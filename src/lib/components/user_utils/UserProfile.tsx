import { FaceImage } from "lib/database/db_component/FaceImage";
import { Users } from "lib/database/db_component/Users";
import React, { useRef, useEffect, useState, useMemo } from "react";
import styled from "styled-components";


type UserProfileProps = {
    lang: string
  }
  
  
  export const UserProfile: React.FunctionComponent<UserProfileProps> = ({
    lang
  }) => {
    
    return(
      <OrderContainer>        

          <SavedContainer style={{overflowY:'hidden', width:'250px'}} key={100}>
            Twoje dane:
            <Users />
          </SavedContainer>


          <SpaceBetweenContainer style={{width:'300px'}}>
            Statystyki:
          </SpaceBetweenContainer>

        <SpaceBetweenContainer style={{width:'300px'}}>
        <FaceImage />
        </SpaceBetweenContainer>
                  
    </OrderContainer>
    )

  }


const MainContainer = styled.div`
    position: absolute;
    width: 100%;
    top: 20%;
    display: flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
     background-color:#161b22;
`
const CenterContainer = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: center;
    
`
const OrderContainer = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  z-index: 2;
  width: 200px;
  max-width: 200px;
  overflow: hidden;
  padding: 10px;
  margin-left: 30px;
  margin-right: 30px;
  border: 1px solid;
  border-color: rgba(255,255,255,.15);    border: 1px solid;
  border-color: rgba(255,255,255,.15);

`

const SpaceBetweenContainer = styled(Container)`
   justify-content: space-between;
`

const SavedContainer = styled(SpaceBetweenContainer)`
  width: 350px;
  max-width: 350px;

`

