import {Navigate} from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { getCurrentUser } from "../services/apiAuth";

import {useSelector} from 'react-redux';
import FullSpinner from '../ui/FullSpinner'


function ProtectedRoute({ children }) {

  const {isAuth,isLoading} = useSelector(state => state.user)

  if(isLoading){
    return <FullSpinner/>
  }
  
  if (!isAuth){
    return <Navigate to="/" replace={true}/>;
  } 


  if (isAuth)
    return (
      <>
        {children}
      </>
    );
}

export default ProtectedRoute;
