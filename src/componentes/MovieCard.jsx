import { Link } from "react-router-dom";
import "../hojas-de-estilo/card.css"

export default function MovieCard({ title, image, overview, movieID, addOrRemoveFavorites }) {


  return (

    <div className="card m-3 g-3 h-100 d-inline-block  ">
      <img src={image} className="card-img-top " alt={`${title}imagen`} />
      <button className="fav-btn" onClick={addOrRemoveFavorites} data-movie-id={movieID} >🖤</button>
      <div className="card-body   ">
        <h5 className="card-title ">{title}</h5>
        <p className="card-text  ">{overview}</p>
        <Link to={`/detalle?movieID=${movieID}`} className="btn btn-primary">Ver mas</Link>
      </div>
    </div>
  )
};