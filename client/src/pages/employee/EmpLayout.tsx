import EmployeeSideBar from '@/components/ui/sidebars/EmployeeSideBar'
import { Outlet } from 'react-router-dom'

const EmpLayout = () => {
  return (
    <div className="flex">
    <EmployeeSideBar />
    <div className="flex-grow">
      <Outlet/>
    </div>
  </div>
  )
}

export default EmpLayout
