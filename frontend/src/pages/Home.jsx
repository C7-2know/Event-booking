// pages/Home.jsx
import { useState, useMemo, useEffect } from "react";
import mockEvents from "../data/mockEvents";
import Hero from "../components/Hero";
import CategoryFilter from "../components/CategoryFilter";
import EventGrid from "../components/EventGrid";
import Pagination from "../components/Pagination";
import { eventService } from "../services/eventService";

const PAGE_SIZE = 8;

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("date"); // New state for sorting
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    const allEvents = eventService.getAll();
    setEvents(allEvents);
  }

  const filtered = useMemo(() => {
    return mockEvents.filter((e) => {
      const matchesQuery = e.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || e.category === category;

      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    setPage(1); // Reset to first page when query or category changes
  }, [query, category]);
  
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visibleEvents = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div className="px-8 py-6">
      <Hero query={query} setQuery={setQuery} />
      <CategoryFilter
        selected={category}
        onSelect={(cat) => {
          setCategory(cat);
          setPage(1);
        }}
      />
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm text-gray-500 mt-6">
          Showing {visibleEvents.length ? (page - 1) * PAGE_SIZE + 1 : 0}–
          {(page - 1) * PAGE_SIZE + visibleEvents.length} of {filtered.length}{" "}
          events
        </p>

        {/* add sortby and filter options */}
        <div className="flex gap-2 p-3">
          <select
            className="border border-gray-50 rounded-md py-1 text-sm p-5"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Sort by</option>
            <option className="text-sm bg-emerald-100" value="date">
              Date
            </option>
            <option className="text-sm bg-emerald-100" value="price">
              Price
            </option>
          </select>
        </div>
      </div>
      <EventGrid events={visibleEvents} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
