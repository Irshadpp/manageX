import { RootState } from '@/store';
import { fetchEmployees } from '@/store/employeeThunks';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EmployeeCard from '../../../components/employees/EmployeeCard';
import EmptyList from '../../../components/employees/EmptyList';
import { SkeletonEmployeeCard } from '@/components/skeletons/SkeletonEmployeeCard';

const ManEmployeeList = () => {

  const dispatch = useDispatch<any>();
  const {error, loading, employees} = useSelector((state: RootState) => state.employee);
  useEffect(()=>{
    dispatch(fetchEmployees());
  },[dispatch]);


  if(loading){
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {[...Array(employees?.length || 8)].map((_, i) => (
          <SkeletonEmployeeCard key={i} />
        ))}
      </div>
    );
  }
  if(!employees || employees.length <= 0){
    return <EmptyList/>
  }


  return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {employees.map(employee => <EmployeeCard key={employee.id} employee={employee}/>)}
      </div>
  )
}

export default ManEmployeeList