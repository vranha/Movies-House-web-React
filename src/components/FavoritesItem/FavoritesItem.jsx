import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './FavoritesItem.module.scss'
import { toast } from 'react-toastify';
import {BlockPicker} from 'react-color'
import Tippy from '@tippyjs/react'

export default function FavoritesItem({ item, i, handleDelete, data }) {

    const navigate = useNavigate()
    const [change, setChange] = useState("");

    const inputChange = (ev) => {   /* SAVE THE VALUE OF INPUT */
        setChange(ev.target.value)  
    }


    // GUARDAR EL LOCALSTORAGE CUANDO ELIMINAMOS UN FAVORITO
    useEffect(() => {
        localStorage.setItem('fav', JSON.stringify(data))
    }, [data]);
       

    // CAMBIAR PROPIEDADES DEL ARRAY DE OBJETOS GUARDADO EN LOCAL STORAGE (Y PONER TOAST)
        const handleChange = (id, quote) => {
            const newData = data.map(a => {
                if (a.id === id) {
                    a.type = quote
                    console.log(a)
                    return a
                } else {
                    return a
                }
                
            })
            console.log(newData)
            localStorage.setItem("fav", JSON.stringify(newData))
            toast.success('Mooving to ' + quote, {
                position: "top-center",
                autoClose: 1500,
                icon: "🏃",
                hideProgressBar: false,                    /* NOTIFICACIÓN */
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                });
            setTimeout(() => {
                window.location.reload()    /* RECARGAMOS PARA QUE SE APLIQUEN AL INSTANTE LOS CAMBIOS DEL LOCAL STORAGE YA QUE LA PAGINA PINTA LO QUE HAY EN EL LOCALSTORAGE */
            }, 1500);

            
        }
        // CAMBIAR COLOR DEL OBJETO DEL LOCAL STORAGE (IGUAL QUE ARRIBA PERO EL COLOR)
        const handleColor = (id, color) => {
            const newData = data.map(a => {
                if (a.id === id) {
                    a.color = color             
                    console.log(a)
                    return a
                } else {
                    return a
                }
                
            })
            console.log(newData)
            localStorage.setItem("fav", JSON.stringify(newData))
            window.location.reload() 
        }
    // TERNARIO ANIDADO PARA CAMBIAR DE COLOR EL FONDO DEL SPAN DEPENDIENDO DEL idem.type QUE TENGA
        let backColor = item.type === "Pendent" ? "#FFF4E1"
        : item.type === "Need to watch now" ? "#B0C2F2"
        : item.type === "Some day maybe..." ? "#A5C494"
        : "#D3BCF6";
    
    return(
        <>
        <div key={item.id} style={{backgroundColor: item.color}}>
             <p>{ i + 1 }</p>
            <h4 onClick={() => navigate(`/movie/${item.id}`)} className={styles.name} >{ item.name }</h4>
            <div className="itemState">
                {/* TIPPY PARA TENER COSAS ESCONDIDAS QUE SALEN AL HACER HOVER DEL BUTTON DE DENTRO */}
                <Tippy interactive={true} placement={'bottom'} content={
                    <BlockPicker    /* VENTANA DE ELEGIR COLOR */
                    color={item.color}
                    onChangeComplete={color => handleColor(item.id, color.hex)}   
                    />
                } >
                <button>Change color</button>
                </Tippy>
                <span style={{backgroundColor: backColor}}>{item.type}</span>
                <button title="change" onClick={ ()=> handleChange(item.id, "Need to watch now")}>"Need to watch NOW" </button>
                <button title="change" onClick={ ()=> handleChange(item.id, "Some day maybe...")}>"Some day maybe..." </button>
                <button title="change" onClick={ ()=> handleChange(item.id, "Pendent")}>"Pendent" </button>
                <div className="watchWithDiv">
                    <p>Or</p>
                    <form onSubmit={ (ev) => ev.preventDefault()}>
                        <input type="text" onChange={inputChange} placeholder="Watch with..." />
                        <button title="change" onClick={ ()=> handleChange(item.id,("Watch with " + change) )}> ☑ </button>
                    </form>
                </div>
            </div>
            <button title="delete" onClick={ ()=> handleDelete(item.id)}>Delete</button>
            
        </div>
        </>
    )
}