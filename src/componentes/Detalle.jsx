import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function Detalle() {

  const token = sessionStorage.getItem("token")

  let query = new URLSearchParams(window.location.search)

  let movieID = query.get("movieID")

  const MySwal = withReactContent(Swal)




  const [movie, setMovie] = useState({});

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=34f8f4e48a9a537dbbc557b24212f1cc&language=es-ES`
    axios.get(endPoint)
      .then((response) => {
        const movieData = response.data
        setMovie(movieData)

      })
      .catch((error) => {
        MySwal.fire({
          title: "error",
          text: "Ha habido un error con el servidor, intentalo de nuevo mas tarde",
          icon: "error",
          confirmButtonText: "Ok"
        })
      })

  }, [setMovie, movieID, MySwal]);


  return (
    <>
      {!token && <Navigate to="/" />}
      {!movie && <p>Cargando....</p>}
      {movie &&
        <>
          <h2>Titulo: {movie.original_title} </h2>
          <div className="row">
            <div className="col-4 col-xs-12">
              <img className="img-fluid" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.name} />
            </div>
            <div className="col-8">
              <h5>fecha de estreno: {movie.realise_date} </h5>
              <h5>Descripcion : {movie.overview} </h5>
              <h5>Generos :</h5>
              <ul>
                {movie.genres?.map((genre) => { return (<li key={genre.id}>{genre.name}</li>) })}
              </ul>
            </div>
          </div>
        </>}
    </>
  )
}