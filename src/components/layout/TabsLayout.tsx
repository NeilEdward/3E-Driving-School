import {cn} from "@/lib/utils";
import {Button} from "../ui/button";

interface Tab {
  label: string;
  value: string;
  onClick?: () => void;
}

interface TabsLayoutProps {
  tabs: Tab[];
  activeValue: string;
  onTabChange: (value: string) => void;
  className?: string;
}

export const TabsLayout = ({tabs, activeValue, onTabChange, className = ""}: TabsLayoutProps) => {
  return (
    <div className={cn("flex justify-end gap-2 p-2 border-b-1 border-b-gray-300", className)}>
      {tabs.map((tab) => (
        <Button
          className="cursor-pointer border border-gray-800"
          key={tab.value}
          variant={activeValue === tab.value ? "default" : "ghost"}
          onClick={() => {
            onTabChange(tab.value);
            tab.onClick?.();
          }}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};
