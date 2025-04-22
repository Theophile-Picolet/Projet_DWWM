import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import MovieCards from "../components/MovieCards";
import { useAuth } from "../services/AuthContext";
import { useWatchlist } from "../services/WatchlistContext";
import "../styles/catalogue.css";

export default function Catalogue() {
  const { movies } = useLoaderData() as { movies: MovieType[] };
  const API = import.meta.env.VITE_API_URL;
  const { subscription } = useAuth();
  const { watchlist, refreshWatchlist } = useWatchlist();

  // Films dans la watchlist
  const moviesWatchlist: MovieType[] = watchlist || [];

  // Divise les films par catégorie
  const freeMovies = movies.filter((movie) => !movie.premium);
  const premiumMovies = movies.filter((movie) => movie.premium);
  const sfMovies = movies.filter((movie) =>
    movie.genres?.includes("Science-fiction"),
  );

  // Logge la watchlist pour vérification
  console.info("✅ Watchlist dans Catalogue :", moviesWatchlist);

  // Rafraîchissement de la watchlist au montage
  useEffect(() => {
    console.info("🟢 Rechargement Watchlist au montage");
    refreshWatchlist();
  }, [refreshWatchlist]);

  // Fonction pour supprimer un film de la watchlist
  const handleRemoveFavorite = async (id: number) => {
    try {
      console.info("Suppression du favori, ID :", id);
      await axios.delete(`${API}/api/users/watchlist`, {
        data: { movie_id: id },
        withCredentials: true,
      });

      console.info("Suppression réussie, rafraîchissement de la watchlist...");
      refreshWatchlist();
    } catch (error) {
      console.error("Erreur lors de la suppression des favoris :", error);
    }
  };
  const [selectedOffer, setSelectedOffer] = useState("free");

  return (
    <>
      <div className="first-container">
        <div className="oDigital">Original Digital</div>
        {!subscription && (
          <button type="button" className="decouvrir-nos-offres">
            <a href="#acces">Découvrir nos offres</a>
          </button>
        )}
      </div>
      <div className="catalogue">
        <div className="show-movies">
          <h2>Films gratuits</h2>
          <section className="movie-container">
            {freeMovies.map((movie) => (
              <MovieCards key={movie.id} movie={movie} />
            ))}
          </section>

          <h2>Tendances actuelles</h2>
          <section className="movie-container">
            {sfMovies.map((movie) => (
              <MovieCards key={movie.id} movie={movie} />
            ))}
          </section>

          <h2>Films premiums</h2>
          <section className="movie-container">
            {premiumMovies.map((movie) => (
              <MovieCards key={movie.id} movie={movie} />
            ))}
          </section>

          <h2>Ma Liste</h2>
          {moviesWatchlist.length > 0 ? (
            <section className="movie-container">
              {moviesWatchlist.map((movie) => (
                <div className="watchlist-movie" key={movie.id}>
                  <MovieCards key={movie.id} movie={movie} />
                  <button
                    type="button"
                    className="delete-favorite-button"
                    onClick={() => handleRemoveFavorite(movie.id)}
                    aria-label="Supprimer des favoris"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </section>
          ) : (
            <p>Aucun film dans votre liste.</p>
          )}
        </div>
      </div>
      {!subscription && (
        <div className="catalogue-bottom">
          <section id="acces" className="middle-element">
            <h2>Nos différentes souscriptions</h2>
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
            <div className="bottom-element">
              <Link to="/payment" className="inscription">
                DEVENIR PREMIUM
              </Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
