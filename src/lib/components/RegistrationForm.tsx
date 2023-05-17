import React, {useState} from 'react';
import styled from 'styled-components';
import { BestButton, ContainerP } from './components_modules';



export const RegistrationForm = () => {
    
    const [firstName, setFirstName] = useState<any>();
    const [lastName, setLastName] = useState<any>();
    const [email, setEmail] = useState<any>();
    const [password,setPassword] = useState<any>();
    const [confirmPassword,setConfirmPassword] = useState<any>();

    const handleInputChange = (e: any) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }

    const handleSubmit  = () => {
        console.log(firstName,lastName,email,password,confirmPassword);
    }

    return(
        <Container className="form" >
             <ContainerP>
            <TableContainer >

                <Cell >
                    <h1>Sign up</h1>
                    
                </Cell>

                <Cell >
                    <label>First Name </label>
                    <Input  type="text"  onChange = {(e) => handleInputChange(e)} placeholder="First Name"/>
                </Cell>

                <Cell  >
                    <label>Last Name </label>
                    <Input  type="text" name=""  onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
                </Cell>

                <Cell >
                    <label >Email </label>
                    <Input  type="email" id="email"   onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </Cell>

                <Cell>
                    <label >Password </label>
                    <Input className="form__input" type="password" onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </Cell>

                <Cell >
                    <label  >Confirm Password </label>
                    <Input className="form__input" type="password"   onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                </Cell>

                <div >
                    <BestButton onClick={()=>handleSubmit()} type="submit" >Register</BestButton>
                </div>

                   </TableContainer>
             </ContainerP>
        </Container>
       
    )       
}

const Container = styled.div`
  padding: 0 15px;
  /* width: 100px; */
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    position: absolute;
    top: 20%;
    
    z-index: 4;
    width: 100%;    
    /* background-color: gray; */
`

const Input = styled.input`
    background-color: ${ ({theme}) => theme.colors.foreground };
    width: 60%;
    color: ${ ({theme}) => theme.colors.typography };
    height: 30px;
    ::placeholder{color:gray}
    border-radius: 10px;
    border: 2px solid ${ ({theme}) => theme.colors.background };
`

const TableContainer = styled.div`
    /* height: 150px; */
    /* overflow-y: scroll; */
    border: 3px solid gray;
    border-radius: 10px;
    justify-content: center;
    border-radius: 5px;
    width: 550px;
    margin: 20px auto;
    padding: 20px;

`

const Cell = styled.div`
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`