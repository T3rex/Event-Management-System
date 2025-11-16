import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { FaEdit } from "react-icons/fa";
import ProfileDropdown from "./ProfileDropdown";
import { useEffect, useState } from "react";
import TzCommand from "./TzCommand";
import DateTimePicker from "./DateTimePicker";
import dayjs from "../utils/dayjsConfig";
import { Button } from "@/components/ui/button";
import axios from "../config/axiosconfig";
import useEvent from "../store/eventStore";

function getDateForPicker(utcString, timezone) {
  const d = dayjs.utc(utcString).tz(timezone);

  return new Date(
    d.year(),
    d.month(),
    d.date(),
    d.hour(),
    d.minute(),
    d.second()
  );
}

export default function UpdateDialog({ event }) {
  const [selectedProfiles, setSelectedProfiles] = useState(
    event.profiles.map((p) => p._id)
  );
  const [selectedTz, setSelectedTz] = useState(event.timezone);
  const [startDate, setStartDate] = useState(
    getDateForPicker(event.startUTC, event.timezone)
  );

  const { updateEvent } = useEvent();

  const [endDate, setEndDate] = useState(
    getDateForPicker(event.endUTC, event.timezone)
  );

  const handleUpdateEvent = async () => {
    try {
      const payload = {};
      if (selectedProfiles.length === 0) {
        alert("Profile selection cannot be empty");
        return;
      }
      if (!selectedTz) {
        alert("Timezone cannot be empty");
        return;
      }

      if (!startDate || !endDate) {
        alert("startDate and endDate cannot be empty");
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

      const response = await axios.put(`/api/v1/event/${event._id}`, payload);

      if (response.status === 200) {
        console.log("Update response:", response.data.data);
        updateEvent(response.data.data);
      } else {
        alert("Error updating event");
        console.error("Error updating event:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Error updating event");
    }
  };

  useEffect(() => {
    if (startDate && endDate && startDate >= endDate) {
      setEndDate(undefined);
    }
  }, [startDate]);

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer bg-black text-white px-6 py-1 rounded-md flex items-center gap-2">
        <FaEdit />
        <span> Edit</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 font-semibold">
          {/* Profiles */}
          <div>
            <p>Profile</p>
            <ProfileDropdown
              selected={selectedProfiles}
              setSelected={setSelectedProfiles}
            />
          </div>
          {/* Timezone */}
          <div>
            <p>Timezone</p>
            <TzCommand value={selectedTz} onChange={setSelectedTz} />
          </div>
          {/* StartTime/EndTime */}
          <div className="flex flex-col justify-center items-center gap-5">
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

          {/* Update Button */}
          <DialogClose asChild>
            <div>
              <Button
                className="w-full cursor-pointer"
                onClick={handleUpdateEvent}
              >
                {" "}
                Update Event
              </Button>
            </div>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
