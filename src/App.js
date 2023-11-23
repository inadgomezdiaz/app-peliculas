import './App.css';
import Login from "./componentes/Login.jsx";
import { Routes, Route } from "react-router-dom";
import Listado from './componentes/Listado';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Detalle from './componentes/Detalle';
import Resultados from './componentes/Resultados';
import Favoritos from './componentes/Favoritos';
import { useEffect, useState } from 'react';

function App() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs")

    if (favsInLocal != null) {
      const favsArray = JSON.parse(favsInLocal)
      setFavorites(favsArray)
    }



  }, [setFavorites]);




  const addOrRemoveFavorites = (e) => {
    const favMovies = localStorage.getItem("favs")

    let tempFavMoves

    if (favMovies === null) {
      tempFavMoves = [];
    } else {
      tempFavMoves = JSON.parse(favMovies);
    }

    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const movieData = {
      movieImage: parent.querySelector("img").getAttribute("src"),
      movieDescription: parent.querySelector("p").innerText,
      movieTitle: parent.querySelector("h5").innerText,
      movieID: btn.dataset.movieId,
    }


    let isMovieInArray = tempFavMoves.find(oneMovie => { return oneMovie.movieID === movieData.movieID })
    

    if (!isMovieInArray) {
      tempFavMoves.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempFavMoves))
      setFavorites(movieData)

    } else {
      tempFavMoves = tempFavMoves.filter(oneMovie => oneMovie.movieID !== movieData.movieID)
      localStorage.setItem("favs", JSON.stringify(tempFavMoves))
      setFavorites(tempFavMoves)

    }

  }



  return (
    <>
      <Header />
      <div className="container nt-3">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/listado" element={<Listado addOrRemoveFavorites={addOrRemoveFavorites} />} />
          <Route path="/detalle" element={<Detalle />} />
          <Route path="/resultados" element={<Resultados addOrRemoveFavorites={addOrRemoveFavorites} />} />
          <Route path="/favoritos" element={<Favoritos addOrRemoveFavorites={addOrRemoveFavorites} favorites={favorites} />} />
        </Routes>
      </div>
      <Footer />
    </>

  );
}

export default App;
