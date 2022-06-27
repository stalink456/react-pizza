import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/Slices/FilterSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { sortList } from "../components/Sort";
import { fetchPizzas, selectPizzaData } from "../redux/Slices/PizzaSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      //@ts-ignore
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`/?${queryString}`);
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
  //TO DO
  useEffect(() => {
    getPizzas();
    if (!isSearch.current) {
    }

    isSearch.current = false;
    // eslint-disable-next-line
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id: number) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="container">
          <div className="content__error-info">
            <h2>
              Корзина пустая <span>😕</span>
            </h2>
            <p>
              К сожалению не удалось получить питсы Попробуйте повторить попытку
              позже
            </p>
          </div>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(3)].map((_, index) => <Skeleton key={index} />)
            : items.map((value: any) => (
                <PizzaBlock {...value} key={value.id} />
              ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        onChangePage={(page: number) => dispatch(setCurrentPage(page))}
      />
    </div>
  );
};

export default Home;