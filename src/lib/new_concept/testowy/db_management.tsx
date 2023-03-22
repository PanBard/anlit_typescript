import  Axios  from "axios";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import routs from '../../database/server_routs.json'

type Db_push_and_getProps = {
    message: any
}

export const DbPushAndGet: React.FunctionComponent<Db_push_and_getProps> = () => {


    const [data, setData] = useState<any[]>([])
    const [boolean, setBoolean] = useState(false)
    const [key_array,setKey_array] = useState([])
 


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
        Axios.get(routs.analysis)
        .then( (response: any)=>{console.log(':)');setData(response.data) })
        .catch(()=>{console.log('db status :(')})
    }


    const viewPoint = () =>{
        if(data[0]){
            const keys = Object.keys(data[0]) 
            return(
                            data.map((obj: any, index: number)=>{ return( 
                                        <Contr key={index}> 
                                            <div > Analiza nr: {index+1} - { obj.end ? 'ZAKOŃCZONY' : 'nie' }  </div> 
                                            <SmallButton onClick={()=>{console.log('wykorzystać:',obj.end)}} style={{}}> {obj.end ? 'ZOBACZ' : 'KONTYNYUJ'} </SmallButton>
                                        </Contr>
                                    ) 
                        })
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
`