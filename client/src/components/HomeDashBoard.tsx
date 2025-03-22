import { useLoaderData } from "react-router-dom";
import "../styles/dashboard.css";

export default function HomeDashBoard() {
  const { movies } = useLoaderData() as { movies: MovieType[] };

  return (
    <>
      {movies.map((movie) => (
        <div className="dashboard-movies" key={movie.id}>
          <img src={movie.poster} alt="" />
          <p>{movie.title}</p>
        </div>
      ))}
    </>
  );
}
