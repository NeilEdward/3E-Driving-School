import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__authenticated/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/ this is authenticated route"!</div>;
}
