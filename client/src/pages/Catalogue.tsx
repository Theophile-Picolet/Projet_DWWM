import { Link, useLoaderData } from "react-router-dom";
import MovieCards from "../components/MovieCards";
import "../styles/catalogue.css";
import { useState } from "react";

export default function Catalogue() {
  const { movies } = useLoaderData() as {
    movies: MovieType[];
  };

  const freeMovies = movies.filter((movie) => !movie.premium);
  const premiumMovies = movies.filter((movie) => movie.premium);
  const sfMovies = movies.filter((movie) =>
    movie.genres.includes("Science-fiction"),
  );
  const [selectedOffer, setSelectedOffer] = useState("free");
  return (
    <>
      <div className="catalogue">
        <div className="first-container">
          <h1>L’original au service du digital</h1>
          <p>Profitez d' un catalogue qui contient le meilleur du cinéma.</p>
          <button type="button" className="decouvrir-nos-offres">
            <a href="#acces">Découvrir nos offres</a>
          </button>
          <img src="/Arrow-2.png" alt="" />
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
      </div>
      <section id="acces" className="connection-bottom">
        <h2>Nos différentes souscriptions</h2>
        <section className="middle-element">
          <div className="offer">
            <button
              type="button"
              className={`button ${selectedOffer === "free" ? "active" : "inactive"}`}
              onClick={() => setSelectedOffer("free")}
            >
              Gratuit
            </button>
            <button
              type="button"
              className={`button ${selectedOffer === "premium" ? "active" : "inactive"}`}
              onClick={() => setSelectedOffer("premium")}
            >
              Premium
            </button>
          </div>
          <div className="content">
            {selectedOffer === "free" ? (
              <div className="free">
                <p>Visionnez 4 films par mois</p>
                <p className="disabled">Accédez à notre catalogue complet</p>
                <p className="disabled">Regardez en haute qualité</p>
                <p className="disabled">Gérez vos listes de films à voir</p>
              </div>
            ) : (
              <div className="premium">
                <p>Films illimités en haute qualité</p>
                <p>Accédez à notre catalogue complet</p>
                <p>Regardez en haute qualité</p>
                <p>Gérez vos listes de films à voir</p>
              </div>
            )}
          </div>
        </section>
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
          <Link to="/signup">DEVENIR PREMIUM</Link>
        </button>
      </section>
    </>
  );
}
