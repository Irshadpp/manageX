interface CountByDay {
    date: Date;
    count: number;
  }
  
  interface TaskCount {
    date: Date;
    completed: number;
    planning: number;
    backlog: number;
    active: number;
  }

  export type {
    CountByDay,
    TaskCount,
  };