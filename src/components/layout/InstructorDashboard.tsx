import {instructorDashboardData} from "@/static/instructor-dashboard.static";
import extractLabelFromKey from "@/utils/extract-label";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";

type InstructorStatusCountsProps = {
  stats: {
    lessonsToday: number;
    assignedStudents: number;
    recentAssessments: number;
  };
};

type LessonSchedule = {
  time: string;
  student: string;
  course: string;
  location: string;
};

type LessonSchedeleProps = {
  scheduleToday: LessonSchedule[];
};

const InstructorDashboard = () => {
  const data = instructorDashboardData;
  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="mb-2 font-medium text-lg">Instructor Dashboard</h1>
      <StatusCounts stats={data.stats} />
      <ScheduleToday scheduleToday={data.lessonSchedule} />

      <div className="w-full flex flex-col lg:flex-row gap-2">
        <Todos />
        <Todos />
      </div>
    </div>
  );
};

export function StatusCounts({stats}: InstructorStatusCountsProps) {
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

export function ScheduleToday({scheduleToday}: LessonSchedeleProps) {
  const getScheduleDetails = (schedule: (typeof scheduleToday)[number]) => [
    {label: "Time", value: schedule.time},
    {label: "Student", value: schedule.student},
    {label: "Course", value: schedule.course},
    {label: "Location", value: schedule.location},
  ];

  return (
    <Card className="w-full border border-neutral-200 bg-white rounded-xl shadow-none">
      <CardHeader className="pb-2 px-3 lg:px-5">
        <CardTitle className="text-lg font-semibold text-neutral-800">Today’s Schedules</CardTitle>
        <CardDescription className="text-sm text-neutral-500">
          Students booked for driving lessons today
        </CardDescription>
      </CardHeader>

      <CardContent className="p-3 lg:p-5">
        <div className="flex flex-col lg:flex-row lg:gap-4">
          {scheduleToday.map((schedule, i) => {
            return (
              <Card
                key={i}
                className="flex-1 border-none border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg"
              >
                <CardHeader className="pb-2">
                  <p className="text-base font-medium text-amber-700">{schedule.student}</p>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {getScheduleDetails(schedule).map((detail, j) => (
                    <div key={j} className="flex justify-between text-neutral-500">
                      <span>{detail.label}</span>
                      <span className="text-neutral-800 font-medium">{detail.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function Todos() {
  return (
    <Card className="w-full border border-neutral-200 bg-white rounded-xl shadow-none">
      <CardHeader className="pb-2 px-3 lg:px-5">
        <CardTitle className="text-lg font-semibold text-neutral-800">Todos</CardTitle>
        <CardDescription className="text-sm text-neutral-500">
          Track your work plan today
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
export default InstructorDashboard;
