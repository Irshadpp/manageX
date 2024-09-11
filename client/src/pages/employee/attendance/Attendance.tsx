import React, { useEffect, useState } from 'react';
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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { DialogDescription } from '@radix-ui/react-dialog';
import { Label } from '@/components/ui/label';
import AttendanceDialog from './AttendanceDialog';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchAttendance } from '@/store/attendanceThunk';


const Attendance: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{from: Date, to: Date} | undefined>(undefined);
  const [attendanceType, setAttendanceType] = useState<'checkin' | 'checkout'>('checkin');
  const [remarks, setRemarks] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const dispatch = useDispatch<AppDispatch>();
  const {attendanceData} = useSelector((state: RootState) => state.attendance);

  const handleSave = () => {
    // Handle save logic
    setModalOpen(false);
  };

  useEffect(()=>{
    dispatch(fetchAttendance());
  }, [dispatch])


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendanceData && attendanceData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(attendanceData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex justify-between items-center">
        <DatePickerWithRange className="mr-auto" />
        <AttendanceDialog/>
      </div>

      <div className="flex flex-col gap-6">
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
              {currentItems && currentItems.map((log: any, idx) => (
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

    </div>
  );
};

export default Attendance;
