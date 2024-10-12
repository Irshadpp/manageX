import { RootState } from '@/store';
import { fetchEmployees } from '@/store/employeeThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SkeletonEmployeeCard } from './skeletons/SkeletonEmployeeCard';
import EmptyList from '@/components/employees/EmptyList';
import EmployeeCard from '@/components/employees/EmployeeCard';
import { Pagination, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";

const EmployeeList = () => {
  const dispatch = useDispatch<any>();
  const { error, loading, employees } = useSelector((state: RootState) => state.employee);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8; // Number of employees per page

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const totalPages = employees && Math.ceil((employees?.length || 0) / pageSize);
  const paginatedEmployees = employees && employees?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {[...Array(employees?.length || 8)].map((_, i) => (
          <SkeletonEmployeeCard key={i} />
        ))}
      </div>
    );
  }

  if (!employees || employees.length <= 0) {
    return <EmptyList />;
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {paginatedEmployees?.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default EmployeeList;
