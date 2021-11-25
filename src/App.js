import Header from "./components/Header";
import GroupContainer from "./components/Group-Container";
import Cart from "./components/Cart";
import data from "./data/data.json";
import names from "./data/names.json";
import { useState, useEffect } from "react";

// Main App function
// Главная функция приложения
function App() {
  // Function to generate random conversion rate for the price
  // Функция генерирующая случайное число для курса доллара для отображения
  function generateRandomNumbers(min, max, places) {
    // If both the minimum and maximum values are integers, return a random integer. Don't let the user specify any decimal places.
    if (Number.isInteger(min) && Number.isInteger(max)) {
      if (places !== undefined) {
        new Error("Cannot specify decimal places with integers.");
      }
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Otherwise, return a random floating point number with specified decimal places.
    else {
      // Make sure the minimum value is a number.
      if (Number.isNaN(Number.parseFloat(min))) {
        new Error("Minimum value is not a number.");
      }

      // Make sure the maximum value is a number.
      if (Number.isNaN(Number.parseFloat(max))) {
        new Error("Maximum value is not a number.");
      }

      // Make sure the decimal places value is a non-negative number greater than 0.
      if (Number.isInteger(places) === false) {
        new Error("Number of decimal places is not a number.");
      }

      if (places <= 0) {
        new Error("Number of decimal places must be at least 1.");
      }

      // Generate the floating point number.
      let value = Math.random() * (max - min + 1) + min;
      return Number.parseFloat(value).toFixed(places);
    }
  }

  // State for the initial conversion rate. Set to 70 RUB/$.
  // Стейт для начального курса доллара. Установлен как 70 RUB/$.
  const [conversionRate, setConversionRate] = useState(70);
  const [cartItems, setCartItems] = useState([]);

  // Extracting nesessary data from the json file
  // Достаем нужную информацию из файла
  const dataValues = data.Value.Goods;

  // Array for holding the group ID
  // Лист с групповыми идентификаторами
  const uniqueGroup = [];
  dataValues.forEach((item) => {
    if (uniqueGroup.indexOf(item.G) === -1) {
      uniqueGroup.push(item.G);
    }
  });

  // Constructor for the products. I chose to do it this way instead of handling this process down the line to save time
  // Конструктор для продуктов. Совмещает в себе данные из обоих файлов здесь, вместо сопоставления на уровне компонентов
  // Так было быстрее и проще
  const products = [];
  dataValues.forEach((item) => {
    const tempObj = {
      groupId: item.G,
      id: item.T,
      groupName: names[item.G].G,
      itemName: names[item.G].B[item.T],
      itemPrice: item.C,
      amount: item.P,
    };
    products.push(tempObj);
  });

  // Hook, that updates the conversion rate once in 15 seconds
  // Функция обновляющая курс доллара раз в 15 секунд
  useEffect(() => {
    setInterval(
      () => setConversionRate(generateRandomNumbers(20, 80, 2)),
      15000
    );
  }, []);

  // On add handler
  // Функция для обработки продукта и добавлении в корзину
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  // On remove handler
  // Функция для обработки продукта при удалении из корзины
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  // Component render
  // Рендер компонентов
  return (
    <div className="App">
      <Header
        countCartItems={cartItems.length}
        conversionRate={conversionRate}
      ></Header>
      <div className="row">
        <GroupContainer
          uniqueGroup={uniqueGroup}
          products={products}
          conversionRate={conversionRate}
          onAdd={onAdd}
        ></GroupContainer>

        <Cart
          conversionRate={conversionRate}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
        ></Cart>
      </div>
    </div>
  );
}

export default App;
