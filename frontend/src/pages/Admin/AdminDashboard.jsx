import React, { useContext, useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth.jsx';
import { UserContext } from '../../context/userContext.jsx';
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
import { useNavigate } from 'react-router-dom';
import { dashboard_data } from '../../api/tasksApi.js';
import moment from 'moment';
import InfoCard from '../../components/cards/InfoCard.jsx';
import { addThousandsSeperator } from '../../util/helper.jsx';
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '../../components/TaskListTable.jsx';
import CustomPieChart from '../../components/charts/CustomPieChart.jsx';
import CustomBarChart from '../../components/charts/CustomBarChart.jsx';

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];


const AdminDashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [dashBoardData, setDashBoardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);


  //Prepare chart data
  const prepareChartData = (data) => {
    const taskDistributions = data?.taskDistributions || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    const taskDistributionData = [
      { status: "Pending", count: taskDistributions?.Pending || 0 },
      { status: "In Progress", count: taskDistributions?.InProgress || 0 },
      { status: "Completed", count: taskDistributions?.Completed || 0 },
    ];
    setPieChartData(taskDistributionData);

    const  PriorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ];
    setBarChartData(PriorityLevelData)
  }

  const getDashboardData = async () => {
    try {
      const response = await dashboard_data();

      if (response) {
        setDashBoardData(response);
        prepareChartData(response?.charts || null);
      }

    }
    catch (e) {
      console.error('Failed to fetch Dashboard data: ', e);
    }
  }

  const onSeeMore = () => {
    navigate('/admin/tasks')
  }

  useEffect(() => {
    getDashboardData();

    return () => { };
  }, []);




  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='p-6 my-3 rounded-2xl shadow-md shadow-gray-200 border border-gray-200/50'>
        <div className='col-span-3'>
          <h2 className='text-xl
            md:text-2xl'
          >
            Hey! {user?.user?.name}
          </h2>
          <p className='text-gray-400 mt-1.5 text-xs
              md:text-[13px]'> {moment().format("dddd Do MMM YYYY")} </p>
        </div>

        <div className='pt-6 grid grid-cols-2 gap-3
          md:grid-cols-4 md:gap-6
        '>
          <InfoCard
            label="Total Tasks"
            value={addThousandsSeperator(
              dashBoardData?.charts?.taskDistributions?.All || 0
            )}
            color="bg-primary"
          />

          <InfoCard
            label="Pending Tasks"
            value={addThousandsSeperator(
              dashBoardData?.charts?.taskDistributions?.Pending || 0
            )}
            color="bg-violet-500"
          />

          <InfoCard
            label="In Progress Tasks"
            value={addThousandsSeperator(
              dashBoardData?.charts?.taskDistributions?.InProgress || 0
            )}
            color="bg-cyan-500"
          />

          <InfoCard
            label="Completed Tasks"
            value={addThousandsSeperator(
              dashBoardData?.charts?.taskDistributions?.Completed || 0
            )}
            color="bg-lime-500"
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6'>
        
        <div className='p-6 my-4 rounded-2xl shadow-md shadow-gray-200 border border-gray-200/50'>

          <div className='flex items-center justify-between'>
            <h5 className='font-medium'>Task Distribution</h5>
          </div>

          <CustomPieChart 
            data={pieChartData}
            colors={COLORS}
          />
        </div>

        <div className='p-6 my-4 rounded-2xl shadow-md shadow-gray-200 border border-gray-200/50'>

          <div className='flex items-center justify-between'>
            <h5 className='font-medium'>Task Priority Levels</h5>
          </div>

          <CustomBarChart 
            data={barChartData}
          />
        </div>
        
        <div className='md:col-span-2'>

          <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Recent Tasks</h5>
            <button className='flex items-center text-[12px] font-medium
              text-gray-700 hover:text-primary bg-gray-50 hover:bg-blue-50
              px-4 py-1.5 rounded-lg border border-gray-200 cursor-pointer'
              onClick={onSeeMore}
            >
              See All 
              <LuArrowRight className='text-base' />
            </button>
          </div>
          <TaskListTable tableData={dashBoardData?.recentTasks || []} />

        </div>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard