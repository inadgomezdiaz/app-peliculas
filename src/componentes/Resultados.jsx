import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MovieCard from "./MovieCard";


export default function Resultados({ addOrRemoveFavorites }) {

  const token = sessionStorage.getItem("token")

  let query = new URLSearchParams(window.location.search)

  let keywordID = query.get("resultados")

  const MySwal = withReactContent(Swal)


  const [resultados, setResultados] = useState([]);

  useEffect(() => {


    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=34f8f4e48a9a537dbbc557b24212f1cc&language=es-ES&query=${keywordID}`


    axios.get(endPoint)
      .then(res => {
        const resultadosList = res.data.results
        setResultados(resultadosList)
      }).catch((error) => {
        MySwal.fire({
          title: "error",
          text: "Ha habido un error con el servidor, intentalo de nuevo mas tarde",
          icon: "error",
          confirmButtonText: "Ok"
        })
      })


  }, [keywordID, setResultados, MySwal]);





  return (
    <>
      {!token && <Navigate to="/" />}
      <b><h2> Buscaste: {keywordID} </h2></b>
      {resultados.length === 0 && <p>No hay resultados validos para tu busqueda</p>}
      <div className="row">
        {
          resultados.map((movie, inx) => {
            return (
              <div className="col-xl-3 col-md-6 col-lg-4 col-12" key={inx} >
                <MovieCard title={movie.original_title}
                  image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  movieID={movie.id}
                  addOrRemoveFavorites={addOrRemoveFavorites} />
              </div>
            )
          })
        }
      </div>


    </>
  )
}