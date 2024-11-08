import { RootState } from "@/store";
import { fetchEmployees } from "@/store/employeeThunks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SkeletonEmployeeCard } from "./skeletons/SkeletonEmployeeCard";
import EmptyList from "@/components/employees/EmptyList";
import EmployeeCard from "@/components/employees/EmployeeCard";
import {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Employee } from "@/store/types/employee";

const EmployeeList = () => {
  const dispatch = useDispatch<any>();
  const { error, loading, employees, totalPages } = useSelector(
    (state: RootState) => state.employee
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8;

  useEffect(() => {
    dispatch(fetchEmployees(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      dispatch(fetchEmployees(newPage, pageSize));
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
    <ScrollArea className="h-[620px] w-full scrollbar-hide">
      <div className="flex flex-col space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {employees?.map((employee: Employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>

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
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
          </PaginationItem>
        </Pagination>
      </div>
    </ScrollArea>
  );
};

export default EmployeeList;
