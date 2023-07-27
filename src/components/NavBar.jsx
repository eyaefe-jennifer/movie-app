/** @format */

import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import SearchResults from "./SearchResult";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const ref = useDetectClickOutside({ onTriggered: toggleSearchOff });

  function handleSetSearch(event) {
    setSearch(event.target.value);
  }

  function toggleSearchOn() {
    setShowSearch(true);
  }

  function toggleSearchOff() {
    setShowSearch(false);
  }

  return (
    <div className="p-4 drop-shadow-xl flex bg-slate-900 sticky top-0 z-40 w-screen">
      <div className="flex items-center gap-1.5 cursor-pointer"></div>
      <form className="relative flex w-1/2  ml-10" ref={ref}>
        <input
          type="text"
          id="simple-search"
          className="bg-slate-900 border border-neutral-700 text-neutral-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full"
          placeholder="Search..."
          value={search}
          onChange={handleSetSearch}
          onMouseDown={toggleSearchOn}
        />
        {showSearch && <SearchResults search={search} />}
      </form>
    </div>
  );
};
export default NavBar;
