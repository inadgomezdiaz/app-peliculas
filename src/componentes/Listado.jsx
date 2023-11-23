import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



export default function Listado({addOrRemoveFavorites}) {

  const MySwal = withReactContent(Swal)

  const token = sessionStorage.getItem("token")


  const [movies, setMovies] = useState([]);




  useEffect(() => {
    const endPoint = "https://api.themoviedb.org/3/discover/movie?api_key=34f8f4e48a9a537dbbc557b24212f1cc&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"
    axios.get(endPoint)
      .then(res => {
        const apiData = res.data
        setMovies(apiData.results)
      })
      .catch((error) => {
        MySwal.fire({
          title: "error",
          text: "Ha habido un error con el servidor, intentalo de nuevo mas tarde",
          icon: "error",
          confirmButtonText: "Ok"
        })
      })

  }, [setMovies, MySwal])

  return (
    <>
      {!token && <Navigate to="/"></Navigate>}
      <div className="row">
        {
          movies.map((movie, inx) => {
            return (
              <div className="col-xl-3 col-md-6 col-lg-4 col-12" key={inx} > <MovieCard title={movie.title}
                image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                overview={movie.overview}
                movieID={movie.id}
                addOrRemoveFavorites={addOrRemoveFavorites} /></div>
            )
          })
        }
      </div>
    </>
  )
}