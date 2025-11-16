import React, { useEffect, useState } from "react";
import axios from "../config/axiosconfig";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useProfile from "../store/profileStore";

export default function ProfileDropdown({ selected, setSelected }) {
  const profileStore = useProfile();
  const [profileName, setProfileName] = useState("");
  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("/api/v1/profile");
        const data = await response.data;
        profileStore.setProfiles(data.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  const handleSaveProfile = async () => {
    if (!profileName.trim()) return;

    try {
      const response = await axios.post("/api/v1/profile", {
        name: profileName,
      });

      const data = await response.data;

      if (data?.data) {
        profileStore.addProfile(data.data);
      }

      setProfileName("");
      setAddNew(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[520px]">
          {selected.length ? `${selected.length} selected` : "Select profiles"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-[320px]">
        <Command shouldFilter={true}>
          <CommandInput placeholder="Search profiles..." />

          <CommandList>
            <CommandEmpty>No profiles found</CommandEmpty>

            <CommandGroup heading="Profiles">
              {profileStore.profiles.map((p) => (
                <CommandItem
                  value={p.name}
                  key={p._id}
                  onSelect={() => toggleSelect(p._id)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{p.name}</span>

                    {selected.includes(p._id) && (
                      <span className="text-xs opacity-80 ml-2">✓</span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>

            <div className="border-t p-2">
              {addNew ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="New profile name"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                  />
                  <Button
                    className="cursor-pointer"
                    onClick={handleSaveProfile}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full cursor-pointer bg-black text-white"
                  onClick={() => setAddNew(true)}
                >
                  + Add New Profile
                </Button>
              )}
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
