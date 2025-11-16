import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import useProfile from "../store/profileStore";

function Header() {
  const { currentProfiles, setCurrentProfiles } = useProfile();
  return (
    <div className="w-full flex items-center justify-between py-4 px-30 bg-gray-200">
      <div>
        <h1 className="text-3xl">Event Management System</h1>
        <p>Manage your events efficiently</p>
      </div>
      <div>
        <ProfileDropdown
          selected={currentProfiles}
          setSelected={setCurrentProfiles}
        />
      </div>
    </div>
  );
}

export default Header;
