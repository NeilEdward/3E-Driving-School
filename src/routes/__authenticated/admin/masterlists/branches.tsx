import CButton from "@/components/custom/CButton";
import CHeading from "@/components/custom/CHeading";
import { createFileRoute } from "@tanstack/react-router";
import { BranchesTable } from "./_components/BranchesTable";
import { columns } from "@/utils/table-columns.branches";
import { branches } from "@/utils/table-data.branches";

export const Route = createFileRoute(
  "/__authenticated/admin/masterlists/branches"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const data = branches;
  return (
    <div>
      <div className="flex justify-between items-center md:justify-start md:gap-4">
        <CHeading title="Branches" />
        <CButton
          label="Create"
          onClick={() => {
            console.log("CLICKED");
          }}
        />
      </div>
      <BranchesTable columns={columns} data={data} />
    </div>
  );
}
