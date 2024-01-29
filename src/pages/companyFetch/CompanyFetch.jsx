import styles from './CompanyFetch.module.css'
import Button from '../../ui/Button'
import To from '../../ui/To'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import ErrorMessage from '../../ui/ErrorMessage';
import { webUrlUpdate } from '../../services/apiAuth';
import { useState } from 'react';
import {useSelector } from 'react-redux'
import {toast} from 'react-hot-toast'
import Spinner from '../../ui/Spinner';


function CompanyFetch() {

  const[isLoad,setIsLoading] = useState(false)
  const {user:{email}} = useSelector(state => state.user)
    const navigate = useNavigate()
    const {register,handleSubmit,formState} = useForm()
    const {errors} = formState

    async function sumbitHandler({website_url}){
        
        setIsLoading(true)
        try{
          await webUrlUpdate({email,website_url})
          navigate('/profilecreation')
        }
        catch(error){
          toast.error("Something went wrong")
        }
        finally{
          setIsLoading(false)
        }

    }


    return (
    <div className={styles.CompanyFetchContainer}>
      {isLoad?<Spinner/>:
      <>
        <h3>Let&apos;s create your company profile.</h3>

        <p className={styles.subHeading}>Enter your company website URL, and our system will automatically fetch the necessary details to set up your company profile. Let&apos;s dive in!</p>
        <form onSubmit={handleSubmit(sumbitHandler)}>

        <div className={styles.inputContainer}>
          <p>Company Website</p>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="www.yourcompanyname.com"
              id="website_url"
              {...register("website_url", { required: "This field is required" })}
              />
          </div>
          {errors?.website_url?.message && (
            <ErrorMessage>{errors?.website_url?.message}</ErrorMessage>
            )}
        </div>
  

        <div className={styles.btns}>
            <To to={'/optionpick'}>Back</To>
            <div className={styles.left}>
              <Button type={'submit'}>Continue</Button>
            </div>
        </div>
      </form>
            </>
            }
    </div>
    )
}

export default CompanyFetch
