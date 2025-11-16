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
    <div className="w-full">
      <h2>View Events</h2>
      {events &&
        events.map((event) => (
          <div key={event._id}>
            <EventCard event={event} />
          </div>
        ))}
    </div>
  );
}

export default DisplayEvents;
