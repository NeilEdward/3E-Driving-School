export const branchDashboardData = {
  stats: {
    activeStudents: 215,
    todayLessons: 31,
    instructorsAvailable: 7,
    vehiclesAvailable: 5,
    pendingPayments: 12,
  },
  scheduleToday: [
    {
      student: "Janine Alcantara",
      time: "9:00 AM",
      instructor: "Mr. Santos",
      vehicle: "TOYOTA Vios A1",
    },
    {
      student: "Miguel Reyes",
      time: "10:30 AM",
      instructor: "Ms. Lacsamana",
      vehicle: "TOYOTA Vios A3",
    },
    {student: "Nina Cruz", time: "1:00 PM", instructor: "Mr. dela Vega", vehicle: "Honda City B2"},
  ],
  nearingCompletion: [
    {student: "Joseph L. Ramos", course: "PDC", completed: 9, required: 10},
    {student: "Kyla Roque", course: "TDC", completed: 14, required: 15},
  ],
  maintenanceSchedule: [
    {plate: "XYZ 5678", model: "Honda City", nextMaintenance: "2025-09-10"},
    {plate: "AAA 2345", model: "Hyundai Accent", nextMaintenance: "2025-10-14"},
    {plate: "BBB 1336", model: "Honda BR-V", nextMaintenance: "2025-12-14"},
  ],
};
