import { useEffect } from "react";
import { toast } from 'react-toastify';


export default function AddMovie({ handleAdd, nameMovie, idMovie, data }) {


    // VARIABLEPARA AÑADIR A FAVORITOS POR FORM
    const handleSubmit = ev => {
        ev.preventDefault();
        
        const newMovie = {
            name: nameMovie,
            id: idMovie,
            type: "Pendent",
            color: "#ccc"
        }
       
    //  SI NO HAY NINGUN ELEMENTO DENTRO DEL ARRAY DE OBJETOS QUE COINCIDA SE AÑADE
        if (!data) {
            handleAdd(newMovie)

            toast.success('Moovie added to Favs!', {
            position: "top-right",
            autoClose: 5000,
            icon: "💚",
            hideProgressBar: false,                    /* NOTIFICACIÓN */
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        } else {
            if (data.some(i => i.name.includes(newMovie.name)) === false) {
            handleAdd(newMovie)

            toast.success('Moovie added to Favs!', {
                position: "top-right",
                autoClose: 5000,
                icon: "💚",
                hideProgressBar: false,                    /* NOTIFICACIÓN */
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        } else {
            toast.warn('Movie added previusly', {
                position: "top-center",
                autoClose: 5000,
                icon: "😐",
                hideProgressBar: false,                  /* NOTIFICACIÓN */
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        }       

        
        
    }
    
    // AÑADIR AL LOCALSTORAGE LO QUE HAY EN EL USESTATE DATA
    useEffect(() => {
        localStorage.setItem('fav', JSON.stringify(data))
        console.log(localStorage.fav)
      }, [data])
      

    return  (
        <>
            <form onSubmit={handleSubmit}>
                <button title="Agregar">Add</button>
            </form>
           
        
        </>
    )
}