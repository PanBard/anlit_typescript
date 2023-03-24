import  Axios  from "axios";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { SERVER_ROUTS } from "lib/database/server_routs";

type Db_push_and_getProps = {
    message: any
}

export const DbPushAndGet: React.FunctionComponent<Db_push_and_getProps> = () => {


    const [data, setData] = useState<any[]>([])
    const [boolean, setBoolean] = useState(false)
    const [key_array,setKey_array] = useState([])
    const [seed, setSeed] = useState(1);
    const reset = () => {
        setSeed(Math.random())
        
    }

    // const [id,setID] = useState<any>()
    // const [f1,set1] = useState<any>()
    // const [f2,set2] = useState<any>()
    // const [f3,set3] = useState<any>()
    // const [f4,set4] = useState<any>()
    // const [f5,set5] = useState<any>()
    // const [f6,set6] = useState<any>()
    // const [f7,set7] = useState<any>()
   
    useEffect(  ()  =>  {
        get_data_from_db()
    },[])

    useMemo(()=>{
      
        // if(data[0]){
        //     input_name =Object.keys(data[0])
        // }

    },[data])

    const divide_analysis_on_done_and_undone = () => {
        const done = []
        const undone = []
    }

    

    const get_data_from_db = () => {
        Axios.get(SERVER_ROUTS.ultimate_analysis.get)
        .then( (response: any)=>{console.log(':)');setData(response.data) })
        .catch((err)=>{console.log('db status :(')})
    }

    const delete_row_from_db = async (id: number)  =>{
      await  Axios.delete(SERVER_ROUTS.ultimate_analysis.delete+`/${id}`)
        .then((response: any)=>{get_data_from_db(),console.log(response.data)})
        .then(()=>{reset()} )
        .catch(err => {console.log(err)})
        
    }; 


    const viewPoint = () =>{
        if(data[0]){
            const keys = Object.keys(data[0]) 
            return (
                <table key={seed}>
                    <tbody >
                        <tr>
                        {keys.map( (obj, i) => { return(<th key={i}>{obj}</th>) })}
                        </tr>

                        {data.map((data: any, index)=>{
                            return (
                            <tr key={index}>  
                            {keys.map( (obj, i) => { return(<Td key={i}>{data[obj]}</Td>) })}
                            <Td style={{cursor:'pointer', background: 'red'}} onClick={ ()=> { delete_row_from_db(data.id)}} >USUŃ </Td>
                            <Td style={{cursor:'pointer', background: 'gray'}}  >MOD </Td>
                            <Td onClick={()=>{console.log('wykorzystać:',data.end)}} style={{cursor:'pointer'}}> {data.end=='end' ? 'ZOBACZ' : 'KONTYNYUJ'} </Td>
                            </tr>)
                            })
                        }
                    </tbody>
                </table>
            )                 
        }
    } 
    

    // const send_data_to_db = async ()=>{
    //     Axios.post(routs.insert_analysis, {id:id,f1:f1,f2:f2,f3:f3,f4:f4,f5:f5,f6:f6,f7:f7});
    //  }


    // const update_data_in_db = (ajdi: any)=>{
    //     Axios.put(routs.update_analysis, {id:ajdi,f1:f1,f2:f2,f3:f3,f4:f4,f5:f5,f6:f6,f7:f7});
    //    console.log('update')
        
    //   };

        return(
        <Container>
            {boolean && 
                <Container>
                    <MojButton onClick={()=>{setBoolean(!boolean)}}>Ukryj panel</MojButton>

                    <Container> 
                        {viewPoint()}
                    </Container>
                    
                </Container> 
            }

           {!boolean && <MojButton onClick={()=>{setBoolean(!boolean)}}>Pokaz poprzednie analizy</MojButton>}
        
        </Container>)
}

// export const whats_up = () => {
//     let dane =  
//     Axios.get(routs.analysis).then( (response: any)=>{console.log('pobrano dane:',response.data);  const dane =  response.data })
    
// }


// export const get_data_from_db = () => {
//     Axios.get(routs.analysis).then( (response: any)=>{console.log('pobrano dane:',response.data);return(response.data) })
// }

const MyImage = styled.img`
width: '100px';
height: '100px';

`

const Td = styled.td`
    border: 1px solid gray;
    justify-content: center;
    
`

const Container = styled.div`
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    
`

const MojButton = styled.button`
    padding: 10px 5px;
    text-align: center;
    border-radius: 8px; 
    background-color: ${({theme})=> theme.colors.primary};
    /* background-color: red; */
    cursor: pointer;
`

const Contr = styled.div`
    /* display: inline-block; */
    display: flex;
    flex-direction: row;
`

const SmallButton = styled.button`
    background-color: gray;
    border: 1px solid red;
    margin-left: 10px;
    cursor: pointer;
`