import styles from "./Dashboard.module.css";
import { Link, NavLink, Outlet } from 'react-router-dom';
import card from './../../assets/dashboardAssets/card.svg';
import database from './../../assets/dashboardAssets/database.svg';
import mainLogo from './../../assets/dashboardAssets/mainLogo.svg';
import message from './../../assets/dashboardAssets/message.svg';
import notification from './../../assets/dashboardAssets/notification.svg';
import office from './../../assets/dashboardAssets/office.svg';
import orgin from './../../assets/dashboardAssets/orgin.svg';
import settings from './../../assets/dashboardAssets/settings.svg';
import signout from './../../assets/dashboardAssets/signout.svg';
import theme from './../../assets/dashboardAssets/theme.svg';
import userLogo from './../../assets/dashboardAssets/userLogo.svg';
import addNewJob from './../../assets/dashboardAssets/addNewJob.svg';
import { logout } from "../../services/apiAuth";
import { setAuthFalse } from "../../Slices/user";
import {toast} from 'react-hot-toast';
import { useDispatch,useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { clearJobs, fetchJobs } from "../../slices/job";
// import Spinner from '../../ui/Spinner'

function Dashboard() {//for fetch a jobs from sb

  const {user:{id:user_id}} = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(()=>{
      dispatch(fetchJobs(user_id))
  },[])


  return (
    <div className={styles.DashboardContainer}>
      <Nav/>
      <Aside/>
      <Header/>
      <Main/>
    </div>
  );
}


 
function Header() {
  const {user} = useSelector(state=>state.user) //for display a user name in dashboard
  const dispatch = useDispatch()
  const [isLoad,setIsLoad] = useState(false)
  
  async function logoutHandler() {
    setIsLoad(true)
    try{
      await logout()
      dispatch(setAuthFalse())
      dispatch(clearJobs())
    }
    catch(error){
      toast.error(error.message)
    }
    finally{
      setIsLoad(false)
    }
  }

  return (
    <header>
      <h1>Dashboard <p style={{fontSize:"1.2rem",fontWeight:"300",color:"black"}}>Welcome., {user.user_metadata.full_name}</p></h1>
        <button onClick={logoutHandler} disabled={isLoad}>{isLoad?"Loading...":"Logout"}</button>
    </header>
  );
}
export default Dashboard;



function Nav(){
  return <nav>
    <div className={styles.topContainer}>
        <img src={mainLogo} alt="" />
        <img src={orgin} alt="" />
        <img src={database} alt="" />
        <img src={card} alt="" />
        <img src={message} alt="" />
        <img src={office} alt="" />
    </div>
    <div className={styles.bottomContainer}>
        <img src={theme} alt="" />
        <img src={notification} alt="" />
        <img src={settings} alt="" />
        <img src={signout} alt="" />
        <Link to='profile'><img src={userLogo} alt="" /></Link>
    </div>
  </nav>
}

function Aside(){

  
  const {jobs} = useSelector(state=>state.jobs)  
  
  const publishedJobs = jobs?.filter(job=>job.status === "published")
  const draftJobs = jobs?.filter(job=>job.status === "draft")
  const closedJobs = jobs?.filter(job=>job.status === "closed")
  
  return <aside>
      <NavLink to="addnewjob" className={styles.addJobBtn}><img src={addNewJob}/> Add New Job</NavLink>
      <NavLink to="all" className={styles.subMenuIcon}>All <p className={styles.count}>{jobs.length}</p></NavLink>
      <NavLink to="pusblished" className={styles.subMenuIcon}>Pusblished  <p className={styles.count}>{publishedJobs.length}</p></NavLink>
      <NavLink to="draft" className={styles.subMenuIcon}>Draft  <p className={styles.count}>{draftJobs.length}</p></NavLink>
      <NavLink  to="closed" className={styles.subMenuIcon}>Closed  <p className={styles.count}>{closedJobs.length}</p></NavLink>

  </aside>
}


function Main(){
  return <main>
  <Outlet/>
</main>
}