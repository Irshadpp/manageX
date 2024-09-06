import { RootState } from '@/store';
import { fetchEmployees } from '@/store/employeeThunks';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EmployeeCard from './EmployeeCard';
import { SkeletonEmployeeCard } from './skeletons/SkeletonEmployeeCard';

const EmployeeList = () => {

  const dispatch = useDispatch<any>();
  const {error, loading, employees} = useSelector((state: RootState) => state.employee);
  useEffect(()=>{
    dispatch(fetchEmployees());
  },[dispatch]);

  const employeeCards = useMemo(()=>{
    return employees.map(employee => <EmployeeCard key={employee.id} employee={employee}/>)
  },[employees]);

  if(loading){
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {[...Array(employees.length || 8)].map((_, i) => (
          <SkeletonEmployeeCard key={i} />
        ))}
      </div>
    );
  }

  if(error){
    return <h1>{error}</h1>
  }

  return (
    <>
    {employees ? (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {employeeCards}
      </div>
    ) : (
      <div>
        <h1>employee weren't created yet</h1>
      </div>
    )}
    </>
  )
}

export default EmployeeList
