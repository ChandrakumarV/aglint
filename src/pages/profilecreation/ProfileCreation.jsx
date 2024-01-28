import styles from "./ProfileCreation.module.css";
import Button from "../../ui/Button";
import To from "../../ui/To";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import tickMark from '../../assets/tick.svg'
import { useState } from "react";
import ErrorMessage from '../../ui/ErrorMessage';


function ProfileCreation() {
  return (
    <>
    <div className={styles.profileCreationContainer}>
     <h3><img src={tickMark} alt="" /> Company details fetched successfully. Kindly confirm and continue.</h3>
      <Form />

    </div>
    </>
  );
}




function Form() {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const { errors } = formState;
  const [logo,setLogo ] = useState()

  function imgChange(files,isOk){
    if(isOk){
        var url = URL.createObjectURL(files[0])
        setLogo(url)
    }
    else{
        setLogo("https://static.thenounproject.com/png/3069450-200.png")
    }
  }


  async function sumbitHandler(data) {
    console.log(data)
    navigate('/companydetails')
  }


  return (
    <form onSubmit={handleSubmit(sumbitHandler)}>

      
      <div className={`${styles.inputContainer} ${styles.uploadLogo}`}>
        <p>Company Logo</p>
        <div className={styles.inputBox}>
         <img src={logo || "https://images.vexels.com/media/users/3/142789/isolated/preview/2bfb04ad814c4995f0c537c68db5cd0b-multicolor-swirls-circle-logo.png"} alt="" />
            <div className={styles.textContent}>
                <input type="file" accept="image/*" {...register("image" ,{
                    validate:function(value){
                        if(!Object.keys(value).length)
                            return true
                        else{
                            if(value[0]?.size<=1000000){
                                imgChange(value,true)
                                return true
                            }
                            else{
                                
                                imgChange(value,false)
                                return "image less then 1 mb"
                            }
                        }
                    }
                })}/>
                <p>Please upload your logo in PNG/jpeg format with dimensions of 512px x 512px and ensure it&apos;s under 1MB.</p>
            {errors?.image?.message && (
            <ErrorMessage >{errors?.image?.message}</ErrorMessage>
            )}
            </div>
        </div>
      </div>
          

      <div className={styles.inputContainer}>
        <p>Company Name</p>
        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="enter a company name"
            id="company_name"
            {...register("company_name", { required: "This field is required" })}
          />
        </div>
        {errors?.company_name?.message && (
          <ErrorMessage >{errors?.company_name?.message}</ErrorMessage>
        )}
      </div>

      <div className={styles.inputContainer}>
        <p>Employee Size</p>
        <div className={styles.inputBox}>
            
            <select  id="employee_size" className={styles.size} {...register("employee_size", { required: "This field is reqired" })}>
                <option value=""></option>
                <option value="10-20">10-20</option>
                <option value="20-50">20-50</option>
                <option value="50-100">50-100</option>
                <option value="100-500">100-500</option>
            </select>
        </div>
            {errors?.employee_size?.message && (
                <p className={styles.errorElement}>{errors?.employee_size?.message}</p>
                )}
      </div>


      <div className={styles.inputContainer}>
        <p>Industry Type</p>
        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="enter a industry type"
            id="industry_type"
            {...register("industry_type", { required: "This field is required" })}
          />
        </div>
        {errors?.industry_type?.message && (
          <p className={styles.errorElement}>{errors?.industry_type?.message}</p>
        )}
      </div>


      <div className={styles.inputContainer}>
        <p>Phone</p>
        <div className={styles.inputBox}>
            <select name="" id="" className={styles.phone}>
                <option value="">+91</option>
                <option value="">+1</option>
                <option value="">+33</option>
                <option value="">+44</option>
            </select>
          <input
            type="number"
            placeholder="enter a phone number"
            id="email"
            {...register("phone_number", { 
                required: "This field is required",
                minLength:{value : 10,message:"Minimum 10 character"}
            })}
          />
        </div>
        {errors?.phone_number?.message && (
          <p className={styles.errorElement}>{errors?.phone_number?.message}</p>
        )}
      </div>


        <div className={styles.PCbtns}>
        <To to={'/companyfetch'}>Back</To>
        <Button type={"submit"} >Continue</Button>
        </div>
    </form>
  );
}

export default ProfileCreation;
