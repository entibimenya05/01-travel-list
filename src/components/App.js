import { useState } from "react";
import "../index";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
{
  /*const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 2, description: "Charger", quantity: 1, packed: true },
];*/
}
function App() {
  //lifting state up as explained in the Form component
  const [items, setItems] = useState([]);
  function handleDeleteItem(id) {
    //setItems  by looping from the current array of items where(a call back function) item.id is different from the id we pass in
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearList() {
    //adding an alert to prevent accidental delete
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    //Now we can do it conditionally
    if (confirmed) setItems([]);
  }
  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      {/* passing items into the packingList using props items
      in order to delete we now need to pass the function as props:handleDeleteItem in to the packingList
      */}
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
  function handleAddItems(item) {
    //...items:existing array
    //item: new item all these form a new array without mutating the old array
    setItems((items) => [...items, item]);
  }
}

export default App;
