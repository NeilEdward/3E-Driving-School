import {adminDashboardData} from "@/static/admin-dashboard.static";
import {TrendingUp} from "lucide-react";
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Badge} from "../ui/badge";
import {cn} from "@/lib/utils";

type StatusCountsProps = {
  stats: {
    totalStudents: number;
    totalInstructors: number;
    totalRevenueThisMonth: number;
    pendingCertificates: number;
  };
};

type EnrollmentTrendItem = {
  month: string;
  count: number;
};

type EnrollmentTrendProps = {
  enrollmentTrend: EnrollmentTrendItem[];
};

type RevenueItem = {
  branch: string;
  revenue: number;
};

type BranchRevenueProps = {
  branchRevenue: RevenueItem[];
};

const AdminDashboard = () => {
  const data = adminDashboardData;

  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="mb-2 font-medium text-lg">Administrator Dashboard</h1>
      <StatusCounts stats={data.stats} />
      <EnrollmentTrend enrollmentTrend={data.enrollmentTrend} />
      <div className="w-full flex flex-col lg:flex-row gap-2">
        <BranchRevenue branchRevenue={data.revenuePerBranch} />
        <BranchRevenue branchRevenue={data.revenuePerBranch} />
      </div>
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

export const description = "A linear area chart";

const chartConfig = {
  count: {
    label: "Enrollees",
    color: "var(--chart-1)",
  },
};

export function EnrollmentTrend({enrollmentTrend}: EnrollmentTrendProps) {
  return (
    <Card className=" shadow-none">
      <CardHeader>
        <CardTitle>Enrollment Trend</CardTitle>
        <CardDescription>Showing total visitors for the last 4 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-50 w-full">
          <AreaChart
            accessibilityLayer
            data={enrollmentTrend}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="count"
              type="linear"
              fill="var(--color-count)"
              fillOpacity={0.4}
              stroke="var(--color-count)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - August 2025
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function BranchRevenue({branchRevenue}: BranchRevenueProps) {
  const hasMeetsTargetQuota = (revenue: number) => {
    const targetQuota = 50000;
    return revenue > targetQuota;
  };

  const setBadgeBGColor = (revenue: number) => {
    let badgeColors;

    if (hasMeetsTargetQuota(revenue)) {
      badgeColors = "bg-green-200 text-green-700";
    } else {
      badgeColors = "bg-red-300 text-red-700";
    }
    return badgeColors;
  };

  return (
    <Card className="w-full h-30 overflow-y-scroll shadow-none">
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
        <CardDescription>Breakdowns of revenues per branch</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {branchRevenue?.map((data) => (
            <div className="w-full flex flex-row pb-2 justify-between border-b border-gray-200">
              <p>{data.branch}</p>
              <Badge className={cn("rounded-2xl", setBadgeBGColor(data.revenue))}>
                {data.revenue.toLocaleString("en-PH", {
                  style: "currency",
                  currency: "PHP",
                })}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminDashboard;
