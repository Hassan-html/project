"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "@/app/components/EventCard";
export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://app.ticketmaster.com/discovery/v2/events.json?apikey=46TH7UBV1vDsgzMwKQX58kZn1CnRqUVW"
      )
      .then((res: any) => {
        setData(res.data._embedded.events);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <h1 className="text-4xl">Below is the data</h1>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}
