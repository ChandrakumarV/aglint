import styles from './AllJobs.module.css'
import {useSelector} from 'react-redux';
import Spinner from '../../ui/Spinner';

function AllJobs() {

    
  const {jobs,status} = useSelector(state=>state.jobs)  

    if(status==="loading")return<h1 className={styles.noJob}><Spinner/></h1>
    if(!jobs.length)return<h1 className={styles.noJob}>No Jobs</h1>
    return (
        <div className={styles.allJobContainer}>
            <h1>All Jobs</h1>

            <div className={styles.jobs_container}>
                {jobs.map((job,i)=><div className={styles.job} key={i}>
                    <div className={styles.left}>
                        <h3>{job.job_name}</h3>
                        <p>{job.type}</p>
                        <p>{job.location}</p>
                    </div>
                    <div className={styles.right}>
                        <p className={`${styles.statuss} ${styles[job.status]}`}>{job.status}</p>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default AllJobs
