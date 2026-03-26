import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get_task_details_by_id } from '../../api/tasksApi.js';

const ViewTaskDetails = () => {
  const { id } = useParams();
  console.log("id: ", id)
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
    try{
      const response = await get_task_details_by_id(id)
      console.log(response);
      if (response) {
        const taskInfo = response;
        setTask(taskInfo);
      }
    }
    catch(err){
      console.log("Error fetching task details. Error: ", err)
    }
  };


  const updateTodoCheckList = async () => { };

  const handleLinkClick = (link) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      console.log("hello id: ", id)
      getTaskDetailsId(id);
    }
    
    return () => {};
  }, []);


  return (
    <div>ViewTaskDetails</div>
  )
}

export default ViewTaskDetails