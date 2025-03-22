import { useLoaderData } from "react-router-dom";
import MovieCards from "../components/MovieCards";
import "../styles/catalogue.css";

export default function Catalogue() {
  const { movies } = useLoaderData() as {
    movies: MovieType[];
  };

  const freeMovies = movies.filter((movie) => !movie.premium);
  const premiumMovies = movies.filter((movie) => movie.premium);
  const sfMovies = movies.filter((movie) =>
    movie.genres.includes("Science-fiction"),
  );
  return (
    <>
      <div className="first-container">
        <img
          src="/Background_connection.jpg"
          className="img-container"
          alt=""
        />
        <button type="button" className="decouvrir-nos-offres">
          <a href="#acces">Découvrir nos offres</a>
        </button>
      </div>
      <div className="show-movies">
        <h2>Tendances Actuelles</h2>
        <section className="movie-container">
          {sfMovies.map((movie) => (
            <MovieCards key={movie.id} movie={movie} />
          ))}
        </section>
        <h2>Offres Premium</h2>
        <section className="movie-container">
          {premiumMovies.map((movie) => (
            <MovieCards key={movie.id} movie={movie} />
          ))}
        </section>
        <h2>Ma Liste</h2>
        <section className="movie-container">
          {movies.map((movie) => (
            <MovieCards key={movie.id} movie={movie} />
          ))}
        </section>
        <h2>Films gratuit</h2>
        <section className="movie-container">
          {freeMovies.map((movie) => (
            <MovieCards key={movie.id} movie={movie} />
          ))}
        </section>
      </div>
      <section id="acces" className="connection-bottom">
        <h2>Nos différentes souscriptions</h2>
        <div className="bottom-container">
          <div className="bottom-left">
            <h3>Accès Gratuit</h3>
            <p>Visionnez 4 films par mois</p>
            <p className="bottom-free">Accédez à notre catalogue complet</p>
            <p className="bottom-free">Regardez en haute qualité</p>
            <p className="bottom-free">Gérez vos listes de films à voir</p>
          </div>
          <div className="separation" />
          <div className="bottom-right">
            <h3>Accès Premium</h3>
            <p>Films illimités en haute qualité</p>
            <p>Accédez à notre catalogue complet</p>
            <p>Regardez en haute qualité</p>
            <p>Gérez vos listes de films à voir</p>
          </div>
        </div>
        <button type="button" className="button-bottom">
          Devenir Premium
        </button>
      </section>
    </>
  );
}
