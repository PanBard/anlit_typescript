import  Axios  from "axios"
import { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { SERVER_ROUTS } from "../server_routs" 
import { BestButton, ButtonImage, ContainerP, DeleteButton, ModifyButton, MyImage, OptionButton, TableContainer, Tr_sticky_row } from "lib/components/components_modules"
import { image } from "@tensorflow/tfjs"
import { useTranslations } from "lib/hooks"

type UsersProps = {
    lang: string
}

export const Users: React.FunctionComponent<UsersProps> = ({lang})=>{

    const T = useTranslations(lang)
    const [hide, setHide] =  useState<string>()
    const [dataFromDataBase, setDataFromDataBase] = useState([])



    const [seed, setSeed] = useState(1);
    const [choosen_mode, setChoosen_mode] = useState('start')

    const reset = () => {
         setSeed(Math.random())
     }
 
    const header_name =  'User table '
    
    useEffect(  ()  =>  {
        get_data_from_db()
    },[])

    const get_data_from_db = async () => {

        const query = 'SELECT * FROM account_credentials'
        await Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
        .then( (response: any)=>{setDataFromDataBase(response.data) })
        .catch((err)=>{console.log('db status :(',err)})
    }


    const delete_row_from_db = (id: number)=>{

        const query = `DELETE FROM account_credentials WHERE id=${id}`
        Axios.post(SERVER_ROUTS.custom_query.get, {query: query})
        .then((response: any)=>{get_data_from_db()})
        .then(()=>{reset()} )
        .catch(err => {console.log(err)})
    }; 


    const showComponent = ()=>{

        if(choosen_mode=='start' && typeof dataFromDataBase[0] != 'undefined'){
          const keys_p = Object.keys(dataFromDataBase[0])
            return( 
                <Container>
                    <Container>{header_name} </Container>
                    <TableContainer key={seed}>
                        <table >
                            <tbody >
                                <Tr_sticky_row>
                                    {dataFromDataBase && keys_p.map( (obj, i) => {
                                        return(<Th key={i}>{obj}</Th>) })}
                                </Tr_sticky_row>
                                { dataFromDataBase && dataFromDataBase.map((data: any,index:any)=>{
                                    const date1 = data.date.replace('T',' | ').slice(0,-8)
                                    return (
                                        <tr key={data.id}>
                                             <Td>{data.id} </Td>
                                            {/* <Td><MyImage style={{height: '150px', width:'150px' }}  src={data.img1}/></Td>
                                            <Td><MyImage style={{height: '150px', width:'150px' }}  src={data.img2}/></Td>
                                            <Td><MyImage style={{height: '150px', width:'150px' }}  src={data.img3}/></Td> */}
                                            <Td>{data.username} </Td>
                                            <Td>{data.first_name} </Td>
                                            <Td>{data.last_name} </Td>
                                            <Td>{data.email} </Td>
                                            <Td>{data.password} </Td>
                                            <Td>{date1} </Td>
                                            <Td_container style={{cursor:'pointer' , display: hide==`${data.id}` ? 'none' : 'block'}}  onClick={()=>{setHide(data.id)}} ><OptionButton><ButtonImage src="/editing.png"/></OptionButton></Td_container>
                                            <Td_container style={{display: hide==`${data.id}` ? 'flex' : 'none'}} onClick={ ()=> { delete_row_from_db(data.id)}} ><DeleteButton>{T.databse.remove_bt}</DeleteButton></Td_container> 
                                        </tr>)})}
                            </tbody>
                        </table>
                    </TableContainer>
                </Container>
                 
                )
        }

        
     }
     
    return(
        <ContainerP key={seed}>
            <Container>
                {/* <BestButton style={{display: choosen_mode=='start' ? 'none' : 'block'}} onClick={()=>{setChoosen_mode('start')}}>Table</BestButton> */}
            </Container>
            {showComponent()}
        </ContainerP>
    )

}


const Td = styled.td`
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
     background-color:#161b22;
    justify-content: center;
    text-align:center; 
`
const Td_container = styled.td`
    justify-content: center;
    text-align:center;     
`

const Th = styled.th`
    border: 1px solid;
    border-color: rgba(255,255,255,.15);
     /* background-color:#161b22; */
    justify-content: center;
`

const Container = styled.div` `






