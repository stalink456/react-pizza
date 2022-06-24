import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://62a89479943591102ba5cef7.mockapi.io/items?id=${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Какая-то ошибка");
        navigate("/");
      }
    }

    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return "Загрузка";
  }

  return (
    <div className="container">
      {pizza &&
        pizza.map((value, index) => (
          <div key={index}>
            <img src={value.imageUrl} alt="Фото пиццы" />
            <h2>{value.name}</h2>
            <h4>{value.price} ₽</h4>
          </div>
        ))}
    </div>
  );
};

export default FullPizza;
