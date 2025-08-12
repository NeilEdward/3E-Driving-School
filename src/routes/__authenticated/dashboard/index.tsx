import type {RootState} from "@/app/store";
import AdminDashboard from "@/components/layout/AdminDashboard";
import BranchDashboard from "@/components/layout/BranchDashboard";
import InstructorDashboard from "@/components/layout/InstructorDashboard";
import StudentDashboard from "@/components/layout/StudentDashboard";
import {createFileRoute} from "@tanstack/react-router";
import type {JSX} from "react";
import {useSelector} from "react-redux";

export const Route = createFileRoute("/__authenticated/dashboard/")({
  component: RouteComponent,
});

type Role = "admin" | "manager" | "instructor" | "student";

function RouteComponent() {
  const {user} = useSelector((state: RootState) => state?.user);
  console.log({user});

  const role = "instructor" as Role;

  const dashboards: Record<Role, JSX.Element> = {
    admin: <AdminDashboard />,
    manager: <BranchDashboard />,
    instructor: <InstructorDashboard />,
    student: <StudentDashboard />,
  };

  return role ? dashboards[role] : null;
}
