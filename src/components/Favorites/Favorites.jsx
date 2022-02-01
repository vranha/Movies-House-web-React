import { useContext } from "react"
import { FavoritesItem, EmptyFav } from "../../components"
import FavoritesContext from "../../contexts/FavoritesContext"


export default function Favorites() {

    document.title = "Your Favorites";

    const { data, handleDelete} = useContext(FavoritesContext)
    console.log(data.length)
    

    
    return(
        <>
        
        {
            data.length ? (
                data.map((item, i )=> (
                    <FavoritesItem key={item.id} item={item} i={i} handleDelete={handleDelete} data={data} />
                ))
            ) : (
                <EmptyFav></EmptyFav> /* DENTRO APROVECHO QUE ESTO SOLO SE RENDERIZA CUANDO NO HAY ITEMS PARA ELIMINAR EL LOCALSTORAGE */
            )
        }
        </>
    )
}