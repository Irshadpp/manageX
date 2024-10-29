export interface AttendanceLog{
  id: string;
  status: string;
  remarks: string;
  date: string;
  checkIn: string;
  checkOut: string;
}

export interface Employee {
    id: string;
    fName: string;
    lName: string;
    username: string;
    email: string;
    role: string;
    profileURL: string;
    phone: string;
    gender: string;
    employeeType: string;
    hiringDate: Date;
    salary: number;
    organizationId: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipcode: string;
    }
    attendanceLogs: AttendanceLog[];
    // tasks: Tasks[]
  }

  export interface EmployeeApiData{
    employees: Employee[];
    totalPages: number;
  }
  
  export interface EmployeeState {
    employees: Employee[];
    exEmployees: any[];
    totalPages: number;
    loading: boolean;
    error: string | null;
    isUpdating: boolean;
    shouldRefetch: boolean; 
  }
  
  export const initialState: EmployeeState = {
    employees: [],
    exEmployees: [],
    totalPages: 0,
    loading: false,
    error: null,
    isUpdating: false,
    shouldRefetch: false
  };
  