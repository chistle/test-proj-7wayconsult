import React from "react";
import Product from "./Product";

// Component for the group rendering of the products
export default function Group(props) {
  const { products, onAdd, conversionRate } = props;
  return (
    <main className="block col-2">
      <h2>{products[0].groupName}</h2>
      <div className="row">
        {products.map((product) => (
          <Product
            key={product.id}
            conversionRate={conversionRate}
            product={product}
            onAdd={onAdd}
          ></Product>
        ))}
      </div>
    </main>
  );
}
