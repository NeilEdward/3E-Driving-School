import type {RootState} from "@/app/store";
import UserDropdown from "../UserDropdown";
import {useSelector} from "react-redux";

export const UserAccount = () => {
  const {user} = useSelector((state: RootState) => state?.user);
  console.log({user});
  return (
    <div className="flex items-center gap-2 me-5">
      <p className="hidden md:block">{user?.name}</p>
      <UserDropdown />
    </div>
  );
};
