import React from "react";
import CreateEvent from "./CreateEvent";
import DisplayEvents from "./DisplayEvents";

function Body() {
  return (
    <div className="flex gap-5">
      <CreateEvent />
      <DisplayEvents />
    </div>
  );
}

export default Body;
