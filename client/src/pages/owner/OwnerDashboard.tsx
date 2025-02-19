import NewTaskChart from '@/components/charts/NewTaskChart';
import ProjectsDone from '@/components/charts/ProjectsDone';
import TaskCompleteChart from '@/components/charts/TaskCompleteChart';
import TaskDone from '@/components/charts/TaskDone';
import { apiRequest } from '@/services/api/commonRequest';
import { useEffect } from 'react'

const OwnerDashboard = () => {
  return (
    <div className="min-h-screen w-full p-5">
     <div className="col-span-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <TaskCompleteChart />
        <NewTaskChart />
        <ProjectsDone />
      </div>
      <TaskDone />
    </div>
  </div>
  )
}

export default OwnerDashboard
