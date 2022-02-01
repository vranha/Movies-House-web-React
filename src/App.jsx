import { Home, About, Profile, Header, Footer, MovieDetails, GenreList, GenreDetail, SearchedMovies, Favorites } from "./components";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { useState } from "react";
import ThemeContext, { themes } from './contexts/ThemeContext' 
import UseStateProvider from "./contexts/UseStateContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


// import useCounter from "./hooks/exampleHook";

function App() {
  const [theme, setTheme] = useState(themes.light);

  const [search, setSearch] = useState('');

  // const {counter, sumar, restar} = useCounter()

  return (
    <Router>

        <ToastContainer/>
        <UseStateProvider>
          <ThemeContext.Provider value={themes.dark}>
          <div style={theme}>
            <Header theme={theme} setTheme={setTheme} search={search} setSearch={setSearch} />
            <Routes>
              <Route path="*" element={<Navigate replace to="/" />} />
              <Route path="/">
                <Route index element={<Home  />} />
                <Route path="movie/:movieId" element={<MovieDetails/>}/>
                <Route path="/about">
                  <Route index element={<About />} />
                </Route>
                <Route path="/favorites">
                  <Route index element={<Favorites />} />
                </Route>
                <Route path="/profile" element={<Profile />} />
                <Route path="/genres">
                  <Route index element={<GenreList/>} />
                  <Route path=":genreId" element={<GenreDetail/>}></Route>
                </Route>
                <Route path="/search/movies" element={<SearchedMovies search={search} setSearch={setSearch} />} />
              </Route>
            </Routes>
            <Footer />
          </div>
          </ThemeContext.Provider>
        </UseStateProvider>
      
    </Router>
  );
}

export default App;
