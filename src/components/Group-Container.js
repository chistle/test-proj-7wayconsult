import React from "react";

import Group from "./Group";

// Group container rendering different groups
// Контейнер для групп товаров
export default function GroupContainer(props) {
  const { products, conversionRate, onAdd, uniqueGroup } = props;
  const filter = (group, arr) => arr.filter((item) => item.groupId === group);
  return (
    <div className="col-2">
      {uniqueGroup.map((group) => {
        // Filtering of the different product groups/ Фильтрация на группы товаров
        const filteredProducts = filter(group, products);
        return (
          <Group
            key={group}
            products={filteredProducts}
            conversionRate={conversionRate}
            onAdd={onAdd}
          />
        );
      })}
    </div>
  );
}
