import { useNavigate, useSearchParams } from "react-router-dom";


export default function Searcher({ search, setSearch }) {

const navigate = useNavigate()
const [searchParams, setSearchParams] = useSearchParams() /* PARA ESCRIBIR EN LOS QUERYPARAMS */

// AL HACER SUBMIT VIAJAMOS A LA RUTA QUE HEMOS CREADO AÑADIENDO LO QUE ESCRIBIMOS EN LOS PARAMS DIRECTAMENTE DESDE EL ONCHANGE DEL INPUT
const handleSubmit = (ev) => {
    ev.preventDefault();

    navigate(`/search/movies/?${searchParams}`)
    console.log(search)
    setSearch('')
}

// FUNCIÓN PARA SACAR EL VALOR DEL INPUT Y METERLO EN STATE Y EN STATEPARAMS(QUERY)
const handleChange = (ev) => {
    const { value } = ev.target
    setSearch(value)
    setSearchParams(value)
  }

return (
    <>  
        <form onSubmit={handleSubmit}>
            <input value={search} onChange={handleChange} type="text" placeholder="Search movie"/>
            <button>🔍</button>
        </form>
    </>
) 

}