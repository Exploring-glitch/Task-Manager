import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get_task_details_by_id } from '../../api/tasksApi.js';
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
import AvatarGroup from '../../components/AvatarGroup.jsx';
import moment from 'moment';

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);


  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border-cyan-500/10";

      case "Completed":
        return "text-lime-500 bg-lime-50 border-lime-500/10";

      default:
        return "text-violet-500 bg-violet-50 border-violet-500/10";
    }
  }

  const getTaskDetailsId = async (id) => {
    try {
      const response = await get_task_details_by_id(id)
  
      if (response) {
        const taskInfo = response;
        setTask(taskInfo);
      }
    }
    catch (err) {
      console.log("Error fetching task details. Error: ", err)
    }
  };

  const updateTodoCheckList = async () => { };

  const handleLinkClick = (link) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsId(id);
    }

    return () => { };
  }, []);


  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className='mt-5'>
        {task && (
          <div className='mt-4 grid grid-cols-1 md:grid-cols-4 '>
            <div className='col-span-3 p-6 my-3 rounded-2xl shadow-md shadow-gray-200 border border-gray-200/50'>

              <div className='flex items-center justify-between'>
                <h2 className='text-sm md:text-xl font-medium'> {task?.title} </h2>

                <div className={`text-[11px] md:text-[13px] font-medium 
                  ${getStatusTagColor(task?.status)} 
                  px-4 py-0.5 rounded`}
                >
                  {task?.status}
                </div>
              </div>

              <div className='mt-4'>
                <InfoBox
                  label="Description"
                  value={task?.description}
                />
              </div>

              <div className='mt-4 grid grid-cols-12'>
                <div className='col-span-6 md:col-span-4'>
                  <InfoBox label="Priority" value={task?.priority} />
                </div>

                <div className='col-span-6 md:col-span-4'>
                  <InfoBox label="Due Date" value={task?.dueDate 
                    ? moment(task?.dueDate).format("Do MMM YYYY")
                    : "N/A"
                  } />
                </div>

                <div className='col-span-6 md:col-span-4'>
                  <label className='text-xs font-medium text-slate-500'> Assigned To </label>
                  <AvatarGroup 
                    avatars={ task?.assignedTo?.map((user) =>user?.profileImageUrl || []) }
                    maxVisible={5}
                  />
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default ViewTaskDetails;

const InfoBox = ({ label, value }) => {
  return <>
    <label className='text-xs font-medium text-slate-500'> {label} </label>

    <p className='mt-0.5 text-[12px] font-medium text-gray-700 md:text-[13px]'> {value} </p>
  </>
}