import React, { useRef, useEffect, useState, useMemo } from "react";
import styled from "styled-components";


type UserHelpProps = {
    lang: string
  }
  
  
  export const UserHelp: React.FunctionComponent<UserHelpProps> = ({
    lang
  }) => {
    
  return (
    <MainContainer>
     help
    </MainContainer> 
  ); 

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