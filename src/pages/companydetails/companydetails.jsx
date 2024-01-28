import styles from "./companydetails.module.css";
import Button from "../../ui/Button";
import ashby from "../../assets/ATS-logos/ashby.svg";
import greenhouse from "../../assets/ATS-logos/greenhouse.svg";
import indeed from "../../assets/ATS-logos/indeed.svg";
import leverLogo from "../../assets/ATS-logos/leverLogo.svg";
import To from "../../ui/To";
import { useState } from "react";
import RadioItem from "../../ui/RadioItem";
import {useNavigate} from 'react-router-dom'
import ErrorMessage from "../../ui/ErrorMessage";

const atsList = [
  {
    value: "lever",
    label: "",
    img: leverLogo,
  },

  {
    value: "ashby",
    label: "",
    img: ashby,
  },
  {
    value: "indeed",
    label: "",
    img: indeed,
  },
  {
    value: "greenhouse",
    label: "",
    img: greenhouse,
  },
  {
    value: "Other",
    label: "Other",
    img: null,
  },
  {
    value: "I do not use any ATS system",
    label: "I do not use any ATS system",
    img: null,
  },
];

const mainGoalsList = [
  {
    title: "Sourcing new candidates",
  },
  {
    title: "AI-based candidate screening",
  },
  {
    title: "Filtering candidates",
  },
  {
    title: "All of it",
  },
];



function CompanyDetails() {
  const [ats,setAts] = useState("")
  const [goals,setGoals] = useState([])

  const [ATSerror,setATSerror] = useState(false)
  const [GoalError,setGoalError] = useState(false)
  const navigate = useNavigate()

  async function sumbitHandler(data) {              //get the final data of form
    console.log(data)
    navigate('/Kickstart')
  }
    async function errorCheck(e) {
    e.preventDefault()

    
    if(!ats || !goals.length){
      if(!ats){
        setATSerror("this field is required")
      }
      else{
        setATSerror("")
      }

      if(!goals.length){
        setGoalError("this field is required")
      }
      else{
        setGoalError("")
      }

      return
    }

    else{ 
      let data = {ats,goals}
      sumbitHandler(data);
    }
  }

  function checking(d){
    setGoals(olds=>olds.includes(d)?olds.filter(item=>item!==d):[...olds,d])
  }



  return (
    <div className={styles.CompanyDetailsContainer}>
      <h3>Complete these details to help us get to know you better.</h3>

      <form onSubmit={errorCheck}>
        <div className={styles.firstInputcontainer}>
          <p>Are you currently using any ATS system?</p>
          <div className={styles.inputcontainers}>
            {atsList.map((item, i) => (<RadioItem key={i} item={item} setAts={setAts}/>))}
          </div>
          {ATSerror&&<ErrorMessage>{ATSerror}</ErrorMessage>}
        </div>

        <div className={styles.secondInputcontainer}>
          <p>What&apos;s your main goal for using Aglint?</p>

          <div className={styles.inputcontainers}>
            {mainGoalsList.map((item, i) => (
              <div key={i} className={styles.inputcontainer}>
                <input type="checkbox" id={item.title} value={item.title} onChange={(e)=>checking(e.target.value)}/>
                <label htmlFor={item.title}>{item.title}</label>
              </div>
            ))}
          </div>

            {GoalError&&<ErrorMessage >{GoalError}</ErrorMessage>}
        </div>

        <div className={styles.btns}>
          <To to={"/profilecreation"} style={{fontSize:"1.6rem",textDecoration:"none"}}>Back</To>
          <div className={styles.btnRight}>
            <To to={'/Kickstart'} style={{fontSize:"1.6rem",textDecoration:"none"}}>Skip</To>
            <Button type={"submit"}>Continue</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CompanyDetails;
