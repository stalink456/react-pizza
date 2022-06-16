import axios from "axios";

const pizzaUrl = axios.create({
  baseURL: "https://62a89479943591102ba5cef7.mockapi.io/items",
});

//get pizza
export const getPizza = async () => {
  const response = await pizzaUrl.get();
  return response.data;
};

//get pizza by raiting/price/alphabet sort by desc/asc
export const getPizzaSort = async (value, order) => {
  const response = await pizzaUrl.get(`?sortBy=${value}&order=${order}`);
  return response.data;
};
