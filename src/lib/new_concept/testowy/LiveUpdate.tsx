import  Axios  from "axios";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { SERVER_ROUTS } from "lib/database/server_routs";
import { MyImage, Td_image } from "lib/components/components_modules";

type LiveUpdateProps = {
    cation: boolean
}

export const LiveUpdate: React.FunctionComponent<LiveUpdateProps> = ({
    cation
}) => {


    const [data, setData] = useState<any[]>([])
    const [seed, setSeed] = useState(1);

    const db_type = cation ? 'cation_analysis' : 'anion_analysis' 
    

    const reset = () => {
        setSeed(Math.random())
        
    }

    useEffect(  ()  =>  {
        get_data_from_db()
    },[])

    useMemo(()=>{
      
        // if(data[0]){
        //     input_name =Object.keys(data[0])
        // }

    },[data])

 

    

    const get_data_from_db = () => {
        Axios.get(SERVER_ROUTS[db_type].get)
        .then( (response: any)=>{console.log(':)');const data = response.data;setData(data[data.length-1]);console.log('data[data.length-1]',data[data.length-1]) })
        .catch((err)=>{console.log('db status :(')})
    }

    // const delete_row_from_db = async (id: number)  =>{
    //   await  Axios.delete(SERVER_ROUTS[db_type].delete+`/${id}`)
    //     .then((response: any)=>{get_data_from_db(),console.log(response.data)})
    //     .then(()=>{reset()} )
    //     .catch(err => {console.log(err)})
        
    // }; 


    const viewPoint = () =>{
        if(data){
            const all_key = Object.keys(data)
            const keys = cation ?  ['Stage 1','Stage 2','Stage 3','Stage 4','Stage 5','Stage 6','Stage 7'] : ['Stage 1','Stage 2','Stage 3','Stage 4']
            const keys_f = cation ? ['f1',"f2","f3",'f4','f5','f6','f7'] : ['f1',"f2","f3",'f4']
            const keys_img = cation ? ['img1','img2','img3','img4','img5','img6','img7'] : ['img1','img2','img3','img4']
            return (

                <TableContainer  key={seed}>
                POSTĘP ANALIZY
                <table>
                                    <tbody >
                                        <Tr>{keys.map( (obj, i) => { return(<Th key={i}>{obj}</Th>) })}</Tr>
                                        <tr key={seed+2}>{keys_f.map( (obj: any, i) => { return(<Td key={i}>{data[obj]}</Td>) })}</tr>
                                        <tr key={seed+1}>{keys_img.map( (obj: any, i) => { return(<Td_image key={i}><MyImage style={{display: data[obj]==null? 'none' : 'flex'}}  src={data[obj]}/></Td_image>) })}</tr>
                                    </tbody>
                                </table>

                </TableContainer>
               
            )                 
        }
    } 
    
        return(
        <Container12>
                    <Container> 
                        {viewPoint()}
                    </Container>
        </Container12>)
}


const Th = styled.th`
    border: 1px solid gray;
    justify-content: center;
`

const Tr = styled.tr`
    /* position: -webkit-sticky; // this is for all Safari (Desktop & iOS), not for Chrome */
    position: sticky;
    top: 0;
    z-index: 1; // any positive value, layer order is global
    /* background-color: gray; */
`

const TableContainer = styled.div`
    border: 2px solid gray;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    padding: 5px;
    
`

const Td = styled.td`
    border: 1px solid gray;
    justify-content: center;
    text-align:center; 
`

const Container = styled.div`
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    justify-content: center;
    
`
const Container12 = styled.div`
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    /* overflow-y:scroll; */
    width: 400px;
    /* background-color: grey; */
    
`
 