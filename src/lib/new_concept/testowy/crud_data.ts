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


