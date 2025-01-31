import Item from "./Item";
import { useState } from "react";
export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  //using derived state to implement sortBy
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items.sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {/*Item: the name of the component ;item: the name of the props,{item}:the object}*/}
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            key={item.id}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      {/*addind sort method inside the packing list to avoid another lifting state*/}
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by descriptionr</option>
          <option value="packed">Sort by packed status</option>
        </select>
        {/*adding a button to clear the entire list*/}
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
