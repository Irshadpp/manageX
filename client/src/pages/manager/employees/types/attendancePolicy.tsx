export interface AttendancePolicyType {
    id: string;
    officeStartTime: string;
    lateThreshold: string;
    halfDayThreshold: number;
    fullDayThreshold: number;
    leavePolicy: {
      sickLeaves: number;
      casualLeaves: number;
      vacationLeaves: number;
    };
  }
  