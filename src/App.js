import { useState } from "react";
import "./index.css";
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

function Logo() {
  return <h1>🏝️Far Away🧳</h1>;
}
function Form({ onAddItems }) {
  //controlled element: means keep the state in React and not in the DOM: in order to do that 3 steps
  //1. we need some state
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  //const [items, setItems] = useState([]);
  //in order to pass items to the packingList, we cannot do it with props because Form is a sibling of the packingList
  //so we use a tecknique called Lift up state i.e lift const[item,setItems].. to the closest parent component
  //adding a newItem on the packingList

  //creating an event handler to submit the form right in the component as follows
  function handleSubmit(e) {
    //stop it from the html form reloading when you hit enter. we want to submit the form without reloading
    e.preventDefault();
    //create a newItem
    const newItem = { description, quantity, packed: false, id: Date.now() };
    //add a guard to stop submitting when there is no description
    if (!description) return;
    //for reset
    //call the handleAddItems function here;now it is onAddItems
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    //go to this form and listen to this handler by adding onSubmit;make sure not to call this function here
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😎 trip</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/*<option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        Let use an array instead and the map method s shown below
        we want to do it dynamically
        */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/*2.now we come down to the value where react want to control and use that state as a value of the input field*/}
      {/*3. in order to connect that value to the fild value, use onChange*/}
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
//let's com to the packingList and accept that items props as shown below
//then instaed of initialItems, we now render items
//then receive this props inside the packingList:onDeleteItem
function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {/*Item: the name of the component ;item: the name of the props,{item}:the object}*/}
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            key={item.id}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, onDeleteItem, onToggleItem }) {
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
function Stats({ items }) {
  //derived state from items state
  //early return as conditional rendering:if there is  0 items , no need to calculate the below as it is 0 anyway;
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀 </em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    //em stands for emphasize for formated below
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : ` 🧳 You have ${numItems} items on your list. And you arleady packed
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}

export default App;
