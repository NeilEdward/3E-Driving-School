import React from "react";
import {Button} from "../ui/button";

type CButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

const CButton = ({label, ...props}: CButtonProps) => {
  return (
    <Button className="cursor-pointer" {...props}>
      {label}
    </Button>
  );
};

export default CButton;
