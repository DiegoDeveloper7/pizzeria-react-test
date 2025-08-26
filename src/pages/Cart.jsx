import { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartProvider";
import { useUser } from "../context/UserProvider";

export const Cart = () => {
  const { cart, increaseCount, decreaseCount, total } = useCart();
  const { token } = useUser();

  const [successMessage, setSuccessMessage] = useState("");

  const formattedTotal = total.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });

  const handleCheckout = async () => {
    if (!token) return; // Evita ejecutar si no hay token

    try {
      const response = await axios.post(
        "http://localhost:5001/api/checkouts",
        { items: cart },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Su pedido ha sido exitoso. ¡Gracias por su compra!");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 tituloCart">🛒 Detalles del pedido</h2>

      {cart.map((pizza) => (
        <div
          key={pizza.id}
          className="row align-items-center border rounded p-3 mb-3 shadow-sm bodyCart"
        >
          {/* Imagen */}
          <div className="col-auto">
            <img
              src={pizza.img}
              alt={pizza.name}
              className="rounded"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
          </div>

          {/* Nombre */}
          <div className="col">
            <h5 className="mb-0 text-capitalize">{pizza.name}</h5>
          </div>

          {/* Precio */}
          <div className="col-auto text-end">
            <p className="mb-0 fw-bold">
              {pizza.price.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </p>
          </div>

          {/* Botones */}
          <div className="col-auto d-flex align-items-center">
            <button
              className="btn btn-danger btn-sm me-2"
              onClick={() => decreaseCount(pizza.id)}
            >
              -
            </button>
            <span className="fw-bold">{pizza.count}</span>
            <button
              className="btn btn-success btn-sm ms-2"
              onClick={() =>
                increaseCount({
                  id: pizza.id,
                  img: pizza.img,
                  name: pizza.name,
                  description: pizza.description,
                  price: pizza.price,
                  ingredients: pizza.ingredients,
                })
              }
            >
              +
            </button>
          </div>
        </div>
      ))}

      <div className="text-end mt-4 textoTotal">
        <h4>
          Total: <span className="textoTotal">{formattedTotal}</span>
        </h4>
      </div>

      {token && (
        <div className="text-center mt-3">
          <button className="btn btn-lg button-pay" onClick={handleCheckout}>
            Pagar
          </button>
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success text-center mt-3">
          {successMessage}
        </div>
      )}
    </div>
  );
};