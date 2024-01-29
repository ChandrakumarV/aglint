import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import { getProfile } from "../../services/apiAuth";
import Spinner from '../../ui/Spinner'
import {toast} from 'react-hot-toast';

function Profile() {
  const { user:{email} } = useSelector((state) => state.user);
  const [user,setUser] = useState([])
  const [isLoad,setIsLoad] = useState(false)

  useEffect(()=>{
      async function getDetails(){
        setIsLoad(true)
        try{
          const user = await getProfile(email)
          setUser(user[0])
        }
        catch(error){
          toast.error("Something went wrong")
        }
        finally{
          setIsLoad(false)
        }
      }
      getDetails()
  },[])

  if(isLoad) return <Spinner/>

  if(!user) return <h5>No Data found</h5>

  return (
    <div className={styles.profileContainer}>
      <h1>Profile</h1>
      <div className={styles.detailsContainer}>

        <div className={styles.detail}>
          <h3>Username</h3>
          <p>{user.display_name}</p>
        </div>

        <div className={styles.detail}>
          <h3>Email</h3>
          <p>{user.email}</p>
        </div>
        
        <div className={styles.detail}>
          <h3>Phone Number</h3>
          <p>{user.phone}</p>
        </div>

        <div className={styles.detail}>
          <h3>Company name</h3>
          <p>{user.company_name}</p>
          </div>

        <div className={styles.detail}>
          <h3>Organization</h3>
          <p>{user.option}</p>
        </div>

        <div className={styles.detail}>
          <h3>Website</h3>
          <p>{user.website_url}</p>
        </div>

      
        <div className={styles.detail}>
          <h3>No of Employees</h3>
          <p>{user.no_emp}</p>
        </div>


        <div className={styles.detail}>
          <h3>Industry Type</h3>
          <p>{user.industry_type}</p>
        </div>

        <div className={styles.detail}>
          <h3>ATS System</h3>
          <p>{user.ats_system}</p>
        </div>

        <div className={styles.detail}>
          <h3>Goals</h3>
          {user.goals?.map((goal,i)=><p key={i}>{goal}</p>)}
        </div>

      </div>
    </div>
  );
}

export default Profile;
