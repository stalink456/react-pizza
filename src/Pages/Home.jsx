import React from "react";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import { useEffect, useState } from "react";
// import PizzaContext from "../context/PizzaContext";

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [selected, setSelected] = useState({
    name: "популярности (по убыванию)",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true);

    const category = activeCategory > 0 ? `category=${activeCategory}` : "";
    const sortBy = selected.sortProperty.replace("-", "");
    const order = selected.sortProperty.includes("-") ? "asc" : "desc";

    fetch(
      `https://62a89479943591102ba5cef7.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [activeCategory, selected]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={activeCategory}
          onClickCategory={(i) => setActiveCategory(i)}
        />
        <Sort value={selected} onClickSort={(i) => setSelected(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((value) => <PizzaBlock key={value.id} {...value} />)}
      </div>
    </div>
  );
}

export default Home;
