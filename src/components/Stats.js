export default function Stats({ items }) {
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
