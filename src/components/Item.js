//let's com to the packingList and accept that items props as shown below
//then instaed of initialItems, we now render items
//then receive this props inside the packingList:onDeleteItem
export default function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      {/*conditional stylin: if an item is packed return then we want an object whick contains some strike rule ,or if not packed return an empty object*/}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      {/* create a new function and pass in the current id as shown below in order to delete;passing onDeleteItem props alone will not work*/}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
