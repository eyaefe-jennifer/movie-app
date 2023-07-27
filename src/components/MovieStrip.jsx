/** @format */

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useState, useEffect } from "react";
import API from "../services/API";
import Movie from "./Movie";
import useWindowDimensions from "../services/useWindowDimensions";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectSelectedGenres } from "../redux/reducers/selectedGenresSlice";

const MovieStrip = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { width } = useWindowDimensions();
  const [movies, setMovies] = useState([]);
  const [movieSection, setMovieSection] = useState();
  const [stripData, setStripData] = useState({
    page: 1,
    pages: 1,
  });
  const selectedGenres = useSelector(selectSelectedGenres);

  useEffect(() => {
    API.get(
      `${props.request}&page=${
        stripData.page
      }&with_genres=${selectedGenres.toString()}`
    ).then((response) => {
      setMovies((results) => {
        return response.data.results.map((movie, i) => {
          return <Movie key={movie.id} data={movie} pos={i} />;
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripData, selectedGenres]);

  useEffect(() => {
    if (movies.length <= 0) {
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
      let test = movies.map((movie) => {
        return movie;
      });
      const slicedArray = test.slice(0, width / 220 > 20 ? 20 : width / 220);
      setMovieSection(slicedArray);
    }
  }, [movies, width]);

  function nextSet() {
    setStripData((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  }

  function prevSet() {
    if (stripData.page === 1) return;
    setStripData((prevState) => ({
      ...prevState,
      page: prevState.page - 1,
    }));
  }

  return (
    <div className="">
      {isEnabled ? (
        <div className="flex flex-col gap-3 ">
          <div className="bg-slate-600 rounded-lg text-neutral-100 p-2 flex items-center gap-1">
            {props.icon}
            <p>{props.name}</p>
          </div>
          <div className="relative">
            <div className="flex space-x-3 ml-12 ">{movieSection}</div>
            <motion.div
              className="absolute bg-slate-600 cursor-pointer rounded p-1 top-[130px] left-[-17px]"
              onClick={prevSet}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <BiChevronLeft size={25} className="text-neutral-100" />
            </motion.div>
            <motion.div
              className="absolute bg-slate-600 cursor-pointer rounded p-1 top-[130px] right-[-17px]"
              onClick={nextSet}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <BiChevronRight size={25} className="text-neutral-100" />
            </motion.div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default MovieStrip;
