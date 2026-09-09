import { useState } from "react";

export default function SearchBox({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search Ethiopian dishes..."
      value={query}
      onChange={handleChange}
    />
  );
}