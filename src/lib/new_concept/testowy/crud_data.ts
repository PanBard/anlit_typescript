import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";


export const db_insert_new_id_and_status_analysis = async (id: number,name:string, variety: string) => {

    if(variety == 'cation'){
        const status = 'new'
        await Axios.post(SERVER_ROUTS.cation_analysis.post, {id:id,name:name,end:status})
        .then(ressponse => {console.log(ressponse.data);return 'ok'})
        .catch(err => console.log('PROBLEM WITH SERVER'))

        await Axios.post(SERVER_ROUTS.cation_analysis_texts.post,{id:id})
        .then(ressponse => {console.log(ressponse.data);return 'ok'})
        .catch(err => console.log('PROBLEM WITH SERVER'))
    }

    if(variety == 'anion'){
        const status = 'new'
        await Axios.post(SERVER_ROUTS.anion_analysis.post, {id:id,name:name,end:status})
        .then(ressponse => {console.log(ressponse.data);return 'ok'})
        .catch(err => console.log('PROBLEM WITH SERVER'))

        await Axios.post(SERVER_ROUTS.anion_analysis_texts.post,{id:id})
        .then(ressponse => {console.log(ressponse.data);return 'ok'})
        .catch(err => console.log('PROBLEM WITH SERVER'))
    }
   

}

export const get_scriptvoice_match_id = async (current:any,phase:any,db_type_name:any) => {
    console.log('current C ===',current)
    console.log('phase C ===',phase)
    console.log('db_type_name C ===',db_type_name)
    console.log('current.f1 C ===',current.f1)

    const returnMatchId = (smt: any) => {
        return smt
    }
    
        let id = ''
    
        if(phase == 1 && typeof phase !== 'undefined') return 'zwracam gdy faza 1'

        if(phase !== 1 && typeof phase !== 'undefined'){
            const prevoiusPhase = 'f'+(phase - 1)
            const prevoiusLabel = current[prevoiusPhase]

            await Axios.put(SERVER_ROUTS.shuffle_match.get,{phase: (phase-1), label: prevoiusLabel, db_type:db_type_name})
            .then((response)=>{
                const data = response.data;
                console.log('Mapowanie w CAT fazie',phase)
                console.log('dane w C ++',data)
                const arr = Object.keys(data);
                console.log('keys w C ++',data)
                for(let i=0; i <= data.length;i++){
                    console.log('Mapowanie w CAT fazie',phase,i)
                    if(phase==2){
                        if(data[i].f1 == current.f1){   
                            console.log('data[i].f1 == current.f1',data[i].f1,' == ',current.f1)
                            id = data[i]['id']
                            return id
                        }}
                        
                    if(phase==3){
                        if(data[i].f1 == current.f1 && data[i].f2 == current.f2){   
                            console.log('data[i].f1 == current.f1',data[i].f1,' == ',current.f1)
                            id = data[i]['id']
                            return id
                        }}

                    if(phase==4){
                        if(data[i].f1 == current.f1 && data[i].f2 == current.f2 && data[i].f3 == current.f3){   
                            console.log('data[i].f1 == current.f1',data[i].f1,' == ',current.f1)
                            id = data[i]['id']
                            return id
                        }}
                        
                    if(phase==5){
                        if(data[i].f1 == current.f1 && data[i].f2 == current.f2 && data[i].f3 == current.f3 && data[i].f4 == current.f4){   
                            console.log('data[i].f1 == current.f1',data[i].f1,' == ',current.f1)
                            id = data[i]['id']
                            return id
                        }}
                        
                    if(phase==6){
                        if(data[i].f1 == current.f1 && data[i].f2 == current.f2 && data[i].f3 == current.f3 && data[i].f4 == current.f4 && data[i].f5 == current.f5){   
                            console.log('data[i].f1 == current.f1',data[i].f1,' == ',current.f1)
                            id = data[i]['id']
                            return id
                        }}

                    if(phase==7){
                        if(data[i].f1 == current.f1 && data[i].f2 == current.f2 && data[i].f3 == current.f3 && data[i].f4 == current.f4 && data[i].f5 == current.f5 && data[i].f6 == current.f6){   
                            console.log('data[i].f1 == current.f1',data[i].f1,' == ',current.f1)
                            id = data[i]['id']
                            return id
                        }}

                    if(phase==8){
                        if(data[i].f1 == current.f1 && data[i].f2 == current.f2 && data[i].f3 == current.f3 && data[i].f4 == current.f4 && data[i].f5 == current.f5 && data[i].f6 == current.f6 && data[i].f7 == current.f7){   
                            console.log('data[i].f1 == current.f1',data[i].f1,' == ',current.f1)
                            id = data[i]['id']
                            return id
                        }}
                    }
                }
                ) 
             console.log('id=============',id)
        }
    }

