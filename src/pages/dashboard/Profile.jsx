import styles from "./Profile.module.css";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className={styles.profileContainer}>
      <h1>Profile</h1>
      <div className={styles.detailsContainer}>
        <div className={styles.detail}>
          <h3>Username</h3>
          <p>{user.user_metadata.full_name}</p>
        </div>
        <div className={styles.detail}>
          <h3>Email</h3>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
