import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";
import Logo from '../assets/companyLogo.svg'


function AppLayout() {
  return (
    <div className={styles.appLayoutContainer}>
      <header>
        <img src={Logo} alt="" />
      </header>
      <main>
        
        <Outlet />
        
      </main>
    </div>
  );
}

export default AppLayout;
