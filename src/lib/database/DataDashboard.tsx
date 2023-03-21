import  Axios  from "axios"
import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { NewTable } from "./db_component/NewTable"
import routs from "./server_routs.json"



export const DataDashboard: React.FunctionComponent = () => {
    
    const [dane, setDane] = useState([])
    const [tables, setTables] = useState([])
    const [show, setShow] = useState(false)

    useEffect(()=>{
        // Axios.get(routs.get).
        // then((response: any)=>{setDane(response.data)} )
        Axios.get(routs.viev_all_tables,).
        then((response: any)=>{ setTables(response.data) } )

      }, [])

     
      
      const make_new_table = ()=>{
        Axios.get(routs.create_new_table,).
        then((response: any)=>{console.log(response.data)} )
      }

      const test = ()=>{
        Axios.get(routs.viev_all_tables,).
        then((response: any)=>{
                console.log('Tabele: ---------------')
                response.data.map((kop: any)=> console.log(kop.Tables_in_zobaczymy))
                console.log('       ---------------')
            } )
      }
      
   
        if(dane[0]){ console.log('baza dziala')}
        else(console.log('baza nie dziala'))
    
     

    return(
        <Container>
            <NewTable/>
          
            {/* <MojButton onClick={test}>TEST</MojButton>
           <MojButton onClick={make_new_table}>Nowa tabela</MojButton>
                <div>TABELE</div>
                {tables.map((dane: any, index: number)=> <div key={index}>{dane.Tables_in_zobaczymy}</div>)} */}

                {/* <div>ZAwartosc</div>
                {dane.map((dane: any, index: number)=> <div key={index}>{dane.task_id} {dane.description}</div>)} */}

        </Container>
        
    )
}


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