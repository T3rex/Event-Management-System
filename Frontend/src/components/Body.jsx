import React from "react";
import CreateEvent from "./CreateEvent";
import DisplayEvents from "./DisplayEvents";

function Body() {
  return (
    <div className="w-3/4 flex justify-evenly align-middle gap-20">
      <CreateEvent />
      <DisplayEvents />
    </div>
  );
}

export default Body;
