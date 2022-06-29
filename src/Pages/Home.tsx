import { useEffect } from "react";
import { useSelector } from "react-redux";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import React from "react";
import { selectFilter } from "../redux/filter/selectors";
import { selectPizzaData } from "../redux/pizza/selectors";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { setCategoryId, setCurrentPage } from "../redux/filter/slice";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  useEffect(() => {
    const getPizzas = async () => {
      const category: string = categoryId > 0 ? `category=${categoryId}` : "";
      const sortBy: string = sort.sortProperty.replace("-", "");
      const order: string = sort.sortProperty.includes("-") ? "asc" : "desc";
      const search: string = searchValue ? `&search=${searchValue}` : "";
      dispatch(
        fetchPizzas({
          category,
          sortBy,
          order,
          search,
          currentPage: currentPage,
        })
      );

      window.scrollTo(0, 0);
    };

    getPizzas();
  }, [
    categoryId,
    sort.sortProperty,
    currentPage,
    navigate,
    dispatch,
    searchValue,
  ]);

  //Чтобы не было ререндера компонента Categories
  const onClickCategory = React.useCallback(
    (idx: number) => {
      dispatch(setCategoryId(idx));
    },
    [dispatch]
  );

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sort} />
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
            : items.map((value) => <PizzaBlock {...value} key={value.id} />)}
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
