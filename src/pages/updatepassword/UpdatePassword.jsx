import styles from './UpdatePassword.module.css'
import Button from '../../ui/Button'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import To from '../../ui/To';
import { updatePassword } from '../../services/apiAuth';
import {toast} from 'react-hot-toast'
import { useState } from 'react';

function UpdatePassword() {

  const [isLoad,setIsLoad] = useState(false)
    const navigate = useNavigate()
    
    const {register,handleSubmit,formState,reset} = useForm()
    const {errors} = formState
    
    
    async function sumbitHandler(data){
      setIsLoad(true)
      try{
        
        await updatePassword(data)
        toast.success("Password update successfully")
        reset()
        setTimeout(() => {
          navigate('/dashboard')
        }, 1500);
      }
      catch(error){
        toast.error(error.message)
      }
      finally{
        setIsLoad(false)
      }
    }


    return (
    <div className={styles.updatePasswordContainer}>
        <h3>Update Password</h3>

        <p className={styles.subHeading}>Enter your email address assosiated with your accont and we&apos;ll send you a link to reset password</p>

        <form onSubmit={handleSubmit(sumbitHandler)}>


        <div className={styles.inputContainer}>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="Enter new password"
              id="new_password"
              {...register("new_password", { 
                required: "This field is required",
                minLength:{
                  value : 8,
                  message:"minimum 8 character required"
                }
               })}
            />
          </div>
          {errors?.new_password?.message && (
            <p className={styles.errorElement}>{errors?.new_password?.message}</p>
          )}
        </div>
  

           <Button type={'primary'} disabled={isLoad}>{isLoad?"Updating...":"update password"}</Button>
        </form>

         <To to={'/'}>Back to Dashboard</To>

    </div>
    )
}

export default UpdatePassword
