import styles from "./OptionPick.module.css";
import { GoArrowRight } from "react-icons/go";
import officeLogo from "../../assets/OfficeIcon.svg";
import AgencyIcon from "../../assets/AgencyIcon.svg";
import Consultant from "../../assets/Consultant.svg";
import {useSelector } from 'react-redux'
import { OptionUpdate } from "../../services/apiAuth";
import { useState } from "react";
import Spinner from '../../ui/Spinner'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom';

const options = [
  {
    title: "I'am a Company",
    value:"Company",
    description: "I want to find the best talent for my in-house positions.",
    icon: officeLogo,
  },
  {
    title: "I'm a Recruiting Agency",
    value:"Agency",
    description:
    "We specialize in sourcing candidates for various industries and roles.",
    icon: AgencyIcon,
  },
  {
    title: "I'm a Recruiting Consultant",
    value:"Consultant",
    description:
      "I offer expert HR advice and recruitment services on a contract basis.",
    icon: Consultant,
  },
];


function OptionPick() {
  const[isLoad,setIsLoading] = useState(false)
  const navigate = useNavigate()
  const {user} = useSelector(state => state.user)
  const {email,user_metadata:{full_name}} = user

  async function clickHander({value}) {
    setIsLoading(true)
    try{
      await OptionUpdate({email,value})
      navigate('/companyfetch')
    }
    catch(error){
      toast.error("Something went wrong")
    }
    finally{
      setIsLoading(false)
    }
  }
  return (
    <div className={styles.optionContainer}>

      {
        isLoad?<Spinner/>:<>
        <h3>Hi {full_name}, Welcome to the new era of recruiting.</h3>
      <p>
        Please pick the option that best explains what you&apos;re looking for.
      </p>

      <div className={styles.options}>

      {options.map((option, i) => (
        <div
        key={i}
        className={styles.option}
        onClick={() => clickHander(option)}
        >
          <img src={option.icon} alt="" />
          <div className={styles.textContent}>
            <h4>{option.title}</h4>
            <p>{option.description}</p>
          </div>
          <GoArrowRight size={20} />
        </div>
      ))}
      </div>
      </>
    }
    </div>
  );
}

export default OptionPick;
// `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`
