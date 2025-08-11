export const studentDashboardData = {
  name: "Kyla Roque",
  enrolledCourse: "TDC",
  progress: {
    completed: 12,
    total: 15,
    percentage: 80,
  },
  nextLesson: {
    date: "2025-08-08",
    time: "10:30 AM",
    instructor: "Mr. Santos",
    vehicle: "Toyota Vios A1",
  },
  assessmentScores: [
    {type: "Theory", score: 88, passed: true},
    {type: "Practical", score: null, passed: false},
  ],
  payment: {
    totalFee: 3500,
    paid: 2000,
    balance: 1500,
    status: "Partial",
  },
  certificate: {
    status: "Not Eligible",
    available: false,
    issuedDate: null,
  },
};
