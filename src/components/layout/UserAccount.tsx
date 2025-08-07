import UserDropdown from "../UserDropdown";

export const UserAccount = () => {
  return (
    <div className="flex items-center gap-2 me-5">
      <p className="hidden md:block">Neil Edward Dela Cruz</p>
      <UserDropdown />
    </div>
  );
};
