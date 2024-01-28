import styles from './AllJobs.module.css'
import {useSelector} from 'react-redux'


function Draft() {

    
    const {jobs} = useSelector(state=>state.jobs) 
    const draftJobs = jobs.filter(job=>job.status === "draft")

    if(!draftJobs.length)return<h1 className={styles.noJob}>No Draft Jobs</h1>

    return (
        <div className={styles.allJobContainer}>
        <h1>Draft Jobs</h1>

        <div className={styles.jobs_container}>
            {draftJobs.map((job,i)=><div className={styles.job} key={i}>
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

export default Draft
