import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/__authenticated/admin/masterlists/to/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__authenticated/admin/masterlists/to/"!</div>;
}
