import { useState } from "react";

export default function Form({ onAddItems }) {
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
