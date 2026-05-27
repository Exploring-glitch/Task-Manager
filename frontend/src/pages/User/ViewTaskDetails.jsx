import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get_task_details_by_id, update_todoCheckLists } from '../../api/tasksApi.js';
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
import AvatarGroup from '../../components/AvatarGroup.jsx';
import moment from 'moment';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';




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

  const updateTodoCheckList = async (index) => {
    const todoList = [...task?.todoCheckLists];

    todoList[index] = {
      ...todoList[index],
      completed: !todoList[index].completed,
    };

    try {
      const response = await update_todoCheckLists(id, {
        todoCheckLists: todoList,
      });

      if (response?.tasks) {
        setTask(response.tasks);
      }
    } catch (err) {
      console.log(err);
    }
  }
};

const handleLinkClick = (link) => {
  if (!/^https?:\/\//i.test(link)) {
    link = "https://" + link;
  }
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

            <div className='mt-4 grid grid-cols-12 gap-4'>
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
                  avatars={task?.assignedTo?.map((user) => user?.profileImageUrl || [])}
                  maxVisible={5}
                />
              </div>
            </div>

            <div className='mt-2'>
              <label className='text-xs font-medium text-slate-500'>Todo CheckList</label>

              {task?.todoCheckLists?.map((item, index) => (
                <TodoCheckList
                  key={`todo_${index}`}
                  text={item.text}
                  isChecked={item?.completed}
                  onChange={() => updateTodoCheckList(index)}
                />
              ))}
            </div>

            {task.attachments?.length > 0 && (
              <div className='mt-2'>
                <label className='text-xs font-medium text-slate-500'>Attachments</label>

                {task?.attachments?.map((link, index) => (
                  <Attachment
                    key={`link_${index}`}
                    link={link}
                    index={index}
                    onClick={() => handleLinkClick(link)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </DashboardLayout>
)


export default ViewTaskDetails;




const InfoBox = ({ label, value }) => {
  return <>
    <label className='text-xs font-medium text-slate-500'> {label} </label>

    <p className='mt-0.5 text-[12px] font-medium text-gray-700 md:text-[13px]'> {value} </p>
  </>
};

const TodoCheckList = ({ text, isChecked, onChange }) => {
  return <div className='flex items-center gap-3 p-3'>
    <input
      type='checkbox'
      checked={isChecked}
      onChange={onChange}
      className='w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none cursor-pointer'
    />

    <p className='text-[13px] text-gray-800'> {text} </p>
  </div>
};

const Attachment = ({ link, index, onClick }) => {
  return <div className='mt-2 flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md cursor-pointer'
    onClick={onClick}
  >
    <div className='flex-1 flex items-center gap-3'>
      <span className='mr-2 text-xs text-gray-400 font-semibold'> {index < 9 ? `0${index + 1}` : index + 1} </span>

      <p className='text-xs text-black'> {link} </p>
    </div>

    <LuSquareArrowOutUpRight className='text-gray-400 ' />
  </div>
}