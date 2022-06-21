import { useContext } from "react";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { AppContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/Slices/FilterSlice";

function Home() {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);

  const { searchValue } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
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
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(3)].map((_, index) => <Skeleton key={index} />)
          : items.map((value) => <PizzaBlock key={value.id} {...value} />)}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
