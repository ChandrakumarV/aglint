
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
  console.log("googlele")
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })

  if(error) throw new Error(error)

  return data
}


export async function signup(signupFormData){

    console.log(signupFormData)

    const {email,name,password} = signupFormData

    const { data, error } = await supabase.auth.signUp(
        {
          email: email,
          password: password,
          options: {
            data: {
              full_name: name,
            },
            emailRedirectTo: 'http://localhost:5173/aglint/optionpick'
          }
        }
    )

    console.log("data :",data)
    console.log("error :",error)
    if(error) throw new Error(error.message)
      
      return data
        
}



export async function forgotPassword({email}){

const { data, error } = await supabase.auth.api.resetPasswordForEmail(
  email,
  { redirectTo: 'http://localhost:5173/aglint/updatepassword' }
)

console.log(data,error)
if(error) throw new Error(error)
}


export async function updatePassword({new_password}){

  const { data, error } = await supabase.auth.updateUser({
    password: new_password,
  })
  
    console.log(data,error)
    if(error) throw new Error(error)
}


