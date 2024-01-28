import styles from './Signup.module.css'
import googleLogo from '../../assets/googleLogo.png'
import linkedinLogo from '../../assets/linkedinLogo.png'
import Button from '../../ui/Button'
import To from '../../ui/To'
import {  useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiHide, BiShow } from "react-icons/bi";
import {Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux';
import Spinner from '../../ui/Spinner'
import { signup } from '../../services/apiAuth'
import {toast} from 'react-hot-toast'


function Signup() {

  const {isAuth,isLoading} = useSelector(state => state.user) 

  if(isLoading) return <Spinner/>

  if(isAuth) return <Navigate replace={true} to="/dashboard"/>

    return (
    <div className={styles.loginContainer}>
        <h3>Register to Aglint for Employers</h3>
         <div className={styles.signUpIcon}>
                <img src={googleLogo} alt="" />
                <img src={linkedinLogo} alt="" />
        </div>

        <p className={styles.or}>OR</p>

        <Form/>

            <p className={styles.login}>Already have an account? <To to={'/'} >Login now</To></p>
    </div>
    )
}




function Form(){


    const [isShow, setIsShow] = useState(false);
    const [isShowRe, setIsShowRe] = useState(false);
    const { register, handleSubmit, formState ,getValues,reset } = useForm();
    const [isLoad,setIsLoading] = useState(false)

  
    const { errors } = formState;
  
    async function sumbitHandler(data) {
      setIsLoading(true)
      try{
        const res = await signup(data)
        if(res){
          toast.success( `Hi, ${res.user.user_metadata.full_name} please confirm a email`)
          reset();
        }
      }
      catch(error){
        toast.error(error.message)
      }
      finally{
        setIsLoading(false)

      }
        
    }
  
    return (
      <form onSubmit={handleSubmit(sumbitHandler)}>
  
  
        <div className={styles.inputContainer}>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="Enter a name"
              id="name"
              {...register("name", { required: "This field is required" })}
            />
          </div>
          {errors?.name?.message && (
            <p className={styles.errorElement}>{errors?.name?.message}</p>
          )}
        </div>


        <div className={styles.inputContainer}>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="Enter a email"
              id="email"
              {...register("email", { 
                required: "This field is required",
                pattern:{
                  value : /\S+@\S+\.\S+/,
                  message :"please provide a valide email address",
                }
              })}
            />
          </div>
          {errors?.email?.message && (
            <p className={styles.errorElement}>{errors?.email?.message}</p>
          )}
        </div>
  
        <div className={styles.inputContainer}>
          <div className={styles.inputBox}>
            <input
              type={isShow ? "text" : "password"}
              id="password"
              placeholder="Create a password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters ",
                },
              })}
            />
            <span onClick={() => setIsShow((cur) => !cur)}>
              {isShow ? (
                <BiHide size={"2rem"} cursor={"pointer"} />
              ) : (
                <BiShow size={"2rem"} cursor={"pointer"} />
              )}
            </span>
          </div>
          {errors?.password?.message && (
            <p className={styles.errorElement}>{errors?.password?.message}</p>
          )}
        </div>

        
        <div className={styles.inputContainer}>
          <div className={styles.inputBox}>
            <input
              type={isShowRe ? "text" : "password"}
              id="repassword"
              placeholder="Re-enter a password"
              {...register("repassword", {
                required: "This field is required",
                validate: (value)=>value===getValues().password|| "password mismatch",
              })}
            />
            <span onClick={() => setIsShowRe((cur) => !cur)}>
              {isShowRe ? (
                <BiHide size={"2rem"} cursor={"pointer"} />
              ) : (
                <BiShow size={"2rem"} cursor={"pointer"} />
              )}
            </span>
          </div>
          {errors?.repassword?.message && (
            <p className={styles.errorElement}>{errors?.repassword?.message}</p>
          )}
        </div>
  
  
        <Button type={"submit"} style={{width:"100%"}} disabled={isLoad}>{isLoad?"Loading...":"Sign up"}</Button>
      </form>
    )
}

export default Signup
