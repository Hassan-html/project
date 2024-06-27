// components/EventCard.js
import Link from "next/link";

const EventCard = ({ event }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img className="w-full" src={event.images[0].url} alt={event.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{event.name}</div>
        <p className="text-gray-700 text-base">
          {event.dates.start.localDate} at {event.dates.start.localTime}
        </p>
        <Link href={`/pages/events/${event.id}`}>
          <h1 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 block text-center">
            View Details
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
