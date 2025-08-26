// src/pages/Login.jsx
import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import Swal from "sweetalert2";

export const Login = () => {
  const { login } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      Swal.fire("Error", "La contraseña debe tener al menos 6 caracteres", "error");
      return;
    }

    const { ok, error } = await login({ email, password });

    if (ok) {
      Swal.fire("Éxito", "Inicio de sesión exitoso", "success");
    } else {
      Swal.fire("Error", error, "error");
    }
  };

  return (

    <div className="container mt-5 form-container-login">
     

      <form onSubmit={handleSubmit} className="form-body-login">
         <h2 className="form-body-login h2">Iniciar sesión</h2>
        <div className="mb-4">
          <i className="fas fa-pizza-slice me-2"></i>
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <i className="fas fa-pizza-slice me-2"></i>
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

         <div className="d-flex justify-content-center">
               <button type="submit" className="btn btnLoginPro">
                  Entrar
              </button>
         </div>
      </form>
    </div>

  );
};