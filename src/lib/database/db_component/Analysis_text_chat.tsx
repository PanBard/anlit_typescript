import  Axios  from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { SERVER_ROUTS } from "../server_routs" 
import { BestButton, ButtonImage, ContainerP, DeleteButton, MyImage, OptionButton, TableContainer, Td_image } from "lib/components/components_modules"

type Analysis_text_chatProps = {
    rout_name: string,
}

export const Analysis_text_chat: React.FunctionComponent<Analysis_text_chatProps> = ({
    rout_name
})=>{

    const [dataFromDataBase, setDataFromDataBase] = useState([])
    const [hide, setHide] =  useState<boolean>(false)
    const [showModyf, setTesto] = useState(false)
    const [seed, setSeed] = useState(1);

    const reset = () => {
         setSeed(Math.random())
         
     }

    const db_name = (rout_name == 'cation_analysis') ? 'c_analysis_texts' : 'a_analysis_texts'
    const header_name =  (rout_name=='cation_analysis') ? 'Cation' : 'Anion'
    const keys_f = (rout_name=='cation_analysis') ? ['id','name','f1',"f2","f3",'f4','f5','f6','f7'] : ['id','name','f1',"f2","f3",'f4']
    const keys_img = (rout_name=='cation_analysis') ? ['img1','img2','img3','img4','img5','img6','img7'] : ['img1','img2','img3','img4'] 
    const keys_end = ['end','result'] 
    const input_name = keys_f.concat(keys_img.concat(keys_end))
    
   //get data
    useEffect(  ()  =>  {
        get_data_from_db()
    },[])

    const delete_all_history = () => {
        if(confirm("Na pewno chcesz usunąć całą historię?")){
                const QUERY = `DELETE FROM ${db_name}`
        Axios.post(SERVER_ROUTS.custom_query.get, {query: QUERY})
        .then( ()=>{console.log('data deleted') })
        .then(()=>{get_data_from_db()})
        .then(()=>{reset()})
        .catch((err)=>{console.log('db status :(')})
        }
    
    }

    const get_data_from_db = () => {
        const QUERY = `SELECT * FROM ${db_name}`
        Axios.post(SERVER_ROUTS.custom_query.get, {query: QUERY})
        .then( (response: any)=>{console.log(':)', response.data);setDataFromDataBase(response.data) })
        .then(()=>{reset()})
        .catch((err)=>{console.log('db status :(')})
    }

      const delete_row_from_db = (id: number)=>{
        Axios.delete(  SERVER_ROUTS[rout_name as keyof typeof SERVER_ROUTS].delete+`/${id}`  )
        .then((response: any)=>{get_data_from_db(),console.log(response.data)})
        .then(()=>{reset()} )
        .catch(err => {console.log(err)})
    }; 

    const generate_labels = () => {
        if(dataFromDataBase[0]){
            const keys_p = Object.keys(dataFromDataBase[0])
        console.log('keys',keys_p)
        return( keys_p.map( (obj, i) => { return(<Th  key={i}>{obj}</Th>) }))
        }
        
    }

    const generate_table_content = () => {
        if(dataFromDataBase[0]){
            return( dataFromDataBase.map( (data: any, index)=>{
                            const keys_q = Object.keys(dataFromDataBase[0])
                            return (
                                <tr key={index}>  
                                    {keys_q.map( (obj, i) => { return(<Td key={i}>{data[obj]}</Td>) })}
                                    {!hide && <Td_container style={{cursor:'pointer'}}  onClick={()=>{setHide(true)}} ><OptionButton><ButtonImage src="/editing.png"/></OptionButton></Td_container>}
                                    {hide &&  <Td_container onClick={ ()=> { delete_row_from_db(data.id)}} ><DeleteButton>Usuń</DeleteButton></Td_container>  }
                                    <Td onClick={()=>{console.log('wykorzystać:',data.end)}} style={{cursor:'pointer', display: 'none'}}> {data.end=='end' ? 'ZOBACZ' : 'KONTYNYUJ'} </Td>
                                </tr>)
                        }
                    )
                )
            }
    }

    return(
        <ContainerP>
            <Container>
                  <BestButton onClick={delete_all_history}>Clear all</BestButton>
            </Container>
           
            {!showModyf &&  <Container>
                <Container>
                    <Container>{header_name} chat history </Container>
                    <TableContainer key={seed}>
                        <table >
                            <tbody >
                                <Tr>
                                    {generate_labels()}
                                </Tr>
                                {generate_table_content()}
                            </tbody>
                        </table>
                    </TableContainer>
                </Container> 
            </Container>}
        </ContainerP>
       
    )

}


const Td = styled.td`
    border: 1px solid gray;
    justify-content: center;
    text-align:center; 
`
const Td_container = styled.td`
    justify-content: center;
    text-align:center;     
`

const Th = styled.th`
    border: 1px solid gray;
    justify-content: center;
`

const Tr = styled.tr`
    position: -webkit-sticky; // this is for all Safari (Desktop & iOS), not for Chrome
    position: sticky;
    top: 0;
    z-index: 1; // any positive value, layer order is global
    background-color: gray;
`
const Container = styled.div` `



