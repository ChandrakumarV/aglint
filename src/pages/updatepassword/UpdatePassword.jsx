import styles from './UpdatePassword.module.css'
import Button from '../../ui/Button'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import To from '../../ui/To';


function UpdatePassword() {

    const navigate = useNavigate()

    const {register,handleSubmit,formState} = useForm()
    const {errors} = formState


    async function sumbitHandler(data){
      console.log(data)
      navigate('/dashboard')
    }


    return (
    <div className={styles.updatePasswordContainer}>
        <h3>Update Password</h3>

        <p className={styles.subHeading}>Enter your email address assosiated with your accont and we&apos;ll send you a link to reset password</p>

        <form onSubmit={handleSubmit(sumbitHandler)}>

            {/* <div className={styles.inputContainer}>
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
              <p className={styles.errorElement}>{errors?.email?.message}</p>
            )}
          </div> */}


        <div className={styles.inputContainer}>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="New password"
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
  

           <Button type={'primary'}>update password</Button>
        </form>

         <To to={'/'}>Back to Dashboard</To>

    </div>
    )
}

export default UpdatePassword
