import React from "react";

// Cart component
// Компонент с Корзиной
export default function Cart(props) {
  // Deconstructing and adding variables for the rendering
  // Other functionality such as shipping price can be added
  // Деконструкция переданных пропсов и формирование переменных
  // Так же может быть добавлена стоимость доставки
  const { cartItems, onAdd, onRemove, conversionRate } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.itemPrice, 0);
  const shippingPrice = itemsPrice * conversionRate > 1000 ? 0 : 199;
  const totalPrice = itemsPrice;
  return (
    <aside className="block col-1">
      <h2>Корзина</h2>
      <div>
        {cartItems.length === 0 && <div>Корзина пуста</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="col-2">{item.itemName.N}</div>
            <div className="col-2">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{" "}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>

            <div className="col-2 text-right">
              {item.qty} x RUB {(item.itemPrice * conversionRate).toFixed(2)}
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Доставка</div>
              <div className="col-1 text-right">
                RUB {shippingPrice.toFixed(2)}
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <strong>Общая стоимость</strong>
              </div>
              <div className="col-1 text-right price">
                <strong>RUB {(totalPrice * conversionRate).toFixed(2)}</strong>
              </div>
            </div>

            <hr />
            <div className="row">
              <button
                onClick={() =>
                  alert(
                    "Possible implementaion//Возможная имплементация функции"
                  )
                }
              >
                Оформить заказ
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
