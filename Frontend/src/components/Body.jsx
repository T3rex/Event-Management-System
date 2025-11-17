import React from "react";
import CreateEvent from "./CreateEvent";
import DisplayEvents from "./DisplayEvents";

function Body() {
  return (
    <div className="w-full px-4 py-6">
      <div className="flex flex-col lg:flex-row justify-evenly gap-6 lg:gap-10 max-w-6xl mx-auto">
        {/* Create Event Section */}
        <div className="w-full lg:w-1/2">
          <CreateEvent />
        </div>

        {/* Display Events Section */}
        <div className="w-full lg:w-1/2">
          <DisplayEvents />
        </div>
      </div>
    </div>
  );
}

export default Body;
