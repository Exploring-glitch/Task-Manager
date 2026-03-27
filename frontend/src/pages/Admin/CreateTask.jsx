import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
import { PRIORITY_DATA } from '../../util/data.jsx';
import toast from "react-hot-toast";
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuTrash2 } from 'react-icons/lu';
import SelectDropDown from '../../components/inputs/SelectDropDown.jsx';
import SelectUsers from '../../components/inputs/SelectUsers.jsx';
import TodoListInput from '../../components/inputs/TodoListInput.jsx';
import AddAttachmentInput from '../../components/inputs/AddAttachmentInput.jsx';
import { create_task, delete_task, get_task_details_by_id, update_task } from '../../api/tasksApi.js';
import DeleteAlert from '../../components/DeleteAlert.jsx';
import { ModalDelete } from '../../components/ModalDelete.jsx';




const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();


  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoCheckList: [],
    attachments: [],
  });
  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);


  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({
      ...prevData, [key]: value
    }));
  }

  //clear the data after creating a new task
  const clearData = () => {
    //reset from
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoCheckList: [],
      attachments: [],
    })
  }

  //create task
  const createTask = async () => {
    setLoading(true);

    try {
      const todoList = taskData.todoCheckList.map((item) => ({
        text: item,
        completed: false,
      }));

      const response = await create_task({
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckLists: todoList
      });

      toast.success("Task Created Successfully");
      clearData();
    }
    catch (e) {
      console.log("Error creating task. Error: ", e.message);
    }
    finally {
      setLoading(false);
    }
  }

  //update task
  const updateTask = async () => {
    setLoading(true);

    try {
      const todoList = taskData.todoCheckList?.map((item) => {
        const prevTodoChecklist = currentTask?.todoCheckList || [];
        const matchedTask = prevTodoChecklist.find((task) => task.text === item);

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });

      const response = await update_task(taskId, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckLists: todoList
      });

      toast.success("Task Updated Successfully");
    }
    catch (e) {
      console.log("Error creating task. Error: ", e)
    }
    finally {
      setLoading(false);
    }
  }

  //on sumit
  const handleSubmit = async () => {
    setError(null);

    //input validation
    if (!taskData.title.trim()) {
      setError("Title is requird.");
      return;
    }
    if (!taskData.description.trim()) {
      setError("Description is required.");
      return;
    }
    if (!taskData.dueDate) {
      setError("Due date is required.");
      return;
    }
    if (taskData.assignedTo?.length === 0) {
      setError("Task not assigned to any member.");
      return;
    }
    if (taskData.todoCheckList?.length === 0) {
      setError("Add atleast one todo task.");
      return;
    }

    if (taskId) {
      await updateTask();
      return;
    }

    createTask();
  }

  //get task info by id
  const getTaskDetailsById = async () => {
    try {
      const response = await get_task_details_by_id(taskId);

      if (response) {
        const taskInfo = response;
        setCurrentTask(taskInfo);

        setTaskData((prevState) => ({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : null,
          assignedTo: taskInfo?.assignedTo?.map((item) => item?._id) || [],
          todoCheckList: taskInfo?.todoCheckLists?.map((item) => item?.text) || [],
          attachments: taskInfo?.attachments || [],
        }));
      }
    }
    catch (e) {
      console.log("Error fetching users. Error: ", e)
    }
  }

  //delete task
  const deleteTask = async () => {
    try{
      const response = await delete_task(taskId);
      setOpenDeleteAlert(false);
      toast.success("Expense details deleted successfully")
      navigate('/admin/tasks')
    }
    catch(e){
      console.log("Error deleting expense. Error: ", e);
    }
  }

  useEffect(() => {
    if (taskId) {
      getTaskDetailsById(taskId)
    }

    return () => { }
  }, [taskId]);



  return (
    <DashboardLayout activeMenu="Create Task">
      <div className='mt-5'>
        <div className='mt-4 grid grid-cols-1 md:grid-cols-4'>
          <div className='col-span-3 bg-white p-6 rounded-lg shadow-lg shadow-gray-100 border border-gray-200/50'>

            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-medium'>
                {taskId ? "Update Task" : "Create Task"}
              </h2>

              {taskId && (
                <button
                  className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 cursor-pointer border border-rose-100 hover:border-rose-300'
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className='text-base'> Delete </LuTrash2>
                </button>
              )}
            </div>

            <div className='mt-4'>
              <label className='text-xs font-medium text-slate-600'> Task Title </label>

              <input
                placeholder='Create App UI'
                value={taskData.title}
                onChange={({ target }) => handleValueChange("title", target.value)}
                className='mt-2 w-full text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md 
                placeholder:text-gray-500'
              />
            </div>

            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600'> Description </label>

              <textarea
                placeholder='Describe task'
                value={taskData.description}
                rows={4}
                onChange={({ target }) => handleValueChange("description", target.value)}
                className='mt-2 w-full text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md 
                placeholder:text-gray-500'
              />
            </div>

            <div className='mt-3 grid grid-cols-12 gap-4'>
              <div className='col-span-6 md:col-span-4'>
                <label className='text-xs font-medium text-slate-600'> Priority </label>

                <SelectDropDown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>

              <div className='col-span-6 md:col-span-4'>
                <label className='text-xs font-medium text-slate-600'> Due Date </label>

                <input
                  type='date'
                  placeholder='Create App UI'
                  value={taskData.dueDate}
                  onChange={({ target }) => handleValueChange("dueDate", target.value)}
                  className='mt-2 w-full text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md 
                placeholder:text-gray-500'
                ></input>
              </div>

              <div className='col-span-6 md:col-span-4'>
                <label className='text-xs font-medium text-slate-600'> Assign To </label>

                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => {
                    handleValueChange("assignedTo", value)
                  }}
                ></SelectUsers>
              </div>
            </div>

            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600'>TODO Checklist</label>

              <TodoListInput
                todolist={taskData?.todoCheckList}
                setTodoList={(value) => handleValueChange("todoCheckList", value)}
              />
            </div>

            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600'> Add Attachments</label>

              <AddAttachmentInput
                attachments={taskData?.attachments}
                setAttachments={(value) => handleValueChange("attachments", value)}
              />
            </div>

            {error &&
              <p className='mt-5 text-xs font-medium text-red-500'>{error}</p>
            }

            <div className='mt-7 flex justify-center'>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className='px-4 py-2 w-full flex justify-center items-center gap-1.5 text-xs md:text-sm font-medium bg-blue-50 hover:bg-blue-100 hover:transition text-primary whitespace-nowrap border border-blue-100 rounded-lg cursor-pointer'
              >
                {loading
                  ? "Saving..."
                  : taskId ? "UPDATE TASK" : "CREATE TASK"
                }
              </button>
            </div>

          </div>
        </div>
      </div>

      <ModalDelete
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert 
          content="Are you sure you want to delete this task?"
          onConfirm={() => deleteTask()}
          btnText="Delete"
        />
      </ModalDelete>
    </DashboardLayout>
  )
}

export default CreateTask