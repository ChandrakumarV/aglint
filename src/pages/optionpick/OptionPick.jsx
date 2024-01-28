import styles from "./OptionPick.module.css";
import { GoArrowRight } from "react-icons/go";
import officeLogo from "../../assets/OfficeIcon.svg";
import AgencyIcon from "../../assets/AgencyIcon.svg";
import Consultant from "../../assets/Consultant.svg";
import {useNavigate} from 'react-router-dom';

const options = [
  {
    title: "I'am a Company",
    description: "I want to find the best talent for my in-house positions.",
    icon: officeLogo,
  },
  {
    title: "I'm a Recruiting Agency",
    description:
      "We specialize in sourcing candidates for various industries and roles.",
    icon: AgencyIcon,
  },
  {
    title: "I'm a Recruiting Consultant",
    description:
      "I offer expert HR advice and recruitment services on a contract basis.",
    icon: Consultant,
  },
];


function OptionPick() {
  const navigate = useNavigate()
  function clickHander(option) {
    console.log("option :",option);
    navigate('/companyfetch')
  }


  console.log("optionpick")
  return (
    <div className={styles.optionContainer}>
      <h3>Hi Alex, Welcome to the new era of recruiting.</h3>
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
    </div>
  );
}

export default OptionPick;
// `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`
