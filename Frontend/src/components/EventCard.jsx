import { useState } from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { SlCalender } from "react-icons/sl";
import { IoMdTime } from "react-icons/io";
import TzCommand from "./TzCommand";
import dayjs from "../utils/dayjsConfig";
import { Button } from "@/components/ui/button";
import UpdateDialog from "./UpdateDialog";

function EventCard({ event }) {
  const [selectedTimezone, setSelectedTimezone] = useState(event.timezone);
  // Convert UTC times to selected timezone
  const startLocal = dayjs.utc(event.startUTC).tz(selectedTimezone);
  const endLocal = dayjs.utc(event.endUTC).tz(selectedTimezone);
  const createdAtLocal = dayjs.utc(event.createdAt).tz(selectedTimezone);
  const updatedAtLocal = dayjs.utc(event.updatedAt).tz(selectedTimezone);
  console.log(event.createdAt, "createdAt", createdAtLocal);

  return (
    <div className="w-full flex flex-col md:flex-row justify-between gap-6 mb-6 p-6 border border-gray-300 rounded-xl shadow-lg bg-gray-200">
      {/* LEFT SECTION — EVENT DETAILS */}
      <div className="flex flex-col gap-5 flex-1">
        {/* Profiles */}
        <div className="flex items-center gap-3 font-semibold">
          <HiMiniUsers size={28} />
          <div>{event.profiles.map((p) => p.name).join(", ")}</div>
        </div>

        {/* Start Time */}
        <div className="flex items-start gap-3 font-semibold">
          <SlCalender size={26} />
          <div>
            <div>Start: {startLocal.format("ddd, MMM DD, YYYY")}</div>
            <div className="flex items-center gap-1">
              <IoMdTime size={18} />
              {startLocal.format("HH:mm:ss")}
            </div>
          </div>
        </div>

        {/* End Time */}
        <div className="flex items-start gap-3 font-semibold">
          <SlCalender size={26} />
          <div>
            <div>End: {endLocal.format("ddd, MMM DD, YYYY")}</div>
            <div className="flex items-center gap-1">
              <IoMdTime size={18} />
              {endLocal.format("HH:mm:ss")}
            </div>
          </div>
        </div>

        {/* Created / Updated Timestamps */}
        <div className="text-sm text-gray-700">
          <div>
            Created {createdAtLocal.format("MMM DD, YYYY [at] hh:mm A")}
          </div>
          <div>
            Updated {updatedAtLocal.format("MMM DD, YYYY [at] hh:mm A")}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION — TIMEZONE + UPDATE */}
      <div className="flex flex-col gap-4 w-full md:w-auto">
        <div className="flex flex-col items-start gap-2">
          <div className="font-semibold text-base">Timezone</div>
          <TzCommand value={selectedTimezone} onChange={setSelectedTimezone} />
        </div>

        <div className="flex flex-col items-start">
          <UpdateDialog event={event} />
        </div>
      </div>
    </div>
  );
}

export default EventCard;
