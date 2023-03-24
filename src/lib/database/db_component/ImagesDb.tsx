import  Axios  from "axios"
import { images_from_base64 } from "lib/new_concept/testowy/images_from_base64"
import { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { SERVER_ROUTS } from "../server_routs"

type PrzyciskProps = {
    e: any
}   


export const ImagesDb = ()=>{
    const [ernest,setErnesta] = useState(false)
    const [show, setShow] = useState(false)
    const [getData, setGetData] = useState<boolean>(false)
    const [images, setImages] = useState([])
    const [seed, setSeed] = useState(1);
    const [field_names, setField_names] = useState([])
    
    const input_name = ['id','img1','img2','img3','img4','img5','img6','img7']

    const reset = () => {
         setSeed(Math.random())}
    
   //get data
    useEffect(()=>{Axios.get(SERVER_ROUTS.images.get).then( (response: any)=>{setImages(response.data); console.log('images:',response.data)} );},[])

      const update_data_in_db = (ajdi: any)=>{
        // Axios.put(routs.update_script_flow, {id:ajdi,symbol:symbol,f1:f1,f2:f2,f3:f3,f4:f4,f5:f5,f6:f6,f7:f7});
        // Axios.get(routs.script_flow).then( (response: any)=>{setScript_flow_data(response.data)} );
        // window.location.reload() //odswiezanie strony
       console.log('update')
        setGetData(!getData)
        reset()
        
      };
      
      const send_data_to_db = async ()=>{
        const img = images_from_base64.czarny
        const id = 3
        const name = 'czarny'
        // Axios.post(routs.insert_image, {id:id, image:img, name: name});
        // console.log('Wyslane!')
         reset();
      };

      useEffect(()=>{
        send_data_to_db()
      },[])
  
      const delete_row_from_db = (id: number)=>{
        // Axios.delete(  routs.delete+`/${id}`  ); //przesyłamy tu parametr w adresie !!!!!!!!!!!!!! to nie jest ' tylko `
         setGetData(!getData)
        reset()
    }; 

    const mogol = (index: any ) => {
        console.log('selected:',index)
        setErnesta(!ernest)
    }

    
    return(
        <Container2>
                {/* {images.map((img:any, index)=>{
                    console.log(img)
                     return(<MyImage e={ernest} onClick={()=>{mogol(index)}} key={index} src={img.img}></MyImage>)
                })} */}

                <TableContainer key={seed}>
                <table >
                <tbody >
                        <tr>
                            {input_name.map( (obj, i) => { return(<th key={i}>{obj}</th>) })}

                        </tr>
                        {images.map((data: any, index)=>{
                            return (
                            <tr key={index}>

                                <Td>{data.iddetected_images}  </Td>
                                <Td>{data.name}  </Td>
                                <Td><MyImage e={ernest} onClick={()=>{mogol(index)}} key={index} src={data.img}></MyImage></Td>
                                <Td style={{cursor:'pointer', background: 'red'}} onClick={ ()=> { delete_row_from_db(data.idanalysis)}}>USUŃ </Td>
                                {/* <Td style={{cursor:'pointer', background: 'gray'}} onClick={()=>{setTesto(true);setModification(data.idanalysis)}} >MOD </Td> */}
                            
                            </tr>)})
                        }
                </tbody>
                </table>
                </TableContainer>
        </Container2>
    )

}

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
const MyImage = styled.img<PrzyciskProps>`
width: ${({e}) => e ? '300px' :  '100px'};
height: ${({e}) => e ? '300px' :  '100px'};
`
const Container2 = styled.div`
    color: ${({theme}) => theme.colors.typography};
    display: flex;
    flex-direction: column;    
`
const Td = styled.td`
    border: 1px solid gray;
    justify-content: center;
    
`




const TableContainer = styled.div`
    
`






const Zas = styled.div`

    display: flex;
    flex-direction: row;
    flex: 1;
    
`