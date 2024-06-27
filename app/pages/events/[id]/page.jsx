"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const EventDetails = () => {
  const router = useParams();
  const { id } = router;
  const [event, setEvent] = useState(null);
  const [eventLocation, setEventLocation] = useState(null);

  const googleMapsApiKey = "AIzaSyAHLJ9geCl8prl-p35vg4bM7skoSX2NaGQ";

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=46TH7UBV1vDsgzMwKQX58kZn1CnRqUVW`
        );
        const eventData = response.data;
        setEvent(eventData);

        if (
          eventData._embedded &&
          eventData._embedded.venues &&
          eventData._embedded.venues.length > 0
        ) {
          const venue = eventData._embedded.venues[0];
          const location = {
            lat: parseFloat(venue.location.latitude),
            lng: parseFloat(venue.location.longitude),
          };
          setEventLocation(location);
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    if (id) {
      fetchEventData();
    }
  }, [id]);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Event Details</h2>
        <p>
          <strong>Date:</strong> {event.dates.start.localDate} at{" "}
          {event.dates.start.localTime}
        </p>
        <p>
          <strong>Time Zone:</strong> {event.dates.timezone}
        </p>
        <p></p>
        <p>
          <strong>Ticket Limit:</strong> {event.ticketLimit?.info}
        </p>
        {event.priceRanges && (
          <p>
            <strong>Price Range:</strong> {event.priceRanges[0].currency}{" "}
            {event.priceRanges[0].min} - {event.priceRanges[0].max}
          </p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {event.images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-w-16 aspect-h-9 h-[200px]"
            >
              <Image
                src={image.url}
                alt={`Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>

      {event.seatmap && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Seat Map</h2>
          <div className="relative aspect-w-16 aspect-h-9 h-[600px]">
            <Image
              src={event.seatmap.staticUrl}
              alt="Seat Map"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Promoter</h2>
        <p>{event.promoter.name}</p>
        <p>{event.promoter.description}</p>
      </div>

      {event.products && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Products</h2>
          {event.products.map((product, index) => (
            <div key={index}>
              <p>
                <strong>{product.name}</strong>
              </p>
              <a
                href={product.url}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy Now
              </a>
            </div>
          ))}
        </div>
      )}

      {eventLocation && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Event Location</h2>
          <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "400px" }}
              center={eventLocation}
              zoom={15}
            >
              <Marker position={eventLocation} />
            </GoogleMap>
          </LoadScript>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
