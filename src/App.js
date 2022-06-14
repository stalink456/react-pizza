import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";

import "./scss/app.scss";
import pizzas from "./assets/pizza.json";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            {/* <Categories /> */}
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((value) => (
              <PizzaBlock
                key={value.id}
                {...value}
                // title={value.name}
                // price={value.price}
                // key={index}
                // imageUrl={value.imageUrl}
                // sizes={value.sizes}
                // types={value.types}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
