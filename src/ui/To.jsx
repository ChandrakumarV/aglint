import { Link } from "react-router-dom"
import styles from './To.module.css'

function To({to,children,style}) {


    if(to){
        return  <Link to={to} style={style} className={styles.to}>{children}</Link>
    }

}

export default To
