import styles from './ForgotPassword.module.css'
import Button from '../../ui/Button'
import To from '../../ui/To'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom';
import ErrorMessage from '../../ui/ErrorMessage';
import {useSelector} from 'react-redux';
import Spinner from '../../ui/Spinner';

function ForgotPassword() {
 
    const {register,handleSubmit,formState} = useForm()
    const {errors} = formState
 
    const {isAuth,isLoading} = useSelector(state => state.user)

    if(isLoading) return <Spinner/>
    if(isAuth) return <Navigate replace={true} to="/dashboard"/>
  
    
    async function sumbitHandler(data){
      console.log(data)
    }


    return (
    <div className={styles.ForgotPasswordContainer}>
        <h3>Forgot Password</h3>

        <p className={styles.subHeading}>Enter your email address assosiated with your accont and we&apos;ll send you a link to reset password</p>
        <form onSubmit={handleSubmit(sumbitHandler)}>

        <div className={styles.inputContainer}>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="enter a email"
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
            <ErrorMessage>{errors?.email?.message}</ErrorMessage>
          )}
        </div>
  

           <Button type={'primary'} >Send reset link</Button>
        </form>

         <To to={'/'}>Back to Login</To>

    </div>
    )
}

export default ForgotPassword




