import { Link } from "react-router-dom";

export default function MovieCards({ movie }: MoviesProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <>
      <div className="movie-card-detail">
        <Link to={`/movies/${movie.id}`} onClick={scrollToTop}>
          <img src={movie.poster} alt={movie.title} />
        </Link>
      </div>
    </>
  );
}
