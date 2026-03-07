import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
import { useNavigate } from 'react-router-dom';
import { get_all_tasks } from '../../api/tasksApi.js';


const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const response = await get_all_tasks({
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        }
      });

      console.log(response)

      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

      //map statusSummary data with fixed labels and order
      const statusSummary = response.data?.statusSummary || {};
      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pending || 0 },
        { label: "In Progress", count: statusSummary.inProgress || 0 },
        { label: "Complete", count: statusSummary.complete || 0 },
      ];
      setTabs(statusArray);
    }
    catch (e) {
      console.log("Error fetching users:", e);
    }
  }

  const handleClick = (taskData) => {
    navigate("/admin/create-task", { state: { taskId: taskData._id } });
  };

  //download task report 
  const handleDownloadReport = async () => {

  };

  useEffect(() => {
    getAllTasks(filterStatus);
    return;
  }, [filterStatus]);


  return (
    <DashboardLayout activeMenu="Manage Tasks">
      hello
    </DashboardLayout>
  )
}

export default ManageTasks;