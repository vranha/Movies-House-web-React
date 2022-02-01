import {NavLink, useNavigate} from "react-router-dom"
import { themes } from '../../contexts/ThemeContext' 
import sun from '../../assets/sun.png'
import moon from '../../assets/moon.png'
import m from '../../assets/m.png'
import styles from './Header.module.scss'
import { Searcher } from "../../components"

export default function Header({ theme, setTheme, search, setSearch }) {

    const navigate = useNavigate()
    
// PARA EL CAMBIO DE DARK/LIGHT
    const toggleTheme = () => {
        theme === themes.dark
            ? setTheme(themes.light)
            : setTheme(themes.dark)
    }

    return (
        <nav>              {/* NAVLINK ES COMO LINK PERO CON isActive PARA SEÑALAR LA RUTA ACTIVA */}
            <NavLink className={({ isActive }) => (isActive ? styles.active : "") } to="/about">About</NavLink>
            <NavLink className={({ isActive }) => (isActive ? styles.active : "") } to="/profile">Profile</NavLink>
            <NavLink className={({ isActive }) => (isActive ? styles.active : "") } to="/genres">Genres</NavLink>
            <NavLink className={({ isActive }) => (isActive ? styles.active : "") } to="/favorites">Favorites</NavLink>
            <Searcher search={search} setSearch={setSearch}/>
            <img onClick={toggleTheme} src={theme === themes.dark ? sun : moon} alt="theme" />
           
           <div className={styles.containerTitle} onClick={() => navigate("/")}>
               <img className={styles.m} src={m} alt="" />
                <h2 className={styles.ovies}> OVIES  </h2>
                <h2 className={styles.house}> HOUSE </h2>
           </div>
        </nav>
    )
}
