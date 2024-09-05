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
    hiringData: Date;
    salary: number;
    organizationId: string;
    // tasks: Task[];
    // attendanceLogs: AttendanceLog[];
  }
  
  export interface EmployeeState {
    employees: Employee[];
    loading: boolean;
    error: string | null;
    isUpdating: boolean;
    shouldRefetch: boolean; 
  }
  
  export const initialState: EmployeeState = {
    employees: [],
    loading: false,
    error: null,
    isUpdating: false,
    shouldRefetch: false
  };
  