import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
import { useNavigate } from 'react-router-dom';
import { get_all_tasks } from '../../api/tasksApi.js';
import { LuFileSpreadsheet } from 'react-icons/lu';
import TaskStatusList from '../../components/TaskStatusList.jsx';


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

      setAllTasks(response?.tasks?.length > 0 ? response.tasks : []);

      //map statusSummary data with fixed labels and order
      const statusSummary = response?.statusSummary || {};
      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pending || 0 },
        { label: "In Progress", count: statusSummary.inProgress || 0 },
        { label: "Complete", count: statusSummary.complete || 0 },
      ];
      setTabs(statusArray);
    }
    catch (e) {
      console.log("Error fetching users. Error:", e);
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
      <div className='my-5'>
        <div className='flex flex-col justify-between
          lg:flex-row lg:items-center'
        >
          <div className='flex items-center justify-between gap-3'>
            <h2 className='text-lg md:text-xl font-medium'>My Tasks</h2>

            <button
              onClick={handleDownloadReport}
              className='lg:hidden flex items-center gap-3 text-xs md:[text-13px] font-medium text-lime-900 bg-lime-100 px-2 md:px-3 py-2 rounded border border-lime-200 hover:border-lime-400 cursor-pointer'
            >
              <LuFileSpreadsheet className='text-lg' />
              Download Report
            </button>
          </div>

          {tabs?.[0]?.count > 0 && (
            <div className='flex items-center gap-3'>
              <TaskStatusList
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />

              <button
                onClick={handleDownloadReport}
                className='hidden lg:flex items-center gap-3 text-xs md:[text-13px] font-medium text-lime-900 bg-lime-100 px-2 md:px-3 py-2 rounded border border-lime-200 hover:border-lime-400 cursor-pointer'
              >
                <LuFileSpreadsheet className='text-lg' />
                Download Report
              </button>
            </div>
          )}
        </div>

        <div className='mt-4 gap-4 grid grid-cols-1 md:grid-flow-cols-3'>
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
              assignedTo={item.assignedTo?.map((item) => item.profileImageUrl)}
              attachmentCount={item.attachments?.length || 0}
              completedTodoCount={item.completedTodoCount || 0}
              todoChecklist={item.todoChecklist || []}

              onClick={() => { handleClick(item) }}
            ></TaskCard>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageTasks;