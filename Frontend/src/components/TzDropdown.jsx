import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TzDropdown({ selectedTz, setSelectedTz }) {
  const timezones = Intl.supportedValuesOf("timeZone");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full" variant="outline">
          {selectedTz || "Select Timezone"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-full max-h-72 overflow-y-auto"
        align="start"
      >
        <DropdownMenuLabel>Timezones</DropdownMenuLabel>

        <DropdownMenuGroup>
          {timezones.map((tz) => (
            <DropdownMenuItem
              key={tz}
              onSelect={() => setSelectedTz(tz)}
              className="cursor-pointer"
            >
              {tz}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
