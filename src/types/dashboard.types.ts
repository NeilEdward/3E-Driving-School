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
