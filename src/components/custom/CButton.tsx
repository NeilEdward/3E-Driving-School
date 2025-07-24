import React from "react";
import { Button } from "../ui/button";

type CButtonProps = {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => unknown;
};

const CButton = ({ label, onClick }: CButtonProps) => {
  return (
    <Button
      className="text-amber-400 hover:bg-amber-500 hover:text-black cursor-pointer active:bg-amber-600"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CButton;
