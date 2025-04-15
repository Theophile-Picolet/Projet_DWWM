import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/favorite.css";
import { useWatchlist } from "../services/WatchlistContext";

interface FavoriteButtonProps {
  id: number;
  movie: MovieType;
}

export default function FavoriteButton({ id, movie }: FavoriteButtonProps) {
  const { watchlist, refreshWatchlist } = useWatchlist();
  const [isFavorite, setIsFavorite] = useState(false); // Etat pour savoir si c'est un favori
  const API = import.meta.env.VITE_API_URL;

  // Effect pour mettre à jour l'état du bouton en fonction de la watchlist
  useEffect(() => {
    setIsFavorite(watchlist.some((movie) => movie.id === id)); // Vérifie si le film est déjà dans la watchlist
  }, [watchlist, id]);

  // Fonction pour ajouter le film aux favoris
  const handleAddFavorite = async () => {
    try {
      console.info("Ajout en favori, ID :", id);
      await axios.post(
        `${API}/api/users/watchlist`,
        { movie_id: id },
        { withCredentials: true },
      );

      console.info("Ajout réussi, rafraîchissement de la watchlist...");
      refreshWatchlist(); // Rafraîchit la watchlist
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris :", error);
    }
  };

  return (
    <div className="favorite-container">
      <button
        type="button"
        className="favorite-button"
        onClick={handleAddFavorite}
        disabled={isFavorite} // Désactive le bouton si le film est déjà un favori
        aria-label={
          isFavorite
            ? "Film déjà dans les favoris"
            : "Ajouter à la liste des films Favoris"
        }
      >
        <span className="favorite-icon">{isFavorite ? "★" : "☆"}</span>{" "}
        {/* Change l'icône en fonction de l'état */}
        <span className="button-text">
          {isFavorite
            ? `${movie.title.toUpperCase()} est dans la liste des Favoris`
            : ` Ajouter ${movie.title.toUpperCase()} à ma liste des Favoris`}
        </span>{" "}
        {/* Change le texte en fonction de l'état */}
      </button>
    </div>
  );
}
