export const adminDashboardData = {
  stats: {
    totalStudents: 1542,
    totalInstructors: 63,
    totalRevenueThisMonth: 189500.0,
    pendingCertificates: 27,
    ltoComplianceIssues: 3,
  },
  enrollmentTrend: [
    {month: "January", count: 120},
    {month: "February", count: 385},
    {month: "April", count: 202},
    {month: "May", count: 547},
    {month: "June", count: 147},
    {month: "July", count: 247},
    {month: "August", count: 647},
  ],
  revenuePerBranch: [
    {branch: "San Jose City", revenue: 89500},
    {branch: "Cabanatuan", revenue: 53500},
    {branch: "Talavera", revenue: 46500},
  ],
  latestStudents: [
    {name: "Carlos Dela Cruz", branch: "Talavera", course: "TDC", registered: "2025-08-05"},
    {name: "Anna Mae Vergara", branch: "San Jose City", course: "PDC", registered: "2025-08-04"},
    {name: "Levi Cordero", branch: "Cabanatuan", course: "Refresher", registered: "2025-08-04"},
  ],
  expiringRegistrations: [
    {plateNumber: "ABC 1234", branch: "Cabanatuan", expiry: "2025-08-10"},
    {plateNumber: "XYZ 5678", branch: "Talavera", expiry: "2025-08-15"},
  ],
};
