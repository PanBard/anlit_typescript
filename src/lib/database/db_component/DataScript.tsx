import  Axios  from "axios"
import { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { SERVER_ROUTS } from "../server_routs" 

export const DataScript = ()=>{

    const [show, setShow] = useState(false)
    const [script_flow_data, setScript_flow_data] = useState([])
    const [getData, setGetData] = useState<boolean>(false)
    // const [inputFields, setInputFields] = useState([])


    const [showModyf, setTesto] = useState(false)
    const [modification, setModification] = useState<any>()

    const [id,setID] = useState<any>()
    const [symbol,setSymbol] = useState<any>()
    const [f1,set1] = useState<any>()
    const [f2,set2] = useState<any>()
    const [f3,set3] = useState<any>()
    const [f4,set4] = useState<any>()
    const [f5,set5] = useState<any>()
    const [f6,set6] = useState<any>()
    const [f7,set7] = useState<any>()
   
    const [seed, setSeed] = useState(1);

    const reset = () => {
         setSeed(Math.random())
         
     }
    

    const variable = [id,symbol,f1,f2,f3,f4,f5,f6,f7]
    const input_name = ['id','symbol','f1','f2','f3','f4','f5','f6','f7']
    const setters = [setID,setSymbol,set1,set2,set3,set4,set5,set6,set7]

   //get data
    useEffect(()=>{Axios.get(SERVER_ROUTS.script_flow.script_flow).then( (response: any)=>{setScript_flow_data(response.data); } );
    },[])

    useMemo(()=>{
        Axios.get(SERVER_ROUTS.script_flow.script_flow).then( (response: any)=>{setScript_flow_data(response.data);} )
    },[getData])

// console.log( id,symbol,f1,f2,f3,f4,f5,f6,f7)
    const modify = ( ) => {
        if(modification){ 
             return(  
        <div >Modyfikacja wersetu nr: {modification} 
            <div >
            {input_name.map( (obj,i)=>{
                // setters[i](script_flow_data[modification-1][obj])
                return(
              <div key={i}>
              <label>{input_name[i]}</label>
              <input onClick={()=>{setters[i](script_flow_data[modification-1][obj]); }} defaultValue={script_flow_data[modification-1][obj]} style={{backgroundColor: 'gray'}} type="text" name={input_name[i]}  onChange={ (e)=>{setters[i](e.target.value)} }/>
              {/* <input defaultValue={script_flow_data[modification-1][obj]} style={{backgroundColor: 'gray'}} type="text" name={input_name[i]}  onChange={ (e)=>{setters[i](e.target.value)} }/> */}
              </div>
            )})} 
                </div>
                <button onClick={()=>{setTesto(!showModyf); update_data_in_db(modification); reset()}}>Update data</button>
                <button onClick={()=>{setTesto(!showModyf)}}>Back</button>
                </div >

               
        )
        }
       
    }

   


    const test = ()=>{
       setShow(!show)
      }

      const update_data_in_db = (ajdi: any)=>{
        Axios.put(SERVER_ROUTS.script_flow.update_script_flow, {id:ajdi,symbol:symbol,f1:f1,f2:f2,f3:f3,f4:f4,f5:f5,f6:f6,f7:f7});
        Axios.get(SERVER_ROUTS.script_flow.script_flow).then( (response: any)=>{setScript_flow_data(response.data)} );
        // window.location.reload() //odswiezanie strony
       console.log('update')
        setGetData(!getData)
        reset()
        setters.map((set)=>{
            set(undefined)
        })
        
      };
    
      

      const send_data_to_db = async ()=>{
        Axios.post(SERVER_ROUTS.script_flow.insert_script_flow, {id:id,symbol:symbol,f1:f1,f2:f2,f3:f3,f4:f4,f5:f5,f6:f6,f7:f7});
      
        Axios.get(SERVER_ROUTS.script_flow.script_flow).then( (response: any)=>{setScript_flow_data(response.data)} );
        // window.location.reload() //odswiezanie strony
       
        setGetData(!getData);   
       
        setters.map((set)=>{
            set(undefined)
        
        })

        console.log('Zmodyfikowano')
         reset();
      };

      const delete_row_from_db = (id: number)=>{
        // Axios.delete(  SERVER_ROUTS.script_flow.delete_script_flow+`/${id}`  ); //przesyłamy tu parametr w adresie !!!!!!!!!!!!!! to nie jest ' tylko `
         setGetData(!getData)
        reset()
       
    }; 


    return(
        <Container2>
          {!showModyf &&  <Container2>
        {!show && <MojButton onClick={test}>DataSkrypt</MojButton>}
        {show && <Container2>

            <Container  key={seed+1}>
                <div>
            {input_name.map( (obj,i)=>{return(
              <div key={i}>
              <label>{input_name[i]}</label>
              <input style={{backgroundColor: 'gray'}} type="text" name={input_name[i]}  onChange={ (e)=>{setters[i](e.target.value)} }/>
              </div>
            )})}
                </div>
            <button onClick={send_data_to_db}>Submit data to database</button>
            </Container>
            
            <TableContainer key={seed}>

            <table >
            <tbody >
                    <tr>
                        {input_name.map( (obj, i) => { return(<th key={i}>{obj}</th>) })}

                    </tr>

                    {script_flow_data.map((data: any)=>{
                        return (
                        <tr key={data.id}>
                            <Td>{data.id}  </Td>
                            <Td>{data.symbol}  </Td>
                            <Td>{data.f1}  </Td>
                            <Td>{data.f2}  </Td>
                            <Td>{data.f3}  </Td>
                            <Td>{data.f4}  </Td>
                            <Td>{data.f5}  </Td>
                            <Td>{data.f6}  </Td>
                            <Td>{data.f7}  </Td>
                            <Td style={{cursor:'pointer', background: 'red'}} onClick={ ()=> { delete_row_from_db(data.id)}}>USUŃ </Td>
                            <Td style={{cursor:'pointer', background: 'gray'}} onClick={()=>{setTesto(true);setModification(data.id)}} >MOD </Td>
                           
                        </tr>)})
                    }

            </tbody>
            </table>
            
        </TableContainer>
        </Container2> }
           
        </Container2>}
            <Container> 
                {showModyf && modify()}
            </Container>  
        </Container2>
    )

}

const Td = styled.td`
    border: 1px solid gray;
    justify-content: center;
    
`

const MojButton = styled.button`
    padding: 10px 5px;
    width: 150px;
    height: 40px;
    text-align: center;
    border-radius: 8px; 
    background-color: ${({theme})=> theme.colors.primary};
    /* background-color: red; */
    cursor: pointer;
`

const Container = styled.div`
    /* color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;
    flex: 1; */
    
`
const TableContainer = styled.div`
    
`




const Container2 = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;

    
`

const Zas = styled.div`

    display: flex;
    flex-direction: row;
    flex: 1;
    
`