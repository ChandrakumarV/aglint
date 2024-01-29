
import { supabase } from "./supabase"

export async function loginUser(formData){

    let { data ,error} = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })

      if(error) throw new Error(error.message)
      
      return data?.user
}


export async function getCurrentUser(){

    const { data:session } = await supabase.auth.getSession() ;

    if(!session.session) return null;

    
    const { data,error } = await supabase.auth.getUser()
    if(error)throw new Error(error.message)

    return data?.user;
}



export async function logout(){
    let { error } = await supabase.auth.signOut()
    if(error)throw new Error(error.message)
}

export async function signUpWithGoogle(){
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })

  if(error) throw new Error(error)

  return data
}


export async function signup(signupFormData){

    const {email,name,password} = signupFormData

    const { data, error } = await supabase.auth.signUp(
        {
          email: email,
          password: password,
          options: {
            data: {
              full_name: name,
            },
            emailRedirectTo: `${window.location.origin}/`
          }
        }
    )

    if(error) throw new Error(error.message)
      
      return data
        
}



export async function forgotPassword({email}){

const {  error } = await supabase.auth.resetPasswordForEmail(
  email,{ redirectTo:  `${window.location.origin}/` }
)

if(error) throw new Error(error)
}


export async function updatePassword({new_password}){

  const {  error } = await supabase.auth.updateUser({
    password: new_password,
  })
  
    if(error) throw new Error(error)
}



export async function OptionUpdate({email,value}){
  const { error } = await supabase
  .from('profile')
  .update({ option : value })
  .eq('email', email)

  if(error) throw new Error(error)
}

export async function webUrlUpdate({email,website_url}){
  const { error } = await supabase
  .from('profile')
  .update({ website_url : website_url })
  .eq('email', email)

  if(error) throw new Error(error)
}

export async function companyProfileUpdate({company_name,no_emp,industry_type,phone,email}){

  const { error } = await supabase
  .from('profile')
  .update({ company_name,no_emp,industry_type,phone })
  .eq('email', email)

  if(error) throw new Error(error)
}



export async function atsMainUpdate({ats,goals,email}){

  const { error } = await supabase
  .from('profile')
  .update({ats_system:ats,goals})
  .eq('email', email)

  if(error) throw new Error(error)
}

export async function profileCompleted(email){


  const { error } = await supabase
  .from('profile')
  .update({is_profile_complete:1})
  .eq('email', email)

  if(error) throw new Error(error)
}

export async function getProfile(email){

  let { data: profile, error } = await supabase
  .from('profile')
  .select('*')
  .eq('email', email)

  if(error) throw new Error(error)

  return profile
}