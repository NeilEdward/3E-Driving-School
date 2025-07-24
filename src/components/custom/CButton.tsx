import React from "react";
import { Button } from "../ui/button";

type CButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

const CButton = ({ label, ...props }: CButtonProps) => {
  return (
    <Button
      className="text-amber-400 hover:bg-amber-500 hover:text-black cursor-pointer active:bg-amber-600"
      {...props}
    >
      {label}
    </Button>
  );
};

export default CButton;
