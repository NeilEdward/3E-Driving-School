import {render, screen, within} from "@testing-library/react";
import AdminDashboard from "../components/layout/AdminDashboard";
import {adminDashboardData} from "@/static/admin-dashboard.static";
import {describe, expect, it, vi} from "vitest";

vi.mock("recharts", () => ({
  AreaChart: ({children}: any) => <div data-testid="area-chart">{children}</div>,
  Area: () => <div data-testid="area" />,
  CartesianGrid: () => <div data-testid="grid" />,
  XAxis: () => <div data-testid="x-axis" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  ResponsiveContainer: ({children}: any) => (
    <div data-testid="responsive-container">{children}</div>
  ),
}));

describe("AdminDashboard", () => {
  it("renders the dashboard title", () => {
    render(<AdminDashboard />);
    expect(screen.getByRole("heading", {name: /administrator dashboard/i})).toBeInTheDocument();
  });

  it("renders status counts from data", () => {
    render(<AdminDashboard />);
    Object.entries(adminDashboardData.stats).forEach(([_, value]) => {
      expect(screen.getByText(value.toString())).toBeInTheDocument();
    });
  });

  it("renders enrollment trend chart", () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/enrollment trend/i)).toBeInTheDocument();
    expect(screen.getByTestId("area-chart")).toBeInTheDocument();
  });

  it("renders branch revenues with correct formatting", () => {
    render(<AdminDashboard />);

    adminDashboardData.revenuePerBranch.forEach((branch) => {
      // Select the container div by data-branch attribute
      const container = document.querySelector(`[data-branch="${branch.branch}"]`);
      expect(container).toBeInTheDocument();

      // Within that container, check the branch name text
      expect(within(container as HTMLElement).getByText(branch.branch)).toBeInTheDocument();

      // Within that container, check the revenue formatted text
      expect(
        within(container! as HTMLElement).getByText(
          branch.revenue.toLocaleString("en-PH", {
            style: "currency",
            currency: "PHP",
          })
        )
      ).toBeInTheDocument();
    });
  });

  it("renders available cars list", () => {
    render(<AdminDashboard />);
    adminDashboardData.availableCars.forEach((car) => {
      const row = screen.getByText(car.plateNumber).closest("div");
      expect(within(row!).getByText(car.model)).toBeInTheDocument();
      expect(within(row!).getByText(car.branch)).toBeInTheDocument();
      expect(within(row!).getByText(car.status)).toBeInTheDocument();
    });
  });
});
