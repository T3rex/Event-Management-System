import { useEffect, useState } from "react";
import useProfile from "../store/profileStore";
import ProfileDropdown from "./ProfileDropdown";
import TzCommand from "./TzCommand";
import DateTimePicker from "./DateTimePicker";
import { Button } from "@/components/ui/button";
import dayjs from "../utils/dayjsConfig";
import axios from "../config/axiosconfig";

function CreateEvent() {
  const { selectedProfiles, setSelectedProfiles } = useProfile();
  const [selectedTz, setSelectedTz] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleCreateEvent = async () => {
    const payload = {};
    if (
      selectedProfiles.length === 0 ||
      !selectedTz ||
      !startDate ||
      !endDate
    ) {
      alert("Please fill in all fields");
      return;
    }

    payload.profiles = selectedProfiles;
    payload.timezone = selectedTz;

    const formattedStart = dayjs(startDate).format("YYYY-MM-DD HH:mm:ss");
    const formattedEnd = dayjs(endDate).format("YYYY-MM-DD HH:mm:ss");

    payload.startUTC = dayjs
      .tz(formattedStart, "YYYY-MM-DD HH:mm:ss", selectedTz)
      .utc()
      .toISOString();

    payload.endUTC = dayjs
      .tz(formattedEnd, "YYYY-MM-DD HH:mm:ss", selectedTz)
      .utc()
      .toISOString();

    console.log(payload);

    const response = await axios.post("/api/v1/event", payload);

    if (response.status === 201) {
      alert("Event created successfully");
    } else {
      alert("Error creating event");
      console.error("Error creating event:", response.data.message);
    }

    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedProfiles([]);
    setSelectedTz("");
  };

  useEffect(() => {
    if (startDate && endDate && startDate >= endDate) {
      setEndDate(undefined);
    }
  }, [startDate]);

  return (
    <div className="flex flex-col gap-5 p-4 font-bold border-2 mt-6 rounded-xl shadow-2xl bg-gray-100 w-full max-w-xl mx-auto">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold">Create Event</h2>

      {/* Profile */}
      <div className="flex flex-col gap-1">
        <p className="text-sm sm:text-base">Profile</p>
        <ProfileDropdown
          selected={selectedProfiles}
          setSelected={setSelectedProfiles}
        />
      </div>

      {/* Timezone */}
      <div className="flex flex-col gap-1">
        <p className="text-sm sm:text-base">Timezone</p>
        <TzCommand value={selectedTz} onChange={setSelectedTz} />
      </div>

      {/* Start & End Time */}
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm sm:text-base mb-1">Start Time</p>
          <DateTimePicker date={startDate} setDate={setStartDate} />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm sm:text-base mb-1">End Time</p>
          <DateTimePicker
            date={endDate}
            setDate={setEndDate}
            minDate={startDate}
            disabled={!startDate}
          />
        </div>
      </div>

      {/* Button */}
      <Button
        className="w-full cursor-pointer text-base"
        onClick={handleCreateEvent}
      >
        + Create Event
      </Button>
    </div>
  );
}

export default CreateEvent;
