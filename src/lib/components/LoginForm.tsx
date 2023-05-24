import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import { BestButton, ContainerP } from './components_modules';
import  Axios  from 'axios';
import { SERVER_ROUTS } from 'lib/database/server_routs';
import { LoginFaceRecognition } from 'lib/new_concept/face_recognition/LoginFaceRecognition';


type LoginFormProps = {
    result(params: any): any
}

export const LoginForm: React.FunctionComponent<LoginFormProps> = ({
    result
}) => {
    

    const [username, setUsername] = useState<any>('limon');
    const [password,setPassword] = useState<any>('limon');
    const [errorType, setErrorType] = useState<any>('limon');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);


    const handleInputChange = (e: any) => {
        const {id , value} = e.target;
       
        if(id === "username"){
            setUsername(value)
        }
     
        if(id === "password"){
            setPassword(value);
        }

    }



    const validate_password = async ( ) =>{
         const query = `select password, username from account_credentials where username='${username}'`
        await Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
            .then((response)=>{
                if(typeof response.data[0] != 'undefined'){
                    if(response.data[0]['password'] == password && response.data[0]['username'] == username) {
                        console.log(response.data[0]['password'],' = ', password)
                        setSubmitted(true)
                        setErrorType('none')
                        result({result: 'Login', userName : response.data[0]['username']})
                    }
                    else{
                        console.log(`Nieprawidłowe hasło: ${password} dla takiego konta: ${username}`)
                        setErrorType('wrongPassword')
                        setSubmitted(false)
                }
                }
                else{
                    console.log('Zła nazwa użytkownika', response.data[0])
                    setErrorType('wrongUsername');
                    setSubmitted(false)
                }
                
               })
            // .then(  result('Login'))
            .catch((err)=>{console.log('send status :(')})
    }




    // Showing success message
    const successMessage = () => {
        return (
            <div style={{ display: submitted ? '' : 'none',}}>
                <h1>Welcome!</h1>
            </div>
            );
    };

    // Showing error message if error is true
    const errorMessage = () => {
             return (
                <div >
                    <div style={{ display: errorType =='wrongPassword' ? '' : 'none',}}>    <h3>Wrong password</h3>   </div>
                    <div style={{ display: errorType =='wrongUsername' ? '' : 'none',}}>    <h3>Wrong Username</h3>   </div>
                </div>
        )
    };


    return(
        <Container className="form" >
             <ContainerP>
            <TableContainer >

                <Cell >
                    <h1>Sign in</h1>
                    
                </Cell>

                 <Cell >
                    <label>Username </label>
                    <Input style={{borderColor: errorType == 'wrongUsername' ? 'red' : ''}} type="text" id='username' onChange = {(e) => handleInputChange(e)} placeholder="Username"/>
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

                {/* <Cell >
                    <label  >Confirm Password </label>
                    <Input className="form__input" type="password"  id='confirmPassword'  onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                </Cell> */}
                {errorMessage()}
                {successMessage()}
                <div >
                    <BestButton onClick={()=>validate_password()} type="submit" >Log in</BestButton>
                </div>
                {/* <div >
                    <BestButton onClick={()=>validate_password()} >Webcam</BestButton>
                </div> */}
                <LoginFaceRecognition returnResult={(e)=>{result(e)}}/>

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