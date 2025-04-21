import { useLoaderData } from "react-router-dom";
import "../styles/movieCardDetail.css";
import "../styles/moviesDetail.css";
import FavoriteButton from "../components/FavoriteButton";
import MovieCardDetail from "../components/MovieCardDetail";
export default function MovieDetail() {
  const { movieId } = useLoaderData() as { movieId: MovieType };
  const { movies } = useLoaderData() as { movies: MovieType[] };
  const movieGenreId = movieId.genres.split(",")[0];
  const sameGenre = movies.filter((movie) =>
    movie.genres?.includes(movieGenreId),
  );
  return (
    <>
      <div className="detail-container">
        <h1>Original digitals</h1>
        <div className="trailer">
          <iframe
            className="short-movie"
            width="1400px%"
            height="600px"
            src={movieId.trailer}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className="detail-container-movies">
          <img src={movieId.poster} alt={movieId.title} />
          <div className="container-middle">
            <h2>{movieId.title.toUpperCase()}</h2>
            <p>
              <span className="title-informations">Genres : </span>
              {movieId.genres}
            </p>

            <div className="informations">
              <p>
                <span className="title-informations"> Année : </span>
                {movieId.release_year}
              </p>
              <p>
                <span className="title-informations"> Durée : </span>
                {movieId.duration}
              </p>
            </div>
            <div>
              <p>
                <span className="title-informations"> Synopsis : </span>
                {movieId.synopsis}
              </p>
              <p>
                <span className="title-informations">
                  Maison de production :{" "}
                </span>
                {movieId.production}
              </p>
              <p>
                <span className="title-informations"> Casting : </span>
                {movieId.casting}
              </p>
            </div>
            <FavoriteButton movie={movieId} id={movieId.id} />
          </div>
        </div>
        <div className="same-categorie">
          <h2>Dans la même catégorie</h2>
          <section className="same-genre">
            {sameGenre.map((movie) => (
              <MovieCardDetail key={movie.id} movie={movie} />
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
