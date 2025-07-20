import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__auth/register"!</div>;
}
