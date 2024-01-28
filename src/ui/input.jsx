import PropTypes from "prop-types";
import styles from "./input.module.css";
import { BiHide,BiShow  } from "react-icons/bi";
import {useState} from 'react'
// import { useState } from "react";

export default function Input({ type, placeholder }) {
  const [isShow, setIsShow] = useState(false);

  if (type === "text")
    return (
      <div className={styles.inputContainer}>
        <input type={type} placeholder={placeholder} />
      </div>
    );

  if (type === "email")
    return (
      <div className={styles.inputContainer}>
        <input type={type} placeholder={placeholder} />
      </div>
    );


  if (type === "password")
    return (
      <div className={styles.inputContainer}>
        <input type={isShow?"text":type} placeholder={placeholder} />
       <span onClick={()=>setIsShow(cur=>!cur)}>
        {isShow?<BiHide size={"2rem"} cursor={"pointer"}/>:<BiShow size={"2rem"} cursor={"pointer"} />}
        </span>
        
      </div>
    );


}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
};
