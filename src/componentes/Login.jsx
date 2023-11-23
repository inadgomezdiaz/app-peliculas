import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from "react-router-dom";


export default function Login() {

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)


  const handleSubmit = e => {

    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (email === "" || password === "") {
      MySwal.fire({
        title: "error",
        text: "Los campos no pueden estar vacios",
        icon: "error",
        confirmButtonText: "Ok"
      })
      return;
    }
    if (!emailRegex.test(email) && email !== "") {
      MySwal.fire({
        title: "error",
        text: "debe introducir un emaill valido",
        icon: "error",
        confirmButtonText: "Ok"
      })
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      MySwal.fire({
        title: "error",
        text: "no ha ingresado sus credenciales correctamente",
        icon: "error",
        confirmButtonText: "Ok"
      })
      return;
    }
    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then(res => {
        MySwal.fire({
          title: "success",
          text: "prerfecto, ingresaste correctamente",
          icon: "success",
          confirmButtonText: "continuar"
        })
        const tokenRecibido = res.data.token;
        sessionStorage.setItem("token", tokenRecibido);
        navigate("/listado")
      })
  }

  return (

    <>
      <div className="row">
        <div className="col-6 offset-3">
          <h2>Formulario De login</h2>
          <form className="row d-block g-3 mt-3" onSubmit={handleSubmit}>
            <div className="col-auto">
              <label htmlFor="email" className="visually-hidden">ingrese un email</label>
              <input type="email" className="form-control" id="email" name="email" placeholder="email@example.com" />
            </div>
            <div className="col-auto">
              <label htmlFor="password" className="visually-hidden">ingrese una contraseña</label>
              <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">Ingresar</button>
            </div>
          </form>
        </div>
      </div>

    </>
  );
}