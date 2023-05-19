import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import { BestButton, ContainerP } from './components_modules';
import  Axios  from 'axios';
import { SERVER_ROUTS } from 'lib/database/server_routs';


type RegistrationFormProps = {
    result(params: any): any
}

export const RegistrationForm: React.FunctionComponent<RegistrationFormProps> = ({
    result
}) => {
    
    const [firstName, setFirstName] = useState<any>('');
    const [lastName, setLastName] = useState<any>('');
    const [username, setUsername] = useState<any>('');
    const [email, setEmail] = useState<any>('');
    const [password,setPassword] = useState<any>('');
    const [confirmPassword,setConfirmPassword] = useState<any>('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [errorType, setErrorType] = useState<any>('');


    const handleInputChange = (e: any) => {
        const {id , value} = e.target;
        // if(id === "firstName"){
        //     setFirstName(value);
        // }
        // if(id === "lastName"){
        //     setLastName(value);
        // }
        if(id === "username"){
            setUsername(value)
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

     const validate_credencials = async ( ) =>{
        const query = `select username from account_credentials where username='${username}'`
        await Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
            .then((response)=>{ 
                console.log( response.data[0])
                if(typeof response.data[0] != 'undefined'){
                    const username_from_db = response.data[0]['username']
                    if(username_from_db == username) {
                        console.log(username_from_db,' = ', username)
                        setErrorType('wrongUsername')
                        setSubmitted(false)
                    }
                    else console.log('strange')
                }
                else{
                    console.log('Ok', response.data[0])
                    if(password==confirmPassword){
                        send_data_to_db()
                    }
                    else{
                        setErrorType('wrongPassword')
                        setSubmitted(false)
                    }
                    
                }})
     }



     const send_data_to_db = async () => {
            console.log(' przeszło ')
          
        const query = `INSERT INTO account_credentials (username, password, date) VALUES ('${username}','${password}',now()) `
        await Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
            .then((response)=>{console.log('new user created') ; console.log(response.data)})
            .then(  result({result: 'Login', userName : username}))
            .catch((err)=>{console.log('send status :(')})
     }



  
       // Showing success message
       const successMessage = () => {
        return (
            <div style={{ display: submitted ? '' : 'none',}}>
                <h1>User {username} successfully registered!</h1>
            </div>
            );
    };

    // Showing error message if error is true
    const errorMessage = () => {
    return (
       <div >
           <div style={{ display: errorType =='wrongPassword' ? '' : 'none',}}>    <h3>Password does not match </h3>   </div>
           <div style={{ display: errorType =='wrongUsername' ? '' : 'none',}}>    <h3>Username is already taken</h3>   </div>
       </div>
    )
    };


    return(
        <Container className="form" >
             <ContainerP>
            <TableContainer >

                <Cell >
                    <h1>Sign up</h1>
                    
                </Cell>

                 <Cell >
                    <label>Username </label>
                    <Input style={{borderColor: errorType == 'wrongUsername' ? 'red' : ''}}  type="text" id='username' onChange = {(e) => handleInputChange(e)} placeholder="Username"/>
                </Cell>

                {/* <Cell >
                    <label>First Name </label>
                    <Input  type="text"  onChange = {(e) => handleInputChange(e)} placeholder="First Name"/>
                </Cell>

                <Cell  >
                    <label>Last Name </label>
                    <Input  type="text" name=""  onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
                </Cell> */}

                {/* <Cell >
                    <label >Email </label>
                    <Input  type="email" id="email"   onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </Cell> */}

                <Cell>
                    <label >Password </label>
                    <Input style={{borderColor: errorType == 'wrongPassword' ? 'red' : ''}} className="form__input" type="password" id='password' onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </Cell>

                <Cell >
                    <label  >Confirm Password </label>
                    <Input style={{borderColor: errorType == 'wrongPassword' ? 'red' : ''}} className="form__input" type="password"  id='confirmPassword'  onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                </Cell>
                {errorMessage()}
                {successMessage()}
                <div >
                    <BestButton onClick={()=>validate_credencials()} type="submit" >Register</BestButton>
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
    border: 1px solid;
    border-color: rgba(255,255,255,.35);
`

const TableContainer = styled.div`
    /* height: 150px; */
    /* overflow-y: scroll; */
    border: 1px solid ;
    border-color: rgba(255,255,255,.55);
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