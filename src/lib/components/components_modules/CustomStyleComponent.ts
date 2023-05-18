import styled from "styled-components"

export const BestButton = styled.button`
    padding: 10px;
    margin: 10px;
    text-align: center;
    font-weight:600;
    border-radius: 8px; 
    border: 1px solid gray;
    color: ${({theme}) => theme.colors.typography};
    /* background-color: ${({theme}) => theme.colors.foreground }; */
    background: transparent;
    cursor: pointer;
    &:hover {background-color: ${({theme}) => theme.colors.foreground}}; 
`
export const TableContainer = styled.div`
    height: 350px;
    overflow-y: scroll;
    border: 3px solid gray;
    border-radius: 10px;
`
export const ContainerP = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
`

export const Td_image = styled.td`
    justify-content: center;
    text-align:center; 
    border: 1px solid #555455;
    border-radius: 10px;
    width: 50px;
    height: 50px;
`
export const MyImage = styled.img`
    width: 50px;
    height: 50px;
    border: 1px solid gray;
    justify-content: center;
    border-radius: 10px;
    &:hover {height:200px;width:200px;}; 
`

export const Tr_sticky_row = styled.tr`
    position: -webkit-sticky; // this is for all Safari (Desktop & iOS), not for Chrome
    position: sticky;
    top: 0;
    z-index: 1; // any positive value, layer order is global
    background-color: #6f6d6f;
`

export const DeleteButton = styled.button`
    padding: 5px;
    margin: 5px;
    text-align: center;
    font-weight:600;
    border-radius: 8px; 
    border: 1px solid gray;
    color: ${({theme}) => theme.colors.typography};
    background-color: ${({theme}) => theme.colors.error };
    cursor: pointer;
    &:hover {background-color: ${({theme}) => theme.colors.button_hover}}; 
`
export const OptionButton = styled.button`
    padding: 5px;
    justify-content: center; 
    text-align: center;
    font-weight:600;
    border-radius: 8px; 
    border: none;
    color: ${({theme}) => theme.colors.typography};
    background-color: ${({theme}) => theme.colors.background};
    cursor: pointer;
    &:hover {background-color: ${({theme}) => theme.colors.button_hover}}; 
`

export const ModifyButton = styled.button`
    padding: 5px;
    margin: 5px;
    text-align: center;
    font-weight:600;
    border-radius: 8px; 
    border: 1px solid gray;
    color: ${({theme}) => theme.colors.typography};
    background-color: ${({theme}) => theme.colors.foreground };
    cursor: pointer;
    &:hover {background-color: ${({theme}) => theme.colors.button_hover}}; 
`

export const ButtonImage = styled.img`
    height: 10px;
    width: 10px;
    justify-content: center; 
`
