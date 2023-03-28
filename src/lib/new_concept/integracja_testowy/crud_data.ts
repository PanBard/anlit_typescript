import  Axios  from "axios";
import { SERVER_ROUTS } from "lib/database/server_routs";


export const db_add_image_id = (id: number) => {
    Axios.post(SERVER_ROUTS.ultimate_analysis.post, {id:id});
    console.log('wyslano id')
}

export const db_put_image = (id: number, pass_image: any) => {
    Axios.put(SERVER_ROUTS.ultimate_analysis.put, {id:id,img1: pass_image});
    console.log('wyslano zdjecie')
}

export const db_get_images = async () => {
    const data: any = await Axios.get(SERVER_ROUTS.ultimate_analysis.get)
    .then( (response: any)=>{  console.log('pobrano zdjecia: ',response.data) ; return response.data});
    return data
}


export const db_insert_new_id_and_status_analysis = async (id: number,name:string) => {
    const status = 'new'
   await Axios.post(SERVER_ROUTS.ultimate_analysis.post, {id:id,name:name,end:status})
    .then(ressponse => {console.log(ressponse.data);return 'ok'})
    .catch(err => console.log('PROBLEM WITH SERVER'))

}


