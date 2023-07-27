/** @format */

import React from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Content from "./components/Content";
import MovieModal from "./components/MovieModal";
import { useDispatch, useSelector } from "react-redux";
import { hide, isEnabled } from "./redux/reducers/movieModalSlice";
// import { useDetectClickOutside } from "react-detect-click-outside";

function App() {
  const movieModalEnabled = useSelector(isEnabled);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex flex-col">
        <NavBar />
        <div className="relative">
          <SideBar />
          <Content />
        </div>
      </div>
      {movieModalEnabled && (
        <div
          className="absolute top-0
           w-full h-full flex items-center justify-center bg-opacity-50 z-50"
          onClick={(event) =>
            event.currentTarget === event.target && dispatch(hide())
          }
        >
          <MovieModal />
        </div>
      )}
    </div>
  );
}

export default App;
