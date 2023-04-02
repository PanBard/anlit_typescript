import  Axios  from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { SERVER_ROUTS } from "../server_routs" 
import { ContainerP, MyImage, TableContainer, Td_image } from "lib/components/components_modules"

type AnalysysProps = {
    rout_name: string,
}

export const Analysis: React.FunctionComponent<AnalysysProps> = ({
    rout_name
})=>{

    const [dataFromDataBase, setDataFromDataBase] = useState([])
    const [hide, setHide] =  useState<boolean>(false)
    const [showModyf, setTesto] = useState(false)
    const [seed, setSeed] = useState(1);

    const reset = () => {
         setSeed(Math.random())
         
     }
    const header_name =  (rout_name=='cation_analysis') ? 'Cation' : 'Anion'
    const keys_f = (rout_name=='cation_analysis') ? ['id','name','f1',"f2","f3",'f4','f5','f6','f7'] : ['id','name','f1',"f2","f3",'f4']
    const keys_img = (rout_name=='cation_analysis') ? ['img1','img2','img3','img4','img5','img6','img7'] : ['img1','img2','img3','img4'] 
    const keys_end = ['end','result'] 
    const input_name = keys_f.concat(keys_img.concat(keys_end))
    
   //get data
    useEffect(  ()  =>  {
        get_data_from_db()
    },[])

    const get_data_from_db = () => {
        Axios.get(SERVER_ROUTS[rout_name as keyof typeof SERVER_ROUTS].get)
        .then( (response: any)=>{console.log(':)');setDataFromDataBase(response.data) })
        .then(()=>{reset()})
        .catch((err)=>{console.log('db status :(')})
    }

      const delete_row_from_db = (id: number)=>{
        Axios.delete(  SERVER_ROUTS[rout_name as keyof typeof SERVER_ROUTS].delete+`/${id}`  )
        .then((response: any)=>{get_data_from_db(),console.log(response.data)})
        .then(()=>{reset()} )
        .catch(err => {console.log(err)})
    }; 

    return(
        <ContainerP>
            {!showModyf &&  <Container>
                <Container>
                    <Container>{header_name} analysis </Container>
                    <TableContainer key={seed}>
                        <table >
                        <tbody >
                            <Tr>
                                {input_name.map( (obj, i) => { return(<Th key={i}>{obj}</Th>) })}

                            </Tr>
                            {dataFromDataBase.map((data: any, index)=>{
                                return (
                                    <tr key={index}>  
                                        {keys_f.map( (obj, i) => { return(<Td key={i}>{data[obj]}</Td>) })}
                                        {keys_img.map( (obj, i) => { return( <Td_image key={i}><MyImage style={{display: data[obj]==null? 'none' : 'flex'}}  src={data[obj]}/></Td_image>) })}
                                        {keys_end.map( (obj, i) => { return(<Td style={{ background: data[obj]=='end' ? '#618685' : 'none'}} key={i}>{data[obj]}</Td>) })}
                                        {!hide && <Td_container style={{cursor:'pointer'}}  onClick={()=>{setHide(true)}} >...</Td_container>}
                                        {hide &&  <Td_del_button onClick={ ()=> { delete_row_from_db(data.id)}} >Usuń</Td_del_button>  }
                                        <Td onClick={()=>{console.log('wykorzystać:',data.end)}} style={{cursor:'pointer', display: 'none'}}> {data.end=='end' ? 'ZOBACZ' : 'KONTYNYUJ'} </Td>
                                    </tr>
                                )
                                })}
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

const Td_del_button = styled.td`
    border: 1px solid gray;
    cursor: pointer;
    background-color: #f7786b;
    padding: 5px;
    border-radius: 10px;
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



