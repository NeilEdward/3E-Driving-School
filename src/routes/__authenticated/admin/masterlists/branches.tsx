import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/__authenticated/admin/masterlists/branches"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__authenticated/admin/masterlist/branches"!</div>;
}
