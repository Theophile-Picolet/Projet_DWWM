import { Link } from "react-router-dom";

export default function MovieCards({ movie }: MoviesProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };
  const genres = movie.genres;
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substring(0, maxLength)}...`;
  };
  const movieTitle = truncateText(movie.title, 25);
  return (
    <>
      <div className="card-movie">
        <Link to={`/movies/${movie.id}`} onClick={scrollToTop}>
          <div
            className="background-card"
            style={{ backgroundImage: `url(${movie.landscape_image})` }}
          >
            <p className="movie-title">{movieTitle}</p>
          </div>
        </Link>
        <p className="movie-p">
          {movie.release_year} -{genres}
        </p>
      </div>
    </>
  );
}
