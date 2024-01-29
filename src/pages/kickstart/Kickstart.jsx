import { Link } from "react-router-dom"
import styles from './Kickstart.module.css'
import tick from '../../assets/thickwithcircle.png';
import { profileCompleted } from "../../services/apiAuth";
import { useState } from "react";
import Spinner from "../../ui/Spinner";
import {useSelector } from 'react-redux'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

function Kickstart() {
    
    const[isLoad,setIsLoading] = useState(false)
    const {user:{email}} = useSelector(state => state.user)
    const navigate = useNavigate()

    async function submitHandler(){
        setIsLoading(true)
        try{
            await profileCompleted(email)
            navigate('/dashboard')
        }
        catch(error){
            toast.error("Something went wrong")
        }
        finally{
            setIsLoading(false)
        }
    }

    if(isLoad) return <Spinner/>
    return (
        <div className={styles.KickstartContainer}>
            <img src={tick} alt="" />
            <h4>You are all set</h4>
            <p>Kickstart your hiring journey by posting your first job now</p>
            <Link onClick={submitHandler}>Go Dashboard</Link>
        </div>
    )
}

export default Kickstart
