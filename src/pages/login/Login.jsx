import styles from "./Login.module.css";
import googleLogo from "../../assets/googleLogo.png";
import linkedinLogo from "../../assets/linkedinLogo.png";
import Button from "../../ui/Button";
import To from "../../ui/To";
import { useForm } from "react-hook-form";
import {  useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Navigate,useNavigate } from "react-router-dom";
import ErrorMessage from '../../ui/ErrorMessage';
import {useSelector} from 'react-redux';
import { loginUser } from "../../services/apiAuth";
import {toast} from 'react-hot-toast';
import { setAuthTrue } from "../../Slices/user";
import { useDispatch } from 'react-redux'
import Spinner from '../../ui/FullSpinner'
function Login() {
  const navigate =  useNavigate()
  const {isAuth,isLoading} = useSelector(state => state.user)

  if(isLoading) return <Spinner/>
  if(isAuth) return <Navigate replace={true} to="/dashboard"/>

  async function googleHandler(){
    navigate('/dashboard')
  }

  return (
    <div className={styles.loginContainer}>
      <h3>Login to Aglint for Employers</h3>
      <div className={styles.signUpIcon}>
        <img src={googleLogo} alt="" onClick={googleHandler}/>
        <img src={linkedinLogo} alt="" />
      </div>

      <p className={styles.or}>OR</p>

      <Form />

      <div className={styles.signupForgot}>
        <p className={styles.signup}>
          Don&apos;t have an account? <To to={"/signup"}>Sign up now</To>
        </p>
        <To to={"/forgotpassword"}>Forgot Password</To>
      </div>
    </div>
  );
}

function Form() {
  const [isShow, setIsShow] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const dispatch = useDispatch()
  const [isLoad,setIsLoad] = useState(false)

  
  async function formSumbitHandler(data) {

    setIsLoad(true)
    try{
      const user = await  loginUser(data)
      if(user)
      dispatch(setAuthTrue(user))
  }
  catch(error){
    toast.error(error.message)
  }
  finally{
    setIsLoad(false)
    }
  }


  return (
    <form onSubmit={handleSubmit(formSumbitHandler)}>
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

      <div className={styles.inputContainer}>
        <div className={styles.inputBox}>
          <input
            type={isShow ? "text" : "password"}
            id="password"
            placeholder="enter a password"
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
          <ErrorMessage>{errors?.password?.message}</ErrorMessage>
        )}
      </div>

      <Button type={"submit"} style={{width:"100%"}} disabled={isLoad}>{isLoad?"Loading...":"Login"}</Button>
    </form>
  );
}

export default Login;
