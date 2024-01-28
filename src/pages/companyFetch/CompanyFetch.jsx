import styles from './CompanyFetch.module.css'
import Button from '../../ui/Button'
import To from '../../ui/To'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import ErrorMessage from '../../ui/ErrorMessage';


function CompanyFetch() {

    const navigate = useNavigate()
    const {register,handleSubmit,formState} = useForm()
    const {errors} = formState

    function sumbitHandler(data){
        console.log(data)
        navigate('/profilecreation')
    }


    return (
    <div className={styles.CompanyFetchContainer}>
        <h3>Let&apos;s create your company profile.</h3>

        <p className={styles.subHeading}>Enter your company website URL, and our system will automatically fetch the necessary details to set up your company profile. Let&apos;s dive in!</p>
        <form onSubmit={handleSubmit(sumbitHandler)}>

        <div className={styles.inputContainer}>
          <p>Company Website</p>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="www.yourcompanyname.com"
              id="industry_type"
              {...register("industry_type", { required: "This field is required" })}
            />
          </div>
          {errors?.industry_type?.message && (
            <ErrorMessage>{errors?.industry_type?.message}</ErrorMessage>
          )}
        </div>
  

        <div className={styles.btns}>
            <To to={'/optionpick'}>Back</To>
            <div className={styles.left}>
              <Button type={'submit'}>Continue</Button>
            </div>
        </div>
      </form>
    </div>
    )
}

export default CompanyFetch
