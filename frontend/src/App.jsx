import { Routes, Route } from 'react-router-dom';
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
import { UserProvider } from './context/userContext.jsx';

function App() {

  return (
    <UserProvider>
      <div className='h-screen flex flex-col'>
        <NavBar />

        <Routes>
          <Route path='/auth/login' element={<Login_Page />} />
          <Route path='/auth/signup' element={<Signup_Page />} />

          {/*Admin Routes*/}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/tasks' element={<ManageTasks />} />
          <Route path='/admin/create-tasks' element={<CreateTask />} />
          <Route path='/admin/users' element={<ManageUsers />} />

          {/*User Routes*/}
          <Route element={<PrivateRoute allowedRoles={["user"]} />} />
          <Route path='/user/dashboard' element={<UserDashboard />} />
          <Route path='/user/tasks' element={<MyTask />} />
          <Route path='/user/task-details' element={<ViewTaskDetails />} />

        </Routes>
      </div>
    </UserProvider>
  )
}

export default App
