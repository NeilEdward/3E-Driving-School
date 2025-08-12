import {instructorDashboardData} from "@/static/instructor-dashboard.static";

const InstructorDashboard = () => {
  const data = instructorDashboardData;
  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="mb-2 font-medium text-lg">Instructor Dashboard</h1>
      {/* <StatusCounts stats={data.stats} /> */}

      <div className="w-full flex flex-col lg:flex-row gap-2"></div>
    </div>
  );
};

export default InstructorDashboard;
