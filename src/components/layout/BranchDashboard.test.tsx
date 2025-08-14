import {render, screen} from "@testing-library/react";
import BranchDashboard, {NearingCompletion, VehicleMaintenanceSchedule} from "./BranchDashboard";
import {branchDashboardData} from "@/static/branch-dashboard.static";
import {describe, it, expect} from "vitest";
import moment from "moment";

// Mock lucide-react icons used in component
vi.mock("lucide-react", () => ({
  CalendarDays: () => <svg data-testid="calendar-days-icon" />,
}));

describe("BranchDashboard", () => {
  it("renders main dashboard title", () => {
    render(<BranchDashboard />);
    expect(screen.getByRole("heading", {name: /manager dashboard/i})).toBeInTheDocument();
  });

  it("renders status counts from data", () => {
    render(<BranchDashboard />);
    Object.entries(branchDashboardData.stats).forEach(([key, value]) => {
      const label = key
        .replace(/([A-Z])/g, " $1") // simple camelCase to words conversion
        .toLowerCase();
      expect(screen.getByText(new RegExp(label, "i"))).toBeInTheDocument();
      expect(screen.getByText(value.toString())).toBeInTheDocument();
    });
  });

  it("renders today schedules with correct student names and details", () => {
    render(<BranchDashboard />);
    expect(screen.getByText(/today’s schedules/i)).toBeInTheDocument();
  });

  describe("NearingCompletion", () => {
    it("renders nearing completion section with students and progress bars", () => {
      render(<NearingCompletion nearingCompletion={branchDashboardData.nearingCompletion} />);

      // Check title and description
      expect(screen.getByTestId("nearing-completion-title")).toHaveTextContent(
        /nearing completion/i
      );
      expect(screen.getByTestId("nearing-completion-description")).toHaveTextContent(
        /students nearing completion/i
      );

      branchDashboardData.nearingCompletion.forEach(({student, course, completed, required}, i) => {
        // Check student name, course, and progress text
        expect(screen.getByTestId(`student-name-${i}`)).toHaveTextContent(student);
        expect(screen.getByTestId(`course-name-${i}`)).toHaveTextContent(course);
        expect(screen.getByTestId(`progress-text-${i}`)).toHaveTextContent(
          `${completed}/${required}`
        );

        // Check progress bar width style
        const progressPercent = Math.round((completed / required) * 100);
        const progressBar = screen.getByTestId(`progress-bar-${i}`);
        expect(progressBar).toHaveStyle(`width: ${progressPercent}%`);
      });
    });
  });

  it("renders vehicle maintenance schedule with dates and plates", () => {
    render(
      <VehicleMaintenanceSchedule maintenanceSchedule={branchDashboardData.maintenanceSchedule} />
    );

    // Title & description
    expect(screen.getByTestId("maintenance-schedule-title")).toHaveTextContent(
      /vehicle maintenance schedule/i
    );
    expect(screen.getByTestId("maintenance-schedule-description")).toHaveTextContent(
      /scheduled date for vehicle pms/i
    );

    if (branchDashboardData.maintenanceSchedule.length === 0) {
      expect(screen.getByTestId("no-vehicles")).toHaveTextContent(/no vehicles scheduled/i);
    } else {
      branchDashboardData.maintenanceSchedule.forEach(({plate, model, nextMaintenance}, i) => {
        expect(screen.getByTestId(`vehicle-plate-${i}`)).toHaveTextContent(plate);
        expect(screen.getByTestId(`vehicle-model-${i}`)).toHaveTextContent(model);

        const formattedDate = moment(nextMaintenance).format("LL");
        expect(screen.getByTestId(`maintenance-date-${i}`)).toHaveTextContent(formattedDate);
      });
    }
  });
});
