export type StatusCountsProps = {
  stats: {
    totalStudents: number;
    totalInstructors: number;
    totalRevenueThisMonth: number;
    pendingCertificates: number;
  };
};

export type EnrollmentTrendItem = {
  month: string;
  count: number;
};

export type EnrollmentTrendProps = {
  enrollmentTrend: EnrollmentTrendItem[];
};

export type RevenueItem = {
  branch: string;
  revenue: number;
};

export type BranchRevenueProps = {
  branchRevenue: RevenueItem[];
};

export type AvailableCar = {
  plateNumber: string;
  branch: string;
  model: string;
  status: string;
};

export type AvailableCarsProps = {
  availableCars: AvailableCar[];
};

export type BranchStatusCountsProps = {
  stats: {
    activeStudents: number;
    todayLessons: number;
    instructorsAvailable: number;
    vehiclesAvailable: number;
    pendingPayments: number;
  };
};

export type Schedule = {
  student: string;
  time: string;
  instructor: string;
  vehicle: string;
};

export type BranchScheduleTodayProps = {
  scheduleToday: Schedule[];
};

export type NearingCompletionItem = {
  student: string;
  course: string;
  completed: number;
  required: number;
};

export type NearingCompletionProps = {
  nearingCompletion: NearingCompletionItem[];
};

export type VehicleMaintenanceItem = {
  plate: string;
  model: string;
  nextMaintenance: string;
};

export type VehicleMaintenanceScheduleProps = {
  maintenanceSchedule: VehicleMaintenanceItem[];
};
