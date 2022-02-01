import { useEffect } from "react";


export default function EmptyFav({ data }) {

    // ELIMINAR EL LOCALSTORAGE CUANDO NO QUEDAN ITEMS(PORQUE SI NO SIEMPRE SE QUEDA CON UNO)
    useEffect(() => {
        localStorage.removeItem('fav');
    }, []);

    return(
        <>
        <h3>There are no movies on your list... yet.</h3>
        </>
    )
}