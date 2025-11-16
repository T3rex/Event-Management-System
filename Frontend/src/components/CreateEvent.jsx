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
    payload.startUTC = dayjs(startDate).tz(selectedTz).utc().toISOString();
    payload.endUTC = dayjs(endDate).tz(selectedTz).utc().toISOString();
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
    console.log({ startDate, endDate });
  }, [startDate]);

  return (
    <div className=" flex flex-col gap-5 p-4 font-bold rounded-xl shadow-2xl bg-gray-100">
      <h2>Create Event</h2>
      <div>
        <p>Profile</p>
        <ProfileDropdown
          selected={selectedProfiles}
          setSelected={setSelectedProfiles}
        />
      </div>
      <div>
        <p>Timezone</p>
        <TzCommand value={selectedTz} onChange={setSelectedTz} />
      </div>
      <div className="flex gap-5">
        <div className="text-center">
          <p>Start time</p>
          <DateTimePicker date={startDate} setDate={setStartDate} />
        </div>
        <div className="text-center">
          <p>End time</p>
          <DateTimePicker
            date={endDate}
            setDate={setEndDate}
            minDate={startDate}
            disabled={!startDate}
          />
        </div>
      </div>
      <div>
        <Button className="w-full cursor-pointer" onClick={handleCreateEvent}>
          + Create Event
        </Button>
      </div>
    </div>
  );
}

export default CreateEvent;
