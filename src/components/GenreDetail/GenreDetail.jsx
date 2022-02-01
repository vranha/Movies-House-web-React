import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get } from "../../utils/httpClient";
import InfiniteScroll from 'react-infinite-scroll-component'    /* DEPENDENCIA PARA INFINITE SCROLL */ 
import { Spinner } from "../../components";
import { UseStateContext } from "../../contexts/UseStateContext"

export default function GenreDetail() {

    const context = useContext(UseStateContext)
    const { genre /*, setGenre*/ } = context
    
    const [ movies, setMovies] = useState([])
    const [ page, setPage] = useState(1)            /* PAGINADO DEL INFINITE SCROLL */
    const [ hasMore, setHasMore] = useState(true)   /* FLAG PARA AVISARLE AL INFINITE SCROLL QUE NO HAY MAS PÁGINAS */

  
    const { genreId } = useParams()

    const urlString = "/discover/movie?api_key=***&language=en-US&sort_by=vote_count.desc&page=1&with_genres=" + genreId;

    useEffect(() => {
        localStorage.setItem("genre", String(genre)) /* GUARDAR EN LOCAL STORAGE EL NOMBRE DEL GENERO PARA QUE NO SE BORRE AL ACUALIZAR PÁGINA YA QUEE VIENE DE UN USESTATE */
    }, [genre]);

    useEffect(() => {
        
        get(urlString + "&page=" + page)
        .then(response => {
            console.log(response)
            setMovies(prevMovies => prevMovies.concat(response.results))    /* PARA QUE NO SE SUSTITUYAN Y FUNCIONE EL INFINITE SCROLL */
            setHasMore(response.page < response.total_pages)
        })
        .catch(err => {
            console.error(err);
        });
    }, [urlString, page]);

    if (!movies) {
        return null;
    }

    


    return (
        <InfiniteScroll 
        dataLength={movies.length} 
        hasMore={hasMore} 
        next={() => setPage(prevPage => prevPage + 1)}
        loader={<Spinner/>} 
        >
            <h1>{genre}</h1>
            <ul>
                {movies.map(movie => {
                    const imageUrl = movie.poster_path ? "https://image.tmdb.org/t/p/w300" + movie.poster_path : "https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg"
                    return (
                        <li key={movie.id}>
                            <Link to={`/movie/${movie.id}`} ><h3>{movie.original_title}</h3></Link>
                            <Link to={`/movie/${movie.id}`} > <img  width={230} height={345} src={imageUrl} alt={movie.original_title} /></Link>
                            <p>{movie.vote_average}</p>
                            <p>{movie.release_date}</p>
                        </li>
                    )
                })}
            </ul>
        </InfiniteScroll>
      );
}
