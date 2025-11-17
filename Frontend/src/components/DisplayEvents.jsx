import { useEffect } from "react";
import useProfile from "../store/profileStore";
import axios from "../config/axiosconfig";
import useEvent from "../store/eventStore";
import EventCard from "./EventCard";

function DisplayEvents() {
  const { currentProfiles } = useProfile();
  const { events, setEvents } = useEvent();

  useEffect(() => {
    console.log(events);
  }, [events]);

  useEffect(() => {
    handleFetchEvents();
  }, [currentProfiles]);

  const handleFetchEvents = async () => {
    try {
      const profileIds = currentProfiles.join(",");
      const response = await axios.get(
        "/api/v1/event?profileIds=" + profileIds
      );
      const events = response.data.data;
      setEvents(events);
    } catch (error) {}
  };

  return (
    <div className="w-full lg:w-full mt-6">
      <h2 className="text-xl font-bold mb-4 text-center lg:text-left">
        View Events
      </h2>

      <div className="flex flex-col gap-4">
        {events && events.length > 0 ? (
          events.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p className="text-gray-500 text-center">No events found</p>
        )}
      </div>
    </div>
  );
}

export default DisplayEvents;
