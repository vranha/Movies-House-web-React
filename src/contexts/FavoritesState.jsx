import { useState } from 'react'
import FavoritesContext from './FavoritesContext'
import { toast } from 'react-toastify';



const FavoritesState = ({children}) => {


   
//   FUNCION DEL USESTATE PARA GUARDAR EN EL STATE LO QUE PONEMOS EN EL LOCALSTORAGE Y QUE NO SE REINICIE EL STATE AL RECARGAR LA PÁGINA
    const [addMovie, setAddMovie] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("fav");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
      }); ;

// FUNCION AÑADIR FAVS
    const handleAdd  = movie => {
        setAddMovie([...addMovie, movie])
    }
// FUNCION ELIMINAR FAVS
    const handleDelete = idMovie => {
     setAddMovie(addMovie.filter( item => item.id !== idMovie))
     toast.error('Movie deleted from Favs', {
        position: "top-center",
        autoClose: 5000,
        icon: "❌",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    // PROVIDER Y SUS PROPS GLOBALES
    return (
        <FavoritesContext.Provider value ={{
            data: addMovie, 
            handleAdd,
            handleDelete,
        }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesState