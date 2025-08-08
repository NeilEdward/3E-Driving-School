import {adminDashboardData} from "@/static/admin-dashboard.static";
import {Card, CardContent, CardHeader} from "../ui/card";

type StatusCountsProps = {
  stats: {
    totalStudents: number;
    totalInstructors: number;
    totalRevenueThisMonth: number;
    pendingCertificates: number;
  };
};

const AdminDashboard = () => {
  const data = adminDashboardData;

  return (
    <div className="w-full flex flex-col gap-1">
      <h1 className="mb-2 font-medium text-lg">Administrator Dashboard</h1>
      <StatusCounts stats={data.stats} />
    </div>
  );
};

function StatusCounts({stats}: StatusCountsProps) {
  const extractLabelFromKey = (key: string) => {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  };

  const statsArray = (Object.entries(stats) as [keyof typeof stats, number][]).map(
    ([key, value]) => ({
      key,
      label: extractLabelFromKey(key),
      value,
    })
  );

  return (
    <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-2">
      {statsArray.map(({key, label, value}) => (
        <Card
          key={key}
          className="w-full border border-neutral-200 bg-white rounded-xl shadow-none"
        >
          <CardHeader className="pb-1">
            <p className="text-sm font-medium text-neutral-500">{label}</p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-neutral-800">{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default AdminDashboard;
