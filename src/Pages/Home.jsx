import axios from "axios";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import { useEffect, useState, useRef } from "react";
import Pagination from "../components/Pagination";
import { AppContext } from "../App";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/Slices/FilterSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { sortList } from "../components/Sort";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { searchValue } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPizzas = () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://62a89479943591102ba5cef7.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, navigate]);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );

      isSearch.current = true;
    }
  }, [dispatch]);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
    // eslint-disable-next-line
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
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
}

export default Home;
