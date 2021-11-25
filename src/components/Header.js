import React from "react";
import { useSpring, animated } from "react-spring"; // Animation library/Библиотека с анимацией

// Header container with animation logic
// Контейнер с заголовком и логикой для анимации смены курса доллара
export default function Header(props) {
  const { conversionRate } = props;

  // Needs to be moved to a separate component. Ran out of time to do that
  // Нужно перенести в свой отдельный компонент. Не успел в сроки
  const Animation = React.memo(({ value, skip }) => {
    // First Animation Style
    // Первая разновидность анимации
    const styleGreen = useSpring({
      from: { color: "green", fontWeight: "bold" },
      to: { color: "black", fontWeight: "normal" },
      delay: 3000,
    });

    // Second Animation Style
    // Вторая разновидность анимации
    const styleRed = useSpring({
      from: { color: "red", fontWeight: "bold" },
      to: { color: "black", fontWeight: "normal" },
      delay: 3000,
    });

    // Counter for current value of the conversion rate
    // Каунтер текущего курса доллара
    let currentValue = 70;

    // Conditionals for the return statement for different animation to play
    // Условия для разных анимаций
    if (value > currentValue) {
      currentValue = value;
      return (
        <animated.span style={{ ...(skip ? {} : styleGreen) }}>
          {value}
        </animated.span>
      );
    } else if (value < currentValue) {
      currentValue = value;
      return (
        <animated.span style={{ ...(skip ? {} : styleRed) }}>
          {value}
        </animated.span>
      );
    } else {
      currentValue = value;
      return (
        <animated.span style={{ fontWeight: "normal" }}>{value}</animated.span>
      );
    }
  });

  return (
    <header className="block row center">
      <div>
        <h1>
          Курс доллара:{" "}
          <Animation value={conversionRate} skip={conversionRate === 70} />{" "}
          RUB/$
        </h1>
      </div>
      <div>
        <span>
          Корзина{" "}
          {props.countCartItems ? (
            <button className="badge">{props.countCartItems}</button>
          ) : (
            ""
          )}
        </span>{" "}
      </div>
    </header>
  );
}
