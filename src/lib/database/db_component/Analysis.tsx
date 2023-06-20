import  Axios  from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { SERVER_ROUTS } from "../server_routs" 
import { BestButton, ButtonImage, ContainerP, DeleteButton, MyImage, OptionButton, TableContainer, Td_image, Tr_sticky_row } from "lib/components/components_modules"
import { Attention } from "lib/components/Attention"
import { useTranslations } from "lib/hooks"

type AnalysysProps = {
    rout_name: string,
}

export const Analysis: React.FunctionComponent<AnalysysProps> = ({
    rout_name
})=>{

    const T = useTranslations()
    const [dataFromDataBase, setDataFromDataBase] = useState([])
    const [hide, setHide] =  useState<boolean>(false)
    const [showModyf, setTesto] = useState(false)
    const [seed, setSeed] = useState(1);
    const [component, setComponent] = useState<any>()

    const reset = () => {
         setSeed(Math.random())
         
     }
     const db_name = (rout_name == 'cation_analysis_result') ? 'cation_analysis_result' : 'anion_analysis_result'
    const header_name =  (rout_name=='cation_analysis_result') ? T.databse.cation_analysis : T.databse.anion_analisys
    const keys_f = (rout_name=='cation_analysis_result') ? ['id','name','f1',"f2","f3",'f4','f5','f6','f7'] : ['id','name','f1',"f2","f3",'f4']
    const keys_img = (rout_name=='cation_analysis_result') ? ['img1','img2','img3','img4','img5','img6','img7'] : ['img1','img2','img3','img4'] 
    const keys_end = ['end','result'] 
    const input_name = keys_f.concat(keys_img.concat(keys_end))
    
   //get data
    useEffect(  ()  =>  {
        get_data_from_db()
    },[])

    const get_data_from_db = () => {
        Axios.get(SERVER_ROUTS[rout_name as keyof typeof SERVER_ROUTS].get)
        .then( (response: any)=>{setDataFromDataBase(response.data) })
        .then(()=>{reset()})
        .catch((err)=>{console.log('db status :(',err)})
    }

      const delete_row_from_db = (id: number)=>{
        Axios.delete(  SERVER_ROUTS[rout_name as keyof typeof SERVER_ROUTS].delete+`/${id}`  )
        .then((response: any)=>{get_data_from_db()})
        .then(()=>{reset()} )
        .catch(err => {console.log(err)})
    }; 

    const delete_all_data = () => {
        if(confirm(T.databse.all_data_del_confirm)){
             const QUERY = `DELETE FROM ${db_name}`
        Axios.post(SERVER_ROUTS.custom_query.get, {query: QUERY})
        .then(()=>{get_data_from_db()})
        .then(()=>{reset()})
        .catch((err)=>{console.log('db status :(',err)})
        } 
       
    }

    const showFullImage = (source: any)=>{
        setComponent( <Attention  > <img width={640} height={480} src={source} /> </Attention>)
        reset()
     }
     
     const showComponent = ()=>{
        return component
     }

    return(
        <ContainerP>

            <Container>
                  <BestButton onClick={delete_all_data}>{T.databse.clear_all_bt}</BestButton>
            </Container>

            {!showModyf &&  <Container>
                <Container>
                    <Container>{header_name} </Container>
                    <TableContainer key={seed}>
                        {showComponent()} 
                        <table >
                        <tbody >
                            <Tr_sticky_row>
                                {input_name.map( (obj, i) => { return(<Th key={i}>{obj}</Th>) })}

                            </Tr_sticky_row>
                            {dataFromDataBase.slice(0).reverse().map((data: any, index)=>{
                                return (
                                    <tr key={index}>  
                                        {keys_f.map( (obj, i) => { return(<Td key={i}>{data[obj]}</Td>) })}
                                        {/* {keys_img.map( (obj, i) => {  return( <Td_image key={i}>  <MyImage style={{display: data[obj]==null? 'none' : 'flex'}}  src={data[obj]}/></Td_image>) })} */}
                                        {keys_img.map( (obj, i) => { if( data[obj]!=null) {return(  <Td_image key={i} >  <MyImage onClick={()=>{showFullImage(data[obj])}}   src={data[obj]}/></Td_image>)} else { return(<Td_image key={i} style={{cursor:'auto'}}/> ) } })}
                                        {keys_end.map( (obj, i) => { return(<Td style={{ background: data[obj]=='end' ? '#618685' : data[obj]=='fail' ? `#c44569` : 'none'}} key={i}>{data[obj]}</Td>) })}
                                        {!hide && <Td_container style={{cursor:'pointer'}}  onClick={()=>{setHide(true)}} ><OptionButton><ButtonImage src="/editing.png"/></OptionButton></Td_container>}
                                        {hide &&  <Td_container onClick={ ()=> { delete_row_from_db(data.id)}} ><DeleteButton>{T.databse.remove_bt}</DeleteButton></Td_container>  }
                                        {/* <Td style={{cursor:'pointer', display: 'none'}}> {data.end=='end' ? 'ZOBACZ' : 'KONTYNYUJ'} </Td> */}
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



