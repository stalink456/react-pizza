import { useContext } from "react";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { AppContext } from "../App";

function Home() {
  const { searchValue } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
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
      `https://62a89479943591102ba5cef7.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [activeCategory, selected, searchValue, currentPage]);

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
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
