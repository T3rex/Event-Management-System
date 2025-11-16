import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DateTimePicker({ date, setDate, minDate, disabled }) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("12:00:00");
  const [disabledTime, setDisabledTime] = useState(false);

  const isSameDay =
    date && minDate && date.toDateString() === minDate.toDateString();
  //   console.log({ date, minDate, isSameDay });

  const handleDateSelect = (day) => {
    if (!day) return;

    const [h, m, s] = time.split(":").map(Number);
    const merged = new Date(day);
    merged.setHours(h, m, s || 0);

    if (minDate && merged.getTime() < minDate.getTime()) return;

    setDate(merged);
    setOpen(false);
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setTime(newTime);

    if (!date) return;

    const updated = new Date(date);
    const [h, m, s] = newTime.split(":").map(Number);
    updated.setHours(h, m, s || 0);

    // Block time earlier than minDate when same day
    if (minDate && isSameDay && updated < minDate) {
      updated.setHours(
        minDate.getHours(),
        minDate.getMinutes(),
        minDate.getSeconds()
      );
      setTime(
        `${String(minDate.getHours()).padStart(2, "0")}:${String(
          minDate.getMinutes()
        ).padStart(2, "0")}:${String(minDate.getSeconds()).padStart(2, "0")}`
      );
    }

    if (minDate && updated.getTime() < minDate.getTime()) {
      return;
    }

    setDate(updated);
  };

  return (
    <div className="flex gap-4 opacity-100">
      {/* DATE PICKER */}
      <div className="flex flex-col gap-3">
        <Label>Date</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={disabled}>
            <Button
              variant="outline"
              className="w-32 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              captionLayout="dropdown"
              disabled={minDate ? { before: minDate } : undefined}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* TIME PICKER */}
      <div className="flex flex-col gap-3">
        <Label>Time</Label>
        <Input
          type="time"
          step="1"
          value={time}
          onChange={handleTimeChange}
          disabled={disabled || disabledTime}
          min={
            isSameDay && minDate
              ? `${String(minDate.getHours()).padStart(2, "0")}:${String(
                  minDate.getMinutes()
                ).padStart(2, "0")}:00`
              : undefined
          }
        />
      </div>
    </div>
  );
}
