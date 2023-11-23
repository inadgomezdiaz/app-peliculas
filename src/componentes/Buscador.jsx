import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


export default function Buscador() {

  const MySwal = withReactContent(Swal)

  const navigate = useNavigate()



  const handleSubmit = e => {
    e.preventDefault()
    const keyword = e.currentTarget.keyword.value;
    if (keyword.trim().length < 4) {
      MySwal.fire({
        title: "error",
        text: "introduce la pelicula que desees buscar (minimo 5 caracteres)",
        icon: "error",
        confirmButtonText: "Ok"
      })
    } else {
      e.currentTarget.keyword.value = ""
      navigate(`/resultados?resultados=${keyword}`)
    }
  }

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid" >
          <form className="d-flex" onSubmit={handleSubmit} role="search">
            <input className="form-control me-2" type="search" name="keyword" id="keybord" placeholder="Search" aria-label="Buscar " />
            <button className="btn btn-outline-success" type="submit">Buscar</button>
          </form>
        </div>
      </nav>
    </>
  )
}