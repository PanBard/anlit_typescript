import  Axios  from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { SERVER_ROUTS } from "../server_routs" 
import { BestButton, ButtonImage, ContainerP, DeleteButton, MyImage, OptionButton, TableContainer, Td_image, Tr_sticky_row } from "lib/components/components_modules"
import { Attention } from "lib/components/Attention"

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
    const [component, setComponent] = useState<any>()

    const reset = () => {
         setSeed(Math.random())
         
     }
     const db_name = (rout_name == 'cation_analysis') ? 'ultimate_analysis' : 'anion_analysis'
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

    const delete_all_data = () => {
        if(confirm("Na pewno chcesz usunąć całą historię?")){
             const QUERY = `DELETE FROM ${db_name}`
        Axios.post(SERVER_ROUTS.custom_query.get, {query: QUERY})
        .then( ()=>{console.log('data deleted') })
        .then(()=>{get_data_from_db()})
        .then(()=>{reset()})
        .catch((err)=>{console.log('db status :(')})
        } 
       
    }



    

    const showFullImage = (source: any)=>{
        setComponent( <Attention  > <img width={420} height={340} src={source} /> </Attention>)
        reset()
     }
     
     const showComponent = ()=>{
        return component
     }

    return(
        <ContainerP>

            <Container>
                  <BestButton onClick={delete_all_data}>Clear all</BestButton>
            </Container>

            {!showModyf &&  <Container>
                <Container>
                    <Container>{header_name} analysis </Container>
                    <TableContainer key={seed}>
                        {showComponent()} 
                        <table >
                        <tbody >
                            <Tr_sticky_row>
                                {input_name.map( (obj, i) => { return(<Th key={i}>{obj}</Th>) })}

                            </Tr_sticky_row>
                            {dataFromDataBase.map((data: any, index)=>{
                                return (
                                    <tr key={index}>  
                                        {keys_f.map( (obj, i) => { return(<Td key={i}>{data[obj]}</Td>) })}
                                        {/* {keys_img.map( (obj, i) => {  return( <Td_image key={i}>  <MyImage style={{display: data[obj]==null? 'none' : 'flex'}}  src={data[obj]}/></Td_image>) })} */}
                                        {keys_img.map( (obj, i) => { if( data[obj]!=null) {return(  <Td_image key={i} onClick={()=>{showFullImage(data[obj])}}>  <MyImage onClick={()=>{showFullImage(data[obj])}}   src={data[obj]}/></Td_image>)} else { return(<Td_image key={i} style={{cursor:'auto'}}/> ) } })}
                                        {keys_end.map( (obj, i) => { return(<Td style={{ background: data[obj]=='end' ? '#618685' : data[obj]=='fail' ? `#c44569` : 'none'}} key={i}>{data[obj]}</Td>) })}
                                        {!hide && <Td_container style={{cursor:'pointer'}}  onClick={()=>{setHide(true)}} ><OptionButton><ButtonImage src="/editing.png"/></OptionButton></Td_container>}
                                        {hide &&  <Td_container onClick={ ()=> { delete_row_from_db(data.id)}} ><DeleteButton>Usuń</DeleteButton></Td_container>  }
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


const Th = styled.th`
    border: 1px solid gray;
    justify-content: center;
`


const Container = styled.div` `



