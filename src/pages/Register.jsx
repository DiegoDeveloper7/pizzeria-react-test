import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from '../context/UserProvider';

export const Register = () => {
  const { register } = useContext(UserContext);

  // Estados para los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto

    // Validaciones básicas
    if (!email || !password || !confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Debes completar todos los campos.',
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña muy corta',
        text: 'La contraseña debe tener al menos 6 caracteres.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'Verifica que las contraseñas sean iguales.',
      });
      return;
    }

    // Llamada al método register del contexto
    const { ok, error } = await register({ email, password });

    if (ok) {
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Tu cuenta ha sido creada correctamente.',
        confirmButtonColor: '#28a745',
        background: '#1e3a8a',
        color: '#fff',
      });

      // Limpiar los campos
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrarse',
        text: error,
      });
    }
  };

  return (
    <div className="form-container-register container py-5 mt-5">
      <form onSubmit={handleSubmit} className="form-body-register">
        <h2 className="text-center mb-5">Ingresa los datos del formulario</h2>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control input-field"
            placeholder="Ingresa tu mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control input-field"
            placeholder="Ingresa contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Confirmar Contraseña</label>
          <input
            type="password"
            className="form-control input-field"
            placeholder="Confirma tu contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn submit-btn w-100">Enviar Datos</button>
      </form>
    </div>
  );
};