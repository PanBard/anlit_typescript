import  Axios  from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { SERVER_ROUTS } from "../server_routs" 

export const TestImages = ()=>{

    const [show, setShow] = useState(false)
    const [script_flow_data, setScript_flow_data] = useState([])
    const [getData, setGetData] = useState<boolean>(false)
    // const [inputFields, setInputFields] = useState([])


    const [showModyf, setTesto] = useState(false)
    const [modification, setModification] = useState<any>()

    const [id,setID] = useState<any>()
    const [script,setScript] = useState<any>()
    const [phase,setPhase] = useState<any>()
    const [f1,set1] = useState<any>()
    const [f2,set2] = useState<any>()
    const [f3,set3] = useState<any>()
    const [f4,set4] = useState<any>()
    const [f5,set5] = useState<any>()
    const [f6,set6] = useState<any>()
    const [f7,set7] = useState<any>()
    const [img,setImg] = useState<any>()
    const [label,setLabel] = useState<any>()
    const [match_id,setMatch_id] = useState<any>()
    const [seed, setSeed] = useState(1);

    const reset = () => {
         setSeed(Math.random())
         
     }
    

    const variable = [id,img,label]
    const input_name = ['id','img','label']
    const setters = [setID,setImg,setLabel]

   //get data
    useEffect(  ()  =>  {
        get_data_from_db()
        
    //   custom_send_data_to_db()
    },[])

    const get_data_from_db = () => {
        Axios.get(SERVER_ROUTS.test_images.get)
        .then( (response: any)=>{console.log(':)');setScript_flow_data(response.data) })
        .catch((err)=>{console.log('db status :(')})
    }

    const setuj =async ( id: any) => {
        const data = script_flow_data[id-1]
        setters.map((set,index)=>{set(data[input_name[index]])})
        setModification(id)
    }

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

               
        )
        }
       
    }

   


    const test = ()=>{
       setShow(!show)
      }

      const update_data_in_db = (ajdi: any)=>{
        Axios.put(SERVER_ROUTS.test_images.put, {id:ajdi,img:img,label:label})
        .then((response: any)=>{get_data_from_db(),console.log(response.data)})
        .then(()=>{reset()})
        .then(()=>{ setters.map((set)=>{set(undefined)}) })
        .catch(err => {console.log(err)})
       
       
        };
    
      const send_data_to_db = async ()=>{
        Axios.post(SERVER_ROUTS.test_images.post, {id:id,img:img,label:label})
        .then((response: any)=>{get_data_from_db(),console.log(response.data)})
        .then(()=>{reset()} )
        .then(()=>{ setters.map((set)=>{set(undefined)}) })
        .catch(err => {console.log(err)})
        
        setters.map((set)=>{set(undefined)})

      };


      const custom_img = 'op';
      const custom_send_data_to_db = async ()=>{
        Axios.post(SERVER_ROUTS.test_images.post, {id:1,img:custom_img,label:0})
        .then((response: any)=>{get_data_from_db(),console.log(response.data)})
        .then(()=>{reset()} )
        .then(()=>{ setters.map((set)=>{set(undefined)}) })
        .catch(err => {console.log(err)})
        
        setters.map((set)=>{set(undefined)})

      };


      const delete_row_from_db = (id: number)=>{
        Axios.delete(  SERVER_ROUTS.test_images.delete+`/${id}`  )
        .then((response: any)=>{get_data_from_db(),console.log(response.data)})
        .then(()=>{reset()} )
        .catch(err => {console.log(err)})
    }; 


    return(
        <Container2>
          {!showModyf &&  <Container2>
        {/* {!show && <MojButton onClick={test}>OPEN voice Script</MojButton>} */}
         <Container2>

            <Container  key={seed+1}>
                
            {input_name.map( (obj,i)=>{return(
              <div key={i}>
              <label>{input_name[i]}</label>
              <input style={{backgroundColor: 'gray'}} type="text" name={input_name[i]}  onChange={ (e)=>{setters[i](e.target.value)} }/>
              </div>
            )})}
             
            <button onClick={send_data_to_db}>Submit data to database</button>
            </Container>
            
            <TableContainer key={seed}>

            <table >
            <tbody >
                    <tr>
                        {input_name.map( (obj, i) => { return(<th key={i}>{obj}</th>) })}

                    </tr>

                    {script_flow_data.slice(0).reverse().map((data: any)=>{
                        return (
                        <tr key={data.id}>
                            <Td>{data.id} </Td>
                            <Td><MyImage  src={data.img}/></Td>
                            <Td>{data.label} </Td>
                            <Td style={{cursor:'pointer', background: 'red'}} onClick={ ()=> { delete_row_from_db(data.id)}}>USUŃ </Td>
                            <Td style={{cursor:'pointer', background: 'gray'}} onClick={()=>{setTesto(true);setuj(data.id)}} >MOD </Td>
                           
                        </tr>)})
                    }

            </tbody>
            </table>
            
        </TableContainer>
        </Container2> 
           
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
    height: 260px;
    overflow-y: scroll;
`

const MyImage = styled.img`
width: 50px;
height: 50px;
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