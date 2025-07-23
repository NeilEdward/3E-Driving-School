import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/__authenticated/admin/_operations/students"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__authenticated/admin/operations/students"!</div>;
}
