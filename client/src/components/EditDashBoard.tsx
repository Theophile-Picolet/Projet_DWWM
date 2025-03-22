import axios from "axios";
import { useRef, useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import "../styles/editdashboard.css";
import { editMovie } from "../services/request";

export default function EditDashBoard() {
  const { movies } = useLoaderData() as { movies: MovieType[] };
  const { revalidate } = useRevalidator();
  const API = import.meta.env.VITE_API_URL;
  const [movieToDelete, setMovieToDelete] = useState<number | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const deleteMovie = (id: number) => {
    return axios
      .delete(`${API}/api/movies/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        revalidate();
        setMovieToDelete(null);
        setShowDeleteConfirmation(false);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteClick = (id: number) => {
    setMovieToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const cancelDelete = () => {
    setMovieToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const [updatedMovie, setUpdatedMovie] = useState({
    id: Number(),
    title: "",
    poster: "",
    release_year: Number(),
    synopsis: "",
    duration: "",
    trailer: "",
    casting: "",
    production: "",
    landscape_image: "",
    genres: "",
    premium: true,
  });

  const handleEditMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editMovie(updatedMovie.id, updatedMovie)
      .then(() => {
        revalidate();
        closeModal();
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du film :", error);
      });
  };

  const handleChangeMovieForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedMovie({ ...updatedMovie, [e.target.name]: e.target.value });
  };

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const confirmDialogRef = useRef<HTMLDialogElement | null>(null);

  const openModal = (movie: MovieType) => {
    setUpdatedMovie(movie);
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    dialogRef.current?.close();
    document.body.style.overflow = "";
  };

  return (
    <section className="list-movie">
      {movies.map((movie) => (
        <section className="movie-edit" key={movie.id}>
          <div className="dashboard-movielist">
            <p>{movie.title}</p>
          </div>
          <div>
            <button type="button" onClick={() => handleDeleteClick(movie.id)}>
              <img src="/GarbageIcone.png" alt="Delete" />
            </button>
            <button type="button" onClick={() => openModal(movie)}>
              <img src="/EditIcone.png" alt="Edit" />
            </button>
          </div>
        </section>
      ))}
      {showDeleteConfirmation && (
        <dialog
          ref={confirmDialogRef}
          className="modal confirmation-modal"
          open
        >
          <div className="modal-content confirmation-content">
            <p>Êtes-vous sûr de vouloir supprimer ce film ?</p>
            <div className="confirmation-buttons">
              <button
                type="button"
                className="confirm-button"
                onClick={() =>
                  movieToDelete !== null && deleteMovie(movieToDelete)
                }
              >
                Confirmer
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={cancelDelete}
              >
                Annuler
              </button>
            </div>
          </div>
        </dialog>
      )}
      <dialog
        ref={dialogRef}
        className="modal"
        onClick={closeModal}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            closeModal();
          }
        }}
      >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          {updatedMovie && (
            <form onSubmit={handleEditMovie} className="form-dashboard">
              <p>Titre</p>
              <input
                type="text"
                value={updatedMovie.title}
                name="title"
                placeholder="Titre du film"
                onChange={handleChangeMovieForm}
              />
              <p>Affiche</p>
              <input
                type="text"
                value={updatedMovie.poster}
                name="poster"
                id=""
                placeholder="URL"
                onChange={handleChangeMovieForm}
              />
              <p>Genre</p>
              <input
                type="text"
                value={updatedMovie.genres}
                name="genre"
                placeholder="Genre"
                onChange={handleChangeMovieForm}
              />
              <p>Date de sortie</p>
              <input
                type="text"
                id="release_year"
                value={updatedMovie.release_year}
                name="release_year"
                placeholder="AAAA"
                onChange={handleChangeMovieForm}
              />
              <p>Synopsis</p>
              <input
                type="text"
                value={updatedMovie.synopsis}
                name="synopsis"
                placeholder="Synopsis"
                onChange={handleChangeMovieForm}
              />
              <p>Durée</p>
              <input
                type="text"
                value={updatedMovie.duration}
                name="duration"
                placeholder="0:00:00"
                onChange={handleChangeMovieForm}
              />
              <p>Bandes annonces</p>
              <input
                type="text"
                value={updatedMovie.trailer}
                name="trailer"
                placeholder="URL"
                onChange={handleChangeMovieForm}
              />
              <p>Casting</p>
              <input
                type="text"
                name="casting"
                placeholder="Nom/prénoms acteurs"
                value={updatedMovie.casting}
                onChange={handleChangeMovieForm}
              />
              <p>Production</p>
              <input
                type="text"
                name="production"
                placeholder="Noms/prénoms réalisateur"
                value={updatedMovie.production}
                onChange={handleChangeMovieForm}
              />
              <p>Landscape image</p>
              <input
                type="text"
                name="landscape_image"
                placeholder="lien de l'image"
                value={updatedMovie.landscape_image}
                onChange={handleChangeMovieForm}
              />
              <button type="submit">Modifier</button>
            </form>
          )}
        </div>
      </dialog>
    </section>
  );
}
