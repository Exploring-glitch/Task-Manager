import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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


  const getTaskDetailsId = async () => { };

  const updateTodoCheckList = async () => { };

  const handleLinkClick = (link) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsId();
    }
    
    return () => {};
  }, []);


  return (
    <div>ViewTaskDetails</div>
  )
}

export default ViewTaskDetails