
import { RouterProvider, createBrowserRouter,Navigate } from 'react-router-dom'
import './App.css'
import Signup from './pages/signup/Signup'
import ForgotPassword from './pages/forgotpassword/ForgotPassword'
import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Error from './pages/error/Error'
import ProfileCreation from './pages/profilecreation/ProfileCreation'
import OptionPick from './pages/optionpick/OptionPick'
import CompanyFetch from './pages/companyFetch/CompanyFetch'
import UpdatePassword from './pages/updatepassword/UpdatePassword'
import CompanyDetails from './pages/companydetails/companydetails'
import Kickstart from './pages/kickstart/Kickstart'
import AppLayout from './compenents/AppLayout'
import ProtectedRoute from './compenents/ProtectedRoute'
import AllJobs from "./pages/dashboard/AllJobs";
import NewJob from "./pages/dashboard/NewJob";
import Published from './pages/dashboard/Published'
import Draft from './pages/dashboard/Draft'
import Closed from './pages/dashboard/Closed'
import Profile from './pages/dashboard/Profile'
import { useEffect } from 'react'
import { getCurrentUser } from './services/apiAuth'
import { useDispatch } from 'react-redux'
import {  setAuthTrue, setLoadingFalse, } from './Slices/user'


function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    async function getuser(){
      try{
        const res = await getCurrentUser()
        if(res){
            dispatch(setAuthTrue(res))
          }
        }
        catch(error){
          console.log(error)
        }
        finally{
          dispatch(setLoadingFalse())

        }
    }
    getuser()
  },[])


  const router = createBrowserRouter([
        {
          element: <AppLayout/>,
          children:[
            {
              path:'/',
              element : <Login/> 
            },
            {
              path: '/signup',
              element: <Signup/>
            },
            { 
              path: '/forgotpassword', 
              element: <ForgotPassword/> 
            },
            {
              path: '*',
              element: <Error />,
            }
          ]
        },
        
        {
          element: <ProtectedRoute><AppLayout/></ProtectedRoute>,
          children:[
              {
                path: '/updatepassword',
                element: <UpdatePassword/>
              },
              { 
                path: '/optionpick', 
                element: <OptionPick/> 
              },
              {
                path: '/companyfetch',
                element: <CompanyFetch />, 
              },
              {
                path: '/profilecreation',
                element: <ProfileCreation  />,
              },
              {
                path: '/companydetails',
                element: <CompanyDetails  />,
              },
              {
                path: '/Kickstart',
                element: <Kickstart/>,
              },
            ]
          },
          {
            path: '/dashboard',
            element:<ProtectedRoute><Dashboard /></ProtectedRoute>,
            children:[
              {
                index:true,
                element : <Navigate to='all'/>
              },
              {
                path:'addnewjob',
                element:<NewJob/>
              },
              {
                path:'all',
                element:<AllJobs/>
              },
              {
                path:'pusblished',
                element:<Published/>
              },
              {
                path:'draft',
                element:<Draft/>
              },
              {
                path:'closed',
                element:<Closed/>
              },
              {
                path:'profile',
                element:<Profile/>
              },
            ]
          }
        ],
  
  {
    basename: "/aglint/",
  }
  )
    
  return <RouterProvider router={router}/> 
   

}

export default App
