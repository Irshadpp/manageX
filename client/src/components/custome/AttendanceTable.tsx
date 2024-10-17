import React from 'react';
import { Table, TableRow, TableCell } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"; 

interface AttendanceTableProps {
  attendanceData: any[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ attendanceData, totalPages, currentPage, onPageChange }) => {
  return (
    <div className="w-full">
      <Table>
        <thead>
          <TableRow className='bg-muted/60'>
            <TableCell>Date</TableCell>
            <TableCell>Check-in Time</TableCell>
            <TableCell>Check-out Time</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Remarks</TableCell>
          </TableRow>
        </thead>
        <tbody>
          {attendanceData && attendanceData.map((log: any, idx: number) => (
            <TableRow key={idx} className='bg-muted/30'>
              <TableCell>{log.date}</TableCell>
              <TableCell>{log.checkIn}</TableCell>
              <TableCell>{log.checkOut}</TableCell>
              <TableCell>{log.status}</TableCell>
              <TableCell>{log.remarks}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-4">
        <Pagination className="flex items-center">
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className={`mr-2 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : ''}`}
          >
            <span>Previous</span>
          </PaginationPrevious>
          <PaginationContent className="flex">
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index} className="mx-1">
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => onPageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className={`ml-2 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : ''}`}
          >
            <span>Next</span>
          </PaginationNext>
        </Pagination>
      </div>
    </div>
  );
};

export default AttendanceTable;
