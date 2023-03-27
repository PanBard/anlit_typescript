import  Axios  from "axios";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { SERVER_ROUTS } from "lib/database/server_routs";

type LiveChangeWatchProps = {
    message: any
}

export const LiveChangeWatch: React.FunctionComponent<LiveChangeWatchProps> = () => {


    const [data, setData] = useState<any[]>([])
    const [boolean, setBoolean] = useState(false)
    const [key_array,setKey_array] = useState([])
    const [seed, setSeed] = useState(1);
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
            const keys_f = ['id','name','f1',"f2","f3",'f4','f5','f6','f7']
            const keys_img = ['img1','img2','img3','img4','img5','img6','img7']
            return (
                <table key={seed}>
                    <tbody >
                        <tr>
                        {keys.map( (obj, i) => { return(<th key={i}>{obj}</th>) })}
                        </tr>

                        {data.map((data: any, index)=>{
                            return (
                            <tr key={index}>  
                            {keys_f.map( (obj, i) => { return(<Td key={i}>{data[obj]}</Td>) })}
                            {keys_img.map( (obj, i) => { return( <Td key={i}><MyImage  src={data[obj]}/></Td>) })}
                            
                            <Td key={index}>{data['end']}</Td>
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
    

  
        return(
        <Container12>
                    <Container> 
                        {viewPoint()}
                    </Container>
        </Container12>)
}



const MyImage = styled.img`
width: 50px;
height: 50px;
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
const Container12 = styled.div`
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    /* overflow-y:scroll; */
    
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