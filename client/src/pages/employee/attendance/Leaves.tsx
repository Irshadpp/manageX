import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableRow, TableCell } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"; // Import ShadCN pagination components
import { DatePickerWithRange } from '@/components/custome/DatePickerWithRange';
// import { Modal } from "@/components/ui/modal"; // Assuming you have this in shadcn

const Leaves: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{from: Date, to: Date} | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const LeavesData = [
    { date: '2024-09-01', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present', remarks: 'On time' },
    { date: '2024-09-02', checkIn: '09:15 AM', checkOut: '05:10 PM', status: 'Late', remarks: 'Traffic' },
    { date: '2024-09-01', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present', remarks: 'On time' },
    { date: '2024-09-02', checkIn: '09:15 AM', checkOut: '05:10 PM', status: 'Late', remarks: 'Traffic' },
    { date: '2024-09-01', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present', remarks: 'On time' },
    { date: '2024-09-02', checkIn: '09:15 AM', checkOut: '05:10 PM', status: 'Late', remarks: 'Traffic' },
    { date: '2024-09-01', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present', remarks: 'On time' },
    { date: '2024-09-02', checkIn: '09:15 AM', checkOut: '05:10 PM', status: 'Late', remarks: 'Traffic' },
    { date: '2024-09-01', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present', remarks: 'On time' },
    { date: '2024-09-02', checkIn: '09:15 AM', checkOut: '05:10 PM', status: 'Late', remarks: 'Traffic' },
    { date: '2024-09-01', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present', remarks: 'On time' },
    { date: '2024-09-02', checkIn: '09:15 AM', checkOut: '05:10 PM', status: 'Late', remarks: 'Traffic' },
    { date: '2024-09-01', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present', remarks: 'On time' },
    { date: '2024-09-02', checkIn: '09:15 AM', checkOut: '05:10 PM', status: 'Late', remarks: 'Traffic' },
    { date: '2024-09-01', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present', remarks: 'On time' },
    { date: '2024-09-02', checkIn: '09:15 AM', checkOut: '05:10 PM', status: 'Late', remarks: 'Traffic' },
    { date: '2024-09-01', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present', remarks: 'On time' },
    { date: '2024-09-02', checkIn: '09:15 AM', checkOut: '05:10 PM', status: 'Late', remarks: 'Traffic' },
    { date: '2024-09-01', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present', remarks: 'On time' },
    { date: '2024-09-02', checkIn: '09:15 AM', checkOut: '05:10 PM', status: 'Late', remarks: 'Traffic' },
    // Add more data as needed
  ];

  // Calculate the indices for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = LeavesData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(LeavesData.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      {/* Top section: Date Picker and Mark Leaves Button */}
      <div className="flex justify-between items-center">
        <DatePickerWithRange className="ml-auto" />
        <Button className="ml-4" onClick={() => setModalOpen(true)}>Apply Leave</Button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Right: Leaves Logs Table */}
        <div className="w-full">
          <Table>
            <thead>
              <tr>
                <TableCell>Date</TableCell>
                <TableCell>Check-in Time</TableCell>
                <TableCell>Check-out Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Remarks</TableCell>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((log, idx) => (
                <TableRow key={idx}>
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
      </div>

      {/* Leaves Modal */}
      {/* {isModalOpen && (
        <Modal title="Mark Leaves" isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          Modal Content Goes Here
        </Modal>
      )} */}
    </div>
  );
};

export default Leaves;
