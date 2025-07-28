import {cn} from "@/lib/utils";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {Search} from "lucide-react";
import {useNavigate} from "@tanstack/react-router";
import {Route as BranchRoute} from "@/routes/__authenticated/admin/masterlists/branches";
import {useState} from "react";

interface Tab {
  label: string;
  value: string;
  onClick?: () => void;
}

interface TabHeaderWithSearchProps {
  tabs: Tab[];
  activeValue: string;
  onTabChange: (value: string) => void;
  className?: string;
}

export const TabHeaderWithSearch = ({
  tabs,
  activeValue,
  onTabChange,
  className = "",
}: TabHeaderWithSearchProps) => {
  const navigate = useNavigate({from: BranchRoute.fullPath});
  const [searchValue, setSearchValue] = useState("");

  const handleChangeParams = (tab: string) => {
    console.log({tab}, "TAB");
    navigate({
      search: (prev) => ({
        ...prev,
        status: tab as "active" | "inactive",
      }),
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    navigate({
      search: (prev) => ({
        ...prev,
        filter: value,
      }),
    });
  };

  return (
    <div className={cn("flex justify-end gap-2 px-2 py-3 border-b-1 border-b-gray-300", className)}>
      <div className="relative">
        <Input
          type="search"
          className="pl-8"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search branches..."
        />
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search size={18} />
        </span>
      </div>
      {tabs.map((tab) => (
        <Button
          className="cursor-pointer border border-gray-800"
          key={tab.value}
          variant={activeValue === tab.value ? "default" : "ghost"}
          onClick={() => {
            onTabChange(tab.value);
            handleChangeParams(tab.value);
            tab.onClick?.();
          }}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};
