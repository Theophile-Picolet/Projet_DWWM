import { useLoaderData } from "react-router-dom";
import "../styles/movieCardDetail.css";
import "../styles/moviesDetail.css";
import FavoriteButton from "../components/FavoriteButton";
import MovieCardDetail from "../components/MovieCardDetail";
export default function MovieDetail() {
  const { movieId } = useLoaderData() as { movieId: MovieType };
  const { movies } = useLoaderData() as { movies: MovieType[] };
  const movieGenreId = movieId.genres.split(",")[0];
  const sameGenre = movies.filter(
    (movie) => movie.genres.split(",")[0] === movieGenreId,
  );
  return (
    <>
      <h1>Original digitals</h1>
      <div className="container-movies">
        <iframe
          className="complete-movie"
          width="100%"
          height="315"
          src={movieId.trailer}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <h2>{movieId.title.toUpperCase()}</h2>
        <div className="informations">
          <p>{movieId.release_year}</p>
          <p>{movieId.duration}</p>
        </div>
        <div className="bio">
          <p>{movieId.synopsis.slice(0, 50)}...</p>
          <details>
            <summary>
              <p>En savoir plus</p>
            </summary>
            <p>{movieId.synopsis.substring(50)}</p>
          </details>
          <FavoriteButton movie={movieId} id={movieId.id} />
        </div>
      </div>
      <div className="trailer">
        <h2>Bande annonce</h2>
        <iframe
          className="short-movie"
          width="100%"
          height="315"
          src={movieId.trailer}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>{" "}
      <h2>Dans la même catégorie</h2>
      <section className="same-genre">
        {sameGenre.map((movie) => (
          <MovieCardDetail key={movie.id} movie={movie} />
        ))}
      </section>
    </>
  );
}
