import styled from "styled-components"

export const BestButton = styled.button`
    padding: 10px;
    margin: 10px;
    text-align: center;
    font-weight:600;
    border-radius: 8px; 
    border: 1px solid gray;
    color: ${({theme}) => theme.colors.typography};
    background-color: ${({theme}) => theme.colors.foreground };
    cursor: pointer;
    &:hover {background-color: ${({theme}) => theme.colors.button_hover}}; 
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