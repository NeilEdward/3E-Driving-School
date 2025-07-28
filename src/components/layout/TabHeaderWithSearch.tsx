import {cn} from "@/lib/utils";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {Search} from "lucide-react";
import {useNavigate} from "@tanstack/react-router";
import {useState} from "react";
import {useDebouncedCallback} from "use-debounce";
import {Route as BranchRoute} from "@/routes/__authenticated/admin/masterlists/branches";

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
  className = "",
  onTabChange,
}: TabHeaderWithSearchProps) => {
  const navigate = useNavigate({from: BranchRoute.fullPath});
  const searchParams = BranchRoute.useSearch();
  const [searchValue, setSearchValue] = useState(searchParams?.search ?? "");

  const handleChangeParams = (tab: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        status: tab as "active" | "inactive",
      }),
    });
  };

  const debouncedSearch = useDebouncedCallback((value: string): void => {
    navigate({
      search: (prev) => {
        const next = {...prev};
        if (value.trim()) {
          next.search = value;
        } else {
          delete next.search;
        }
        return next;
      },
    });
  }, 500);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    debouncedSearch(value);
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
