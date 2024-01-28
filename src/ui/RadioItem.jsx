import styles from './RadioItem.module.css' 
function RadioItem({item,setAts}) {
    return (
        <div className={styles.inputcontainer} >
        <input
          type="radio"
          id={item.value}
          value={item.value}
          name="ats"
          onChange={(e)=>setAts(e.target.value)}
        />
        <label htmlFor={item.value}>
          {item.img ? <img src={item.img} alt="" /> : item.label}
        </label>
      </div>
    )
}

export default RadioItem
