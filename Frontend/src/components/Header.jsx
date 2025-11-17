import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import useProfile from "../store/profileStore";

function Header() {
  const { currentProfiles, setCurrentProfiles } = useProfile();
  return (
    <div className="w-full bg-gray-200 px-4 py-4 sm:px-6 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title Section */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Event Management System
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your events efficiently
          </p>
        </div>

        {/* Profile Dropdown */}
        <div className="flex justify-center md:justify-end">
          <ProfileDropdown
            selected={currentProfiles}
            setSelected={setCurrentProfiles}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
