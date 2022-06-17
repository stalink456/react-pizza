import React from "react";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import { useEffect, useState } from "react";
// import PizzaContext from "../context/PizzaContext";

function Home({ searchValue }) {
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
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://62a89479943591102ba5cef7.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [activeCategory, selected, searchValue]);

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
          : items
              // .filter((obj) => {
              //   if (
              //     obj.name.toLowerCase().includes(searchValue.toLowerCase())
              //   ) {
              //     return true;
              //   }

              //   return false;
              // })
              .map((value) => <PizzaBlock key={value.id} {...value} />)}
      </div>
    </div>
  );
}

export default Home;
