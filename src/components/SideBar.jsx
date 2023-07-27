/** @format */

import { useState, useEffect } from "react";
import { sampleGenreData } from "../sideList";
import SideList from "./SideList";

export default function SideBar() {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    setGenres((prevState) => {
      return sampleGenreData.genres.map((genre, i) => {
        return <SideList key={genre.id} genre={genre} pos={i} />;
      });
    });
  }, []);

  return (
    <div
      className="bg-slate-800 text-neutral-100 p-2 pr-0 h-auto
     drop-shadow-lg flex justify-center"
    >
      <ul className="text-sm cursor-pointer space-y-0.5 flex flex-wrap w-6/12 justify-center">
        {genres}
      </ul>
    </div>
  );
}
