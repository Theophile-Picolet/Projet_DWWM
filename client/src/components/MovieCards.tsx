import { Link } from "react-router-dom";

export default function MovieCards({ movie }: MoviesProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };
  const firstGenre = movie.genres.split(",")[0];
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substring(0, maxLength)}...`;
  };
  const movieTitle = truncateText(movie.title, 15);
  return (
    <>
      <div className="card-movie-img">
        <Link to={`/movies/${movie.id}`} onClick={scrollToTop}>
          <img src={movie.poster} alt="" />
        </Link>
        <p className="movie-title">{movieTitle}</p>
        <p className="movie-p">
          {movie.release_year} - {firstGenre}
        </p>
      </div>
    </>
  );
}
