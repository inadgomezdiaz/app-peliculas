import { Link } from "react-router-dom"
import Buscador from "./Buscador"

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Test PelisFlix</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              <Link className="nav-link" to="/listado">listado</Link>
              <Link className="nav-link" to="/favoritos">favoritos</Link>
            </div>
          </div>
          <Buscador />
        </div>
      </nav>
      {/* <nav>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/listado">Listado</Link>
          <Link to="/contacto">Contacto</Link>
        </ul>
      </nav> */}
    </header>
  )
}