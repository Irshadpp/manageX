import React, { useState } from 'react';
import { Table, TableRow, TableCell } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

interface LeaveTableProps {
  data: any[];
}

const LeaveTable: React.FC<LeaveTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data && data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = data && Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full">
      <Table>
        <thead>
          <tr>
            <TableCell>Leave Type</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Reason</TableCell>
          </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.map((leave: any, idx) => (
            <TableRow key={idx}>
              <TableCell>{leave.leaveType}</TableCell>
              <TableCell>{leave.startDate}</TableCell>
              <TableCell>{leave.endDate}</TableCell>
              <TableCell>{leave.status}</TableCell>
              <TableCell>{leave.reason}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-4">
        <Pagination className="flex items-center">
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            className={`mr-2 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : ''}`}
          >
            <span>Previous</span>
          </PaginationPrevious>
          <PaginationContent className="flex">
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index} className="mx-1">
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            className={`ml-2 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : ''}`}
          >
            <span>Next</span>
          </PaginationNext>
        </Pagination>
      </div>
    </div>
  );
};

export default LeaveTable;
    