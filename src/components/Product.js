import React from "react";

// Simple product component
// Простой компонент с продуктами
export default function Product(props) {
  const { product, onAdd, conversionRate } = props;
  return (
    <div>
      <h3>{product.itemName.N}</h3>
      <div>RUB {(product.itemPrice * conversionRate).toFixed(2)}</div>
      <div>
        <button onClick={() => onAdd(product)}>Добавить в корзину</button>
      </div>
    </div>
  );
}
