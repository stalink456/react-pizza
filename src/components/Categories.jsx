import { useState } from "react";

function Categories() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            onClick={() => setActiveCategory(index)}
            className={activeCategory === index ? "active" : ""}
            key={index}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
