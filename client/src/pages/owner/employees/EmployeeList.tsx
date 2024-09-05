import { RootState } from '@/store';
import { fetchEmployees } from '@/store/employeeThunks';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EmployeeCard from './EmployeeCard';

const EmployeeList = () => {

  const dispatch = useDispatch<any>();
  const {error, loading, employees} = useSelector((state: RootState) => state.employee);
  console.log("------------",employees, loading)
  useEffect(()=>{
    dispatch(fetchEmployees());
  },[dispatch]);

  if(loading){
    return <h1>loading...</h1>
  }

  if(error){
    return <h1>{error}</h1>
  }

  return (
    <>
    {employees ? (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {employees.map(employee =>(
          <EmployeeCard key={employee.id} employee={employee}/>
        ))}
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
