import { Link } from "react-router-dom"
import styles from './Kickstart.module.css'
import tick from '../../assets/thickwithcircle.png';

function Kickstart() {
    return (
        <div className={styles.KickstartContainer}>
            <img src={tick} alt="" />
            <h4>You are all set</h4>
            <p>Kickstart your hiring journey by posting your first job now</p>
            <Link to="/dashboard">Go Dashboard</Link>
        </div>
    )
}

export default Kickstart
