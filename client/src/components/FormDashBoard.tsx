import axios from "axios";
import { useState } from "react";
import "../styles/formdashboard.css";
import joi from "joi";

export default function FormDashBoard() {
  const [newMovie, setNewMovie] = useState({
    title: "",
    poster: "",
    release_year: "",
    synopsis: "",
    duration: "",
    trailer: "",
    casting: "",
    production: "",
    landscape_image: "",
  });

  const API = import.meta.env.VITE_API_URL;
  const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${API}/api/movies/`, newMovie, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 201) {
        } else {
          alert(response.data.error);
        }
      })
      .catch((error) => {
        if (joi.isError(error)) {
          console.error(error);
        }
      });
  };

  const handleChangeMovieForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };
  console.info(newMovie);
  return (
    <form onSubmit={sendForm} className="form-dashboard">
      <p>TITRE</p>
      <input
        type="text"
        name="title"
        value={newMovie.title}
        onChange={handleChangeMovieForm}
        placeholder=" titre du film"
      />
      <p>AFFICHE</p>
      <input
        type="text"
        name="poster"
        onChange={handleChangeMovieForm}
        id=""
        placeholder=" url"
      />
      <p>DATE DE SORTIE</p>
      <input
        type="number"
        name="release_year"
        onChange={handleChangeMovieForm}
        placeholder=" aaaa"
      />
      <p>SYNOPSIS</p>
      <input
        type="text"
        name="synopsis"
        onChange={handleChangeMovieForm}
        placeholder=" synopsis"
      />
      <p>DUREE</p>
      <input
        type="text"
        name="duration"
        onChange={handleChangeMovieForm}
        placeholder=" 0:00:00"
      />
      <p>BANDE ANNONCE</p>
      <input
        type="text"
        name="trailer"
        onChange={handleChangeMovieForm}
        placeholder=" url"
      />
      <p>CASTING</p>
      <input
        type="text"
        name="casting"
        onChange={handleChangeMovieForm}
        placeholder=" nom/prénoms acteurs"
      />
      <p>PRODUCTION</p>
      <input
        type="text"
        name="production"
        onChange={handleChangeMovieForm}
        placeholder=" noms/prénoms réalisateur"
      />
      <p>LANDSCAPE</p>
      <input
        type="text"
        name="landscape_image"
        onChange={handleChangeMovieForm}
        placeholder=" landscape"
      />
      <input type="submit" className="submit-form" value="ENVOYER" />
    </form>
  );
}
