
import { supabase } from "./supabase";


export async function addNewjob(formData){
    const {job_name,no_emp,location,type,status,user_id} = formData;
    const { error } = await supabase
        .from('jobs')
        .insert([
            { job_name ,no_emp,location,type,status,user_id},
        ])

    if(error)
        throw new Error(error)
}


export async function getJobapi(user_id){
    let { data: jobs, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('user_id', user_id)

    if(error) throw new Error(error)
    return jobs
}
