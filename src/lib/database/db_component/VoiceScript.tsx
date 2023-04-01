import  Axios  from "axios"
import { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { SERVER_ROUTS } from "../server_routs" 
import { BestButton, ContainerP, TableContainer } from "lib/components/components_modules"

export const VoiceScript = ()=>{
    const [hide, setHide] =  useState<boolean>(false)
    const [show, setShow] = useState(false)
    const [script_flow_data, setScript_flow_data] = useState([])
    const [getData, setGetData] = useState<boolean>(false)
    // const [inputFields, setInputFields] = useState([])


    const [showModyf, setTesto] = useState(false)
    const [modification, setModification] = useState<any>()

    const [id,setID] = useState<any>()
    const [script,setScript] = useState<any>()
    const [phase,setPhase] = useState<any>()
    const [f6,set6] = useState<any>()
    const [f7,set7] = useState<any>()
    const [match_id,setMatch_id] = useState<any>()
    const [seed, setSeed] = useState(1);
    const [choosen_mode, setChoosen_mode] = useState('start')

    const reset = () => {
         setSeed(Math.random())
     }

    
    

    const variable = [id,phase,f6,f7,match_id,script]
    const input_name = ['id','phase','f6','f7','match_id','script']
    const setters = [setID,setPhase,set6,set7,setMatch_id,setScript]
    
   //get data
    useEffect(  ()  =>  {
        get_data_from_db()
    },[])

    const get_data_from_db = async () => {
        await  Axios.get(SERVER_ROUTS.anion_voice_script.get)
        .then( (response: any)=>{console.log(':)');setScript_flow_data(response.data) })
        .catch((err)=>{console.log('db status :(')})
    }

    const setuj =async ( id: any) => {
        const data = script_flow_data[id-1]
        setters.map((set,index)=>{set(data[input_name[index]])})
        setModification(id)
    }

    

   


    const test = ()=>{
       setShow(!show)
      }

      const update_data_in_db = (ajdi: any)=>{
        Axios.put(SERVER_ROUTS.anion_voice_script.put, {id:ajdi,phase:phase,script:script,f6:f6,f7:f7,match_id:match_id})
        .then((response: any)=>{get_data_from_db(),console.log(response.data)})
        .then(()=>{reset()})
        .then(()=>{ setters.map((set)=>{set(undefined)}) })
        .catch(err => {console.log(err)})
       
       
        };
    
      const send_data_to_db = async ()=>{
        Axios.post(SERVER_ROUTS.anion_voice_script.post, {id:id,phase:phase,script:script,f6:f6,f7:f7,match_id:match_id})
        .then((response: any)=>{get_data_from_db(),console.log(response.data)})
        .then(()=>{reset()} )
        .then(()=>{ setters.map((set)=>{set(undefined)}) })
        .catch(err => {console.log(err)})
        
        setters.map((set)=>{set(undefined)})

      };

      const delete_row_from_db = (id: number)=>{
        // Axios.delete(  SERVER_ROUTS.anion_voice_script.delete+`/${id}`  )
        // .then((response: any)=>{get_data_from_db(),console.log(response.data)})
        // .then(()=>{reset()} )
        // .catch(err => {console.log(err)})
    }; 

    const modify = ( ) => {
        if(modification){ 
            // setuj().then(()=>{console.log('madafaka')})
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
        )}
}


    
    const showComponent = ()=>{

        if(choosen_mode=='start'){
            return( 
                <Container>
                    <Container>Analizy Kationów</Container>
                    <TableContainer key={seed}>
                    <table >
                    <tbody >
                            <Tr>
                                {input_name.map( (obj, i) => { return(<Th key={i}>{obj}</Th>) })}
                            </Tr>
                            {script_flow_data.slice(0).reverse().map((data: any)=>{
                                return (
                                <tr key={data.id}>
                                    {input_name.map( (obj, i) => { return(<Td key={i}>{data[obj]}</Td>) })}
                                    {!hide && <Td_container style={{cursor:'pointer'}}  onClick={()=>{setHide(true)}} >...</Td_container>}
                                     {hide &&<Td_del_button onClick={ ()=> { delete_row_from_db(data.id)}} >Usuń</Td_del_button> } 
                                    {hide && <Td_mod_button onClick={ ()=> { setTesto(true);setuj(data.id)}} >MOD</Td_mod_button>  }
                                </tr>)})
                            }
                    </tbody>
                    </table>
                    
                </TableContainer>
                </Container>
                 
                )
        }

        if(choosen_mode=='add'){
            return(
                <Container  key={seed+1}>
                <div>
            {input_name.map( (obj,i)=>{return(
              <div key={i}>
              <label>{input_name[i]}</label>
              <input style={{backgroundColor: 'gray'}} type="text" name={input_name[i]}  onChange={ (e)=>{setters[i](e.target.value);console.log(e.target.value)} }/>
              </div>
            )})}
                </div>
            <button onClick={()=>{send_data_to_db();console.log('powinnocoswyslac')}}>Submit data to database</button>
            <button onClick={()=>{setChoosen_mode('start')}}>back</button>
            </Container>
            )

        }


        if(choosen_mode=='modify'){
            
        }






     }
     
    



     
     
    

    return(
        <ContainerP key={seed}>
            <Container>
                <BestButton style={{display: choosen_mode=='start' ? 'block' :'none' }} onClick={()=>{setChoosen_mode('add')}}>Add</BestButton>
                <BestButton style={{display: choosen_mode=='start' ? 'none' : 'block'}} onClick={()=>{setChoosen_mode('start')}}>Table</BestButton>
            </Container>
            {showComponent()}
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
const Td_mod_button = styled.td`
    border: 1px solid gray;
    cursor: pointer;
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






