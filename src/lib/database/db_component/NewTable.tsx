import  Axios  from "axios"
import { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import routs from "../server_routs.json"

export const NewTable = ()=>{

    const [show, setShow] = useState(false)
    const [script_flow_data, setScript_flow_data] = useState([])
    const [getData, setGetData] = useState<boolean>(false)
    // const [inputFields, setInputFields] = useState([])


    const [testo, setTesto] = useState(false)
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
         setSeed(Math.random());
     }
    


    const input_name = ['id','symbol','f1','f2','f3','f4','f5','f6','f7']
    const setters = [setID,setSymbol,set1,set2,set3,set4,set5,set6,set7]

   //get data
    useEffect(()=>{Axios.get(routs.script_flow).then( (response: any)=>{setScript_flow_data(response.data); console.log(response.data)} );
    },[])

    useMemo(()=>{
        Axios.get(routs.script_flow).then( (response: any)=>{setScript_flow_data(response.data); console.log(response.data)} )
    },[getData])

// console.log( id,symbol,f1,f2,f3,f4,f5,f6,f7)
    const modify = ( ) => {
        if(modification){ 
            // input_name.map( (obj,i)=>{ console.log(i)
            //                 setters[i](script_flow_data[modification-1][obj])}
            //             )
          
            // setID(script_flow_data[modification-1]['id']);setSymbol(script_flow_data[modification-1]['symbol']);set1(script_flow_data[modification-1]['f1']);set2(script_flow_data[modification-1]['f2']);set3(script_flow_data[modification-1]['f3']);set4(script_flow_data[modification-1]['f4']);set5(script_flow_data[modification-1]['f5']);set6(script_flow_data[modification-1]['f6']);set7(script_flow_data[modification-1]['f7'])
            console.log( id,symbol,f1,f2,f3,f4,f5,f6,f7)

             return(  
        <div >Modyfikacja wersetu: {modification}
            <div >
            {input_name.map( (obj,i)=>{
                // setters[i](script_flow_data[modification-1][obj])
                return(
              <div key={i}>
              <label>{input_name[i]}</label>
              <input defaultValue={script_flow_data[modification-1][obj]} style={{backgroundColor: 'gray'}} type="text" name={input_name[i]}  onChange={ (e)=>{setters[i](e.target.value)} }/>
              </div>
            )})} 
                </div>
                <button onClick={()=>{aaa();setTesto(!testo)}}>Submit data to database</button>
                <button onClick={()=>{setTesto(!testo);console.log( id,symbol,f1,f2,f3,f4,f5,f6,f7)}}>Back</button>
                </div >

               
        )
        }
       
    }

    const aaa = ()=>{
        console.log(id,symbol,f1,f2,f3,f4,f5,f6,f7)
    }


    const test = ()=>{
       setShow(!show)
      }

    


      const send_data_to_db = ()=>{
        Axios.post(routs.post, {id:id,symbol:symbol,f1:f1,f2:f2,f3:f3,f4:f4,f5:f5,f6:f6,f7:f7});
        console.log('niby w')
        Axios.get(routs.script_flow).then( (response: any)=>{setScript_flow_data(response.data)} );
        // window.location.reload() //odswiezanie strony
       
        setGetData(!getData)
        reset()
      };

      const delete_row_from_db = (id: number)=>{
        // Axios.delete(  routs.delete+`/${id}`  ); //przesyłamy tu parametr w adresie !!!!!!!!!!!!!! to nie jest ' tylko `
        
        reset()
        setGetData(!getData)
    }; 


    return(
        <Container2>
          {!testo &&  <Container2>
        {!show && <MojButton onClick={test}>NOWA TABELA</MojButton>}
        {show && <Container2>

            <Container>
                <div key={seed}>
            {input_name.map( (obj,i)=>{return(
              <div key={i}>
              <label>{input_name[i]}</label>
              <input style={{backgroundColor: 'gray'}} type="text" name={input_name[i]}  onChange={ (e)=>{setters[i](e.target.value)} }/>
              </div>
            )})}
                </div>
            <button onClick={send_data_to_db}>Submit data to database</button>
            </Container>
            
            <Container key={seed}>

            <table>
            <tbody>
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
            
        </Container>
        </Container2> }
           
        </Container2>}
        <Container> 
             {testo && modify()}
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