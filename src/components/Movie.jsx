/** @format */
import { showMovie } from "../redux/reducers/movieModalSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

const Movie = (props) => {
  const dispatch = useDispatch();

  const year = props.data.release_date.split("-");

  return (
    <motion.div
      className="inline-block  drop-shadow-lg bg-slate-900 h-[36
        50px] w-50 rounded-lg cursor flex-wrap "
      onClick={() => dispatch(showMovie(props.data.id))}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <>
        <img
          className="w-fit rounded-lg rounded-b-none"
          src={`https://image.tmdb.org/t/p/w400${props.data.poster_path}`}
          alt="Couldn't find"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src =
              "https://images.unsplash.com/photo-1662675117392-561a414fcefc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
          }}
        />
        <div className="p-2.5 space-y-1">
          <p className="text-neutral-500 text-xs">
            {`${
              props.data.vote_average
            } • ${props.data.vote_count.toLocaleString()} votes • ${
              year[0] || "N/A"
            }`}
          </p>
          <p className="text-neutral-100 text-sm line-clamp-1">
            {props.data.title}
          </p>
        </div>
      </>
    </motion.div>
  );
};
export default Movie;
