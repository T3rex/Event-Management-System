import { useState } from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { SlCalender } from "react-icons/sl";
import { IoMdTime } from "react-icons/io";
import TzCommand from "./TzCommand";
import dayjs from "../utils/dayjsConfig";

function EventCard({ event }) {
  const [selectedTimezone, setSelectedTimezone] = useState(event.timezone);

  const startLocal = dayjs.utc(event.startUTC).tz(selectedTimezone);
  const endLocal = dayjs.utc(event.endUTC).tz(selectedTimezone);
  const createdAtLocal = dayjs.utc(event.createdAtUTC).tz(selectedTimezone);
  const updatedAtLocal = dayjs.utc(event.updatedAtUTC).tz(selectedTimezone);

  return (
    <div className="w-3/4 flex justify-between gap-4 mb-6 p-8 border border-gray-300 rounded-lg shadow-lg bg-gray-200">
      <div className="flex flex-col bg-gray-200 px-2 gap-5 mb-4">
        {/* Profiles */}
        <div className="flex justify-start gap-2 items-center font-semibold">
          <HiMiniUsers size={30} />
          <div>{event.profiles.map((p) => p.name).join(", ")}</div>
        </div>

        {/* Start */}
        <div className="flex justify-start gap-2 items-center font-semibold">
          <SlCalender size={30} />
          <div>
            <div>Start: {startLocal.format("ddd, MMM DD, YYYY")}</div>
            <div className="flex justify-start items-center gap-1">
              <IoMdTime size={20} />
              {startLocal.format("hh:mm A")}
            </div>
          </div>
        </div>

        {/* End */}
        <div className="flex justify-start gap-2 items-center font-semibold">
          <SlCalender size={30} />
          <div>
            <div>End: {endLocal.format("ddd, MMM DD, YYYY")}</div>
            <div className="flex justify-start items-center gap-1">
              <IoMdTime size={20} />
              {endLocal.format("hh:mm A")}
            </div>
          </div>
        </div>

        {/* Created / Updated */}
        <div className="text-sm">
          <div>
            Created {createdAtLocal.format("MMM DD, YYYY [at] hh:mm A")}
          </div>
          <div>
            Updated {updatedAtLocal.format("MMM DD, YYYY [at] hh:mm A")}
          </div>
        </div>
      </div>

      {/* Timezone Picker */}
      <div className="flex flex-col items-start gap-2">
        <div className="font-semibold">Timezone</div>
        <TzCommand value={selectedTimezone} onChange={setSelectedTimezone} />
      </div>
    </div>
  );
}

export default EventCard;
