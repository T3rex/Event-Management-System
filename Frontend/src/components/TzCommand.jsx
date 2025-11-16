import { useState, useMemo } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

export default function TimezonePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const timezones = useMemo(() => Intl.supportedValuesOf("timeZone"), []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {value || "Select timezone"}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-0 w-72">
        <Command>
          <CommandInput placeholder="Search timezone..." />

          <CommandList className="max-h-64 overflow-auto">
            <CommandEmpty>No timezone found.</CommandEmpty>

            <CommandGroup>
              {timezones.map((tz) => (
                <CommandItem
                  key={tz}
                  value={tz}
                  onSelect={() => {
                    onChange(tz);
                    setOpen(false);
                  }}
                >
                  {tz}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
