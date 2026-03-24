import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
import { useNavigate } from 'react-router-dom';
import { get_all_tasks } from '../../api/tasksApi.js';
import { LuFileSpreadsheet } from 'react-icons/lu';
import TaskStatusList from '../../components/TaskStatusList.jsx';
import TaskCard from '../../components/cards/TaskCard.jsx';
import { download_task_report } from '../../api/reportApi.js';
import toast from 'react-hot-toast';


const MyTask = () => {
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

      setAllTasks(response?.tasks?.length > 0 ? response.tasks : []);

      //map statusSummary data with fixed labels and order
      const statusSummary = response?.statusSummary || {};
      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pending || 0 },
        { label: "In Progress", count: statusSummary.inProgress || 0 },
        { label: "Completed", count: statusSummary.completed || 0 },
      ];
      setTabs(statusArray);
    }
    catch (e) {
      console.log("Error fetching users. Error:", e);
    }
  }

  const handleClick = (taskId) => {
    navigate("/member/task-details/${taskId}");
  };

  useEffect(() => {
    getAllTasks(filterStatus);
    return;
  }, [filterStatus]);



  return (
    <DashboardLayout activeMenu="Manage Task">
      <div className='my-5'>
        <div className='flex flex-col justify-between
          lg:flex-row lg:items-center'
        >
          <h2 className='text-lg md:text-xl font-medium'>My Tasks</h2>

          {tabs?.[0]?.count > 0 && (
            <TaskStatusList
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
          )}
        </div>

        <div className='mt-4 gap-4 grid grid-cols-1 md:grid-cols-3'>
          {allTasks?.map((item, index) => (
            <TaskCard
              key={item._id}
              title={item.title}
              description={item.description}
              priority={item.priority}
              status={item.status}
              progress={item.progress}
              createdAt={item.createdAt}
              dueDate={item.dueDate}
              assignedTo={item.assignedTo?.map((user) => user.profileImageUrl)}
              attachmentCount={item.attachments?.length || 0}
              completedTodoCount={item.completedTodoCount || 0}
              todoCheckList={item.todoCheckLists || []}
              onClick={() => { handleClick(item._id) }}
            ></TaskCard>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default MyTask;