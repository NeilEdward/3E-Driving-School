import {branchDashboardData} from "@/static/branch-dashboard.static";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";
import {CalendarDays} from "lucide-react";
import moment from "moment";
import type {
  BranchScheduleTodayProps,
  BranchStatusCountsProps,
  NearingCompletionProps,
  VehicleMaintenanceScheduleProps,
} from "@/types/dashboard.types";
import extractLabelFromKey from "@/utils/extract-label";

const BranchDashboard = () => {
  const data = branchDashboardData;

  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="mb-2 font-medium text-lg">Manager Dashboard</h1>
      <StatusCounts stats={data.stats} />
      <ScheduleToday scheduleToday={data.scheduleToday} />
      <div className="w-full flex flex-col lg:flex-row gap-2">
        <NearingCompletion nearingCompletion={data.nearingCompletion} />
        <VehicleMaintenanceSchedule maintenanceSchedule={data.maintenanceSchedule} />
      </div>
    </div>
  );
};

function StatusCounts({stats}: BranchStatusCountsProps) {
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

export function ScheduleToday({scheduleToday}: BranchScheduleTodayProps) {
  const getScheduleDetails = (schedule: (typeof scheduleToday)[number]) => [
    {label: "Time", value: schedule.time},
    {label: "Vehicle", value: schedule.vehicle},
    {label: "Instructor", value: schedule.instructor},
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
                data-testid={`student-card-${i}`}
              >
                <CardHeader className="pb-2">
                  <p
                    className="text-base font-medium text-amber-700"
                    data-testid={`student-name-${i}`}
                  >
                    {schedule.student}
                  </p>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {getScheduleDetails(schedule).map((detail, j) => (
                    <div
                      key={j}
                      className="flex justify-between text-neutral-500"
                      data-testid={`schedule-detail-${i}-${j}`}
                    >
                      <span>{detail.label}</span>
                      <span
                        className="text-neutral-800 font-medium"
                        data-testid={`schedule-value-${i}-${j}`}
                      >
                        {detail.value}
                      </span>
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

export function NearingCompletion({nearingCompletion}: NearingCompletionProps) {
  return (
    <Card
      className="h-40 overflow-y-scroll w-full border border-neutral-200 bg-white rounded-xl shadow-none"
      data-testid="nearing-completion-card"
    >
      <CardHeader className="pb-2 px-3 lg:px-5">
        <CardTitle
          className="text-lg font-semibold text-neutral-800"
          data-testid="nearing-completion-title"
        >
          Nearing Completion
        </CardTitle>
        <CardDescription
          className="text-sm text-neutral-500"
          data-testid="nearing-completion-description"
        >
          Students nearing completion for driving course
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4" data-testid="nearing-completion-content">
        {nearingCompletion.map((completer, i) => {
          const progress = Math.round((completer.completed / completer.required) * 100);

          return (
            <div
              key={`${completer.student}-${completer.course}-${i}`}
              className="flex flex-col gap-1 border-b border-neutral-100 pb-3 last:border-0 last:pb-0"
              data-testid={`nearing-completion-item-${i}`}
            >
              <div
                className="flex justify-between items-center"
                data-testid={`nearing-completion-header-${i}`}
              >
                <div>
                  <p
                    className="text-sm font-medium text-neutral-800"
                    data-testid={`student-name-${i}`}
                  >
                    {completer.student}
                  </p>
                  <p className="text-xs text-neutral-500" data-testid={`course-name-${i}`}>
                    {completer.course}
                  </p>
                </div>
                <p
                  className="text-sm font-medium text-neutral-700"
                  data-testid={`progress-text-${i}`}
                >
                  {completer.completed}/{completer.required}
                </p>
              </div>

              {/* Progress bar */}
              <div
                className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden"
                data-testid={`progress-bar-wrapper-${i}`}
              >
                <div
                  className="h-full bg-amber-500 rounded-full transition-all"
                  style={{width: `${progress}%`}}
                  data-testid={`progress-bar-${i}`}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function VehicleMaintenanceSchedule({maintenanceSchedule}: VehicleMaintenanceScheduleProps) {
  return (
    <Card
      className="h-40 overflow-y-scroll w-full border border-neutral-200 bg-white rounded-xl shadow-none"
      data-testid="vehicle-maintenance-schedule"
    >
      <CardHeader className="pb-2 px-3 lg:px-5">
        <CardTitle
          className="text-lg font-semibold text-neutral-800"
          data-testid="maintenance-schedule-title"
        >
          Vehicle Maintenance Schedule
        </CardTitle>
        <CardDescription
          className="text-sm text-neutral-500"
          data-testid="maintenance-schedule-description"
        >
          Scheduled date for vehicle PMS
        </CardDescription>
      </CardHeader>

      <CardContent className="px-3 lg:px-5 space-y-3">
        {maintenanceSchedule.length === 0 ? (
          <p className="text-sm text-neutral-500" data-testid="no-vehicles">
            No vehicles scheduled.
          </p>
        ) : (
          maintenanceSchedule.map((vehicle, i) => (
            <div
              key={vehicle.plate}
              className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 hover:bg-neutral-50 transition-colors"
              data-testid={`maintenance-item-${i}`}
            >
              <div className="flex flex-col">
                <span className="font-medium text-neutral-800" data-testid={`vehicle-plate-${i}`}>
                  {vehicle.plate}
                </span>
                <span className="text-sm text-neutral-500" data-testid={`vehicle-model-${i}`}>
                  {vehicle.model}
                </span>
              </div>
              <div
                className="flex items-center gap-2 text-sm text-neutral-700"
                data-testid={`maintenance-date-container-${i}`}
              >
                <CalendarDays className="w-4 h-4 text-neutral-500" />
                <span data-testid={`maintenance-date-${i}`}>
                  {moment(vehicle.nextMaintenance).format("LL")}
                </span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export default BranchDashboard;
