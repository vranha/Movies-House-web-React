import React, { useEffect, useRef, useState } from "react";
import { get } from "../../utils/httpClient";
import { MovieCard } from "../../components";
import InfiniteScroll from "react-infinite-scroll-component"; /* DEPENDENCIA PARA INFINITE SCROLL */
import { Spinner } from "../../components";
import styles from "./Main.module.scss";

export default function Main() {
  const [bestMovies, setBestMovies] = useState([]);
  const [page, setPage] = useState(1); /* PAGINADO DEL INFINITE SCROLL */
  const [hasMore, setHasMore] = useState(true); /* FLAG PARA AVISARLE AL INFINITE SCROLL QUE NO HAY MAS PÁGINAS */
  const [sort] = useState(localStorage.sort ? localStorage.sort : "vote_count.desc" ) 

  const selectRef1 = useRef("puntuation")
  const selectRef2 = useRef("ascending")

  useEffect(() => {
    get(`/discover/movie?sort_by=${sort}&page= + ${page}`)
      .then((response) => {
        setBestMovies((prevMovies) =>
          prevMovies.concat(response.results)
        ); /* PARA QUE NO SE SUSTITUYAN Y FUNCIONE EL INFINITE SCROLL */

        setHasMore(response.page < response.total_pages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page, sort]);


  // SELECT PARA CAMBIAR LA RUTA DEL GET Y FILTRAR POR PARAMETROS
  // GUARDAMOS EN LOCAL STORAGE Y RECARGAMOS PÁGINA PARA QUE SE VEA EN PANTALLA LO DEL LOCAL STORAGE
  const changeSort = () => {
    localStorage.setItem("sort", "vote_count.desc")
    const select1 = selectRef1.current.value
    console.log(select1)
    const select2= selectRef2.current.value
    console.log(select2)

    if (select1 === "puntuation" && select2 === "ascending") {
      localStorage.setItem("sort", "vote_count.asc")
      window.location.reload()
    } else if (select1 === "puntuation" && select2 === "descending") {
      localStorage.setItem("sort", "vote_count.desc")
      window.location.reload()
    } else if (select1 === "popularity" && select2 === "ascending") {
      localStorage.setItem("sort", "popularity.asc")
      window.location.reload()
    } else if (select1 === "popularity" && select2 === "descending") {
      localStorage.setItem("sort", "popularity.desc")
      window.location.reload()
    } else if (select1 === "revenue" && select2 === "ascending") {
      localStorage.setItem("sort", "revenue.asc")
      window.location.reload()
    } else if (select1 === "revenue" && select2 === "descending") {
      localStorage.setItem("sort", "revenue.desc")
      window.location.reload()
    }
  };

  const sorted = () => {
    if (localStorage.sort === "vote_count.asc") {
      return "Puntuation Ascending"
    } else if (localStorage.sort === "vote_count.desc") {
      return "Puntuation Descending"
    } else if (localStorage.sort === "popularity.asc") {
      return "Popularity Ascending"
    } else if (localStorage.sort === "popularity.desc") {
      return "Popularity Descending"
    } else if (localStorage.sort === "revenue.asc") {
      return "Revenue Ascending"
    } else if (localStorage.sort === "revenue.desc") {
      return "Revenue Descending"
    }
  }

  console.log(bestMovies);
  return (
    <InfiniteScroll
      dataLength={bestMovies.length}
      hasMore={hasMore}
      next={() => setPage((prevPage) => prevPage + 1)}
      loader={<Spinner />}
    >
      <label>
        Sort :
        <select ref={selectRef1} name="cars" id="cars" >
          <option value="puntuation">Puntuation</option>
          <option value="popularity">Popularity</option>
          <option value="revenue">Revenue</option>
        </select>

        <select ref={selectRef2} name="cars" id="cars" >
          <option value="descending">Descending</option>
          <option value="ascending">Ascending</option>
        </select>
      </label>
      <button onClick={changeSort}>Sort</button>

      <h4>Sorted by {sorted()}</h4>

      <ul className="popularMovies">
        {bestMovies.map((movie) => (
          <MovieCard key={movie.id + Math.random()} movie={movie} />
        ))}
      </ul>
    </InfiniteScroll>
  );
}
