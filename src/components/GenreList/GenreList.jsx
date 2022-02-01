import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "../../utils/httpClient";
import { UseStateContext } from "../../contexts/UseStateContext"

export default function GenreList() {

    document.title = "Movies by Genres"; /* TITLE PAGE (EL TEXTO DE LA PESTAÑITA DE CHROME) */
      
    const [ genres, setGenres ] = useState([])
    
    const context = useContext(UseStateContext)
    const {/* genre,*/ setGenre } = context
    
    const postParam = (ev) => {
        setGenre(ev.target.lastChild.data) /* RESCATAR EL NOMBRE DEL GENERO Y PONERSELO AL STATE DEL CONTEXT PARA PINTARLO EN EL COMPONENTE QUE LE TOCA*/
    }

    useEffect(() => {
        get("/genre/movie/list")
        .then(response => {
            console.log(response)
            setGenres(response.genres)
        })
        .catch(err => {
            console.error(err);
        });
    }, []);
    
    

    return (
        <ul>
          {genres.map(genre => <Link to={"/genres/" + genre.id} key={genre.id}> <li onClick={postParam}>{genre.name}</li> </Link>)}
        </ul>
      );
}
