import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import ManageTasks from './pages/Admin/ManageTasks.jsx';
import CreateTask from './pages/Admin/CreateTask.jsx';
import ManageUsers from './pages/Admin/ManageUsers.jsx';
import UserDashboard from './pages/User/UserDashboard.jsx';
import MyTask from './pages/User/MyTask.jsx';
import ViewTaskDetails from './pages/User/ViewTaskDetails.jsx';
import Login_Page from './pages/Auth/Login_Page.jsx';
import Logout_Page from './pages/Auth/Logout_Page.jsx';
import Signup_Page from './pages/Auth/Signup_Page.jsx'
import { UserContext, UserProvider } from './context/userContext.jsx';
import { useContext } from 'react';
import { Toaster } from "react-hot-toast";




function App() {
  return (
    <UserProvider>
      <Toaster position="top-center" toastOptions={{
        duration: 3000,
      }} />

      <Routes>
        <Route path='/auth/login' element={<Login_Page />} />
        <Route path='/auth/signup' element={<Signup_Page />} /> 
        <Route path='/auth/logout' element={<Logout_Page />} />

        {/*Admin Routes*/}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/tasks' element={<ManageTasks />} />
          <Route path='/admin/create-tasks' element={<CreateTask />} />
          <Route path='/admin/team-members' element={<ManageUsers />} />

        </Route>

        {/*User Routes*/}
        <Route element={<PrivateRoute allowedRoles={["member"]} />}>
          <Route path='/member/dashboard-user-data' element={<UserDashboard />} />
          <Route path='/member/tasks' element={<MyTask />} />
          <Route path='/member/task-details/:id' element={<ViewTaskDetails />} />
        </Route>

        {/*Default Route*/}
        <Route path='/' element={<Root />}></Route>
      </Routes>
    </UserProvider >
  )
}



const Root = () => {
  const { user, loading } = useContext(UserContext);
  
  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/auth/login" />
  }

  return user?.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/member/dashboard-user-data" />
}


export default App

    