import styles from './FullSpinner.module.css'
import Spinner from './Spinner'

function FullSpinner() {


    return (
        <div className={styles.fullSpinnerContainer}>
            <Spinner/>
        </div>
    )
}

export default FullSpinner 
