// pages/Home.jsx
import { useState, useMemo, useEffect } from "react";
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

  const filtered = useMemo(() => {
    const result = events.filter((e) => {
      const matchesQuery = e.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || e.category === category;

      return matchesQuery && matchesCategory;
    });

    const sorted = [...result].sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === "price") {
        return a.price - b.price;
      }
      return 0;
    });

    return sorted;
  }, [events, query, category, sortBy]);

  useEffect(() => {
    async function fetchEvents() {
      const allEvents = await eventService.getAll();
      setEvents(allEvents);
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    setPage(1); // Reset to first page when query or category changes
  }, [query, category, sortBy]);

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
        <p className="text-sm text-gray-600 mt-6">
          Showing {visibleEvents.length ? (page - 1) * PAGE_SIZE + 1 : 0}–
          {(page - 1) * PAGE_SIZE + visibleEvents.length} of {filtered.length}{" "}
          events
        </p>

        {/* add sortby and filter options */}
        <div className="flex gap-2 p-3">
          <label className="block text-sm font-semibold">
            Sort by:
            <select
              name="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-green-100 rounded-sm p-1 ml-2"
            >
              <option className="text-sm bg-emerald-100 " value="date">
                Date
              </option>
              <option className="text-sm bg-emerald-100" value="price">
                Price
              </option>
            </select>
          </label>
        </div>
      </div>
      <EventGrid events={visibleEvents} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
