import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';

import Login from './pages/Auth/Login.jsx';
import Signup from './pages/Auth/Signup.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import ManageTasks from './pages/Admin/ManageTasks.jsx';
import CreateTask from './pages/Admin/CreateTask.jsx';
import ManageUsers from './pages/Admin/ManageUsers.jsx';
import UserDashboard from './pages/User/UserDashboard.jsx';
import MyTask from './pages/User/MyTask.jsx';
import ViewTaskDetails from './pages/User/ViewTaskDetails.jsx';

function App() {

  return (
   <div>
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

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
    </Router>
   </div>
  )
}

export default App
