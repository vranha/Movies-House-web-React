import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { get } from "../../utils/httpClient";
import InfiniteScroll from 'react-infinite-scroll-component'    /* DEPENDENCIA PARA INFINITE SCROLL */ 
import { Spinner } from "../../components";

export default function SearchedMovies() {
  const [movies, setMovies] = useState("");

  const [searchParams] = useSearchParams(); /* PARA RECOGER LOS SEARCHPARAMS QUE HEMOS ESCRITO EN EL INPUT (COMPONENTE Searcher) */
   const [ page, setPage] = useState(1)            /* PAGINADO DEL INFINITE SCROLL */
    const [ hasMore, setHasMore] = useState(true)   /* FLAG PARA AVISARLE AL INFINITE SCROLL QUE NO HAY MAS PÁGINAS */


//   NOS DIRIJIMOS A LA RUTA DE LA API QUE CREAMOS CON LOS PARAMS ESCRITOS DESDE EL INPUT
  useEffect(() => {
    get(`/search/movie?&query=${searchParams}&page=${page}`)
      .then((response) => {
        console.log(response);
        setMovies(response.results)    /* PARA QUE NO SE SUSTITUYAN Y FUNCIONE EL INFINITE SCROLL */
        setHasMore(response.page < response.total_pages)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [searchParams, page]);

  if (!movies) {
    return (
      <div>
        <h3>Not Found Results... </h3>
        <p>Try another thing</p>
      </div>
    );
  }

  return (
    // <InfiniteScroll 
    //     dataLength={movies.length} 
    //     hasMore={hasMore} 
    //     next={() => setPage(prevPage => prevPage + 1)}
         
    //     >
    <ul>
      {movies.map((movie) => {
        const imageUrl = movie.poster_path
          ? "https://image.tmdb.org/t/p/w300" + movie.poster_path
          : "https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg";
        return (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <h1>{movie.original_title}</h1>
            </Link>
            <Link to={`/movie/${movie.id}`}>
              <img width={230} height={345} src={imageUrl} alt="img" /> {/* WIDTH I HEIGHT DEFINIDOS AHI PARA QUE LA IMAGEN OCUPE ESPACIO INCLUSO ANTES DE CARGARSE*/}
              
            </Link>
            <p>{movie.vote_average}</p>
            <p>{movie.release_date}</p>
          </li>
        );
      })}
    </ul>
    // </InfiniteScroll>
  );
}
