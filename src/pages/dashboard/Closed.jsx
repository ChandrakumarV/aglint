
import { AllJobsData } from '../../data/data'
import styles from './AllJobs.module.css'


function Closed() {
    const closedJobs = AllJobsData.filter(job=>job.status === "closed")
    return (
        <div className={styles.allJobContainer}>
        <h1>Closed Jobs</h1>

        <div className={styles.jobs_container}>
            {closedJobs.map((job,i)=><div className={styles.job} key={i}>
                <div className={styles.left}>
                    <h3>{job.name}</h3>
                    <p>{job.type}</p>
                    <p>{job.Location}</p>
                </div>
                <div className={styles.right}>
                    <p className={`${styles.statuss} ${styles[job.status]}`}>{job.status}</p>
                </div>
            </div>)}
        </div>
    </div>
    )
}

export default Closed
