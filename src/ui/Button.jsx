
import styles from './Button.module.css'

function Button({children,type,disabled,onClick,style}) {
    

if (type==="submit")
  return (
    <button type={type} disabled={disabled} style={style} className={`${styles[type]} ${styles.buttonContainer}`}>
      {children}
    </button>
  );

if (onClick)
  return (
    <button onClick={onClick} disabled={disabled} className={`${styles[type]} ${styles.buttonContainer}`}>
      {children}
    </button>
  );

return (
  <button disabled={disabled} className={`${styles[type]} ${styles.buttonContainer}`} >
    {children}
  </button>
);
}

export default Button

