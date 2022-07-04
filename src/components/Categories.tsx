import React from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};

const categories: string[] = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

//React.memo убирает так же лишнюю перерисовку
export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onClickCategory }) => {

    return (
      <div className="categories">
        <ul>
          {categories.map((category: string, index: number) => (
            <li
              onClick={() => onClickCategory(index)}
              className={value === index ? "active" : ""}
              key={index}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
