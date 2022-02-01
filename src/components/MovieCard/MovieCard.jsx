import { Link } from "react-router-dom";


export default function MovieCard({ movie }) {

    const imageUrl = movie.poster_path ? "https://image.tmdb.org/t/p/w300" + movie.poster_path : "https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg"

    return (
        <li className="popularSingle">
            <div >
            <Link to={`/movie/${movie.id}`} ><h3>{movie.original_title}</h3></Link>
              <p>{movie.vote_average}</p>
              <Link to={`/movie/${movie.id}`} > <img  width={230} height={345} src={imageUrl} alt={movie.original_title} /></Link>
            </div>
        </li>
      );
}
