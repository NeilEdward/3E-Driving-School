import type {RootState} from "@/app/store";
import AdminDashboard from "@/components/layout/AdminDashboard";
import {createFileRoute} from "@tanstack/react-router";
import {useSelector} from "react-redux";

export const Route = createFileRoute("/__authenticated/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {user} = useSelector((state: RootState) => state?.user);
  console.log({user});
  return (
    <div>
      <AdminDashboard />
    </div>
  );
}
