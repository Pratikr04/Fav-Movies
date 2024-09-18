import { useEffect, useRef } from "react";
import { useKeyPress } from "./useKeyPress";

export default function SearchBar({ query, setQuery }) {
  const inputEl = useRef(null);

  function focus() {
    inputEl.current.focus();
  }

  useEffect(() => {
    focus();
  }, []);

  useKeyPress("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

