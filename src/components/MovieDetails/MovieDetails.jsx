import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { get } from "../../utils/httpClient";
import { AddMovie } from "../../components";
import FavoritesContext from "../../contexts/FavoritesContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import styles from './MovieDetails.module.scss'

export default function MovieDetails() {
    const { movieId } = useParams() /* USEPARAMS PARA COGER LA RUTA QUERY */
    const [ movie, setMovie ] = useState([])
    const [ genres, setGenres ] = useState([])

    const [nameMovie, setNameMovie] = useState('');
    const [idMovie, setIdMovie] = useState('');

    const { data, handleAdd } = useContext(FavoritesContext)

  

    // HACER GET EN LA RUTA DE LA API COMPLETANDOLA CON LA ID DE LA PELICULA QUE COGEMOS CON EL USEPARAMS
    useEffect(() => {
        get(`/movie/${movieId}`)
        .then(response => {
            console.log(response)
            setMovie(response)
            
            setGenres(response.genres)

            setNameMovie(movie.original_title)
            setIdMovie(movie.id)
        })
        .catch(err => {
            console.error(err);
        });
    }, [movieId, movie.original_title, movie.id]);
    
    
    if (!movie) {
        return null;
    }

    const puntuation = movie.vote_average ? movie.vote_average * 10 : 50;
    
   

    document.title = "Movie: " + movie.title;  /* TITLE PAGE (EL TEXTO DE LA PESTAÑITA DE CHROME) */

   
    
    const imageUrl = movie.poster_path ? "https://image.tmdb.org/t/p/w300" + movie.poster_path : "https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg"

    return (
        <div className="details">
            <h2 className={styles.name}>{movie.original_title}</h2>
            <img  width={230} height={345} src={imageUrl} alt="" />
            <AddMovie handleAdd={handleAdd} nameMovie={nameMovie} idMovie={idMovie} data={data} />
            <p>{movie.vote_average}</p>
            <div className={styles.starDiv}>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            </div>
            <div className={styles.starDivChecked} style={{width: puntuation}}></div>
            <p>{movie.overview}</p>
            <p>{movie.release_date}</p>
            <ul> Genres {genres.map(genre => {
                return (
                    <li key={genre.id}>
                        <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
                    </li>
                )
            })}
               
            </ul>
    </div>
      );
}
