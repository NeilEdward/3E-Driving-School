import CButton from "@/components/custom/CButton";
import CHeading from "@/components/custom/CHeading";
import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/__authenticated/admin/masterlists/instructors")({
  component: RouteComponent,
});

function RouteComponent() {
  const handleCreateInstructor = () => {
    console.log("instructor");
  };
  return (
    <div>
      <div className="flex justify-between items-center md:justify-start md:gap-4">
        <CHeading title="Instructors" />
        <CButton label="Create" onClick={handleCreateInstructor} />
      </div>
    </div>
  );
}
