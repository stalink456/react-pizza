import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    name: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://62a89479943591102ba5cef7.mockapi.io/items?id=${id}`
        );

        setPizza(data[0]);
      } catch (error) {
        alert("Какая-то ошибка");
        navigate("/");
      }
    }

    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return <>"Загрузка"</>;
  }

  return (
    <div className="container">
      <div className="full-pizza">
        <img src={pizza.imageUrl} alt="Фото пиццы" />
        <h2>{pizza.name}</h2>
        <h4>{pizza.price} ₽</h4>
      </div>
    </div>
  );
};

export default FullPizza;
