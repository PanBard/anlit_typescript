import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";

export const db_insert_new_id_and_status_analysis = async (id: number,name:string, variety: string, username: string) => {

    if(variety == 'cation'){
        const status = 'new'
        await Axios.post(SERVER_ROUTS.cation_analysis_result.post, {id:id,name:name,end:status,user_id: username})
        .then(ressponse => {return 'ok'})
        .catch(err => console.log(err))
    }

    if(variety == 'anion'){
        const status = 'new'
        await Axios.post(SERVER_ROUTS.anion_analysis_result.post, {id:id,name:name,end:status,user_id: username})
        .then(ressponse => {            
            return 'ok'})
        .catch(err => console.log(err))
    }   
}


