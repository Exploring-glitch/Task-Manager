import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import ManageTasks from './pages/Admin/ManageTasks.jsx';
import CreateTask from './pages/Admin/CreateTask.jsx';
import ManageUsers from './pages/Admin/ManageUsers.jsx';
import UserDashboard from './pages/User/UserDashboard.jsx';
import MyTask from './pages/User/MyTask.jsx';
import ViewTaskDetails from './pages/User/ViewTaskDetails.jsx';
import NavBar from './components/NavBar.jsx';
import Login_Page from './pages/Auth/Login_Page.jsx';
import Signup_Page from './pages/Auth/Signup_page.jsx';
import { UserContext, UserProvider } from './context/userContext.jsx';
import { useContext } from 'react';

function App() {

  return (
    <UserProvider>
      <Routes>
        <Route path='/auth/login' element={<Login_Page />} />
        <Route path='/auth/signup' element={<Signup_Page />} />

        {/*Admin Routes*/}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path='/api/tasks/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/tasks' element={<ManageTasks />} />
          <Route path='/admin/create-tasks' element={<CreateTask />} />
        </Route>

        {/*User Routes*/}
        <Route element={<PrivateRoute allowedRoles={["user"]} />}>
          <Route path='/api/tasks/dashboard-user-data' element={<UserDashboard />} />
          <Route path='/user/tasks' element={<MyTask />} />
          <Route path='/user/task-details' element={<ViewTaskDetails />} />
        </Route>

        {/*Default Route*/}
        <Route path='/' element={<Root />}></Route>
      </Routes>
    </UserProvider >
  )
}

export default App


const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Outlet />

  if (!user) {
    return <Navigate to="/auth/login" />
  }

  return user.role === "admin" ? <Navigate to="/tasks/dashboard" /> : <Navigate to="/tasks/dashboard-user-data" />
}