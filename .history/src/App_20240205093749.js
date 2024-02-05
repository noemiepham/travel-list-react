import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
/* const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Money", quantity: 10, packed: false },
  { id: 4, description: "Billets", quantity: 12, packed: true },
]; */

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleToggleItem(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleDelete(id) {
    setItems(items.filter((item) => item.id !== id));
  }
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure yo want to delete all item ?"
    );
    if (confirmed) setItems([]);
  }
  return (
    <div className="App">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={items}
        onToggleItem={handleToggleItem}
        onDelete={handleDelete}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Item({ item, onToggleItem, onDelete }) {
  //console.log("list", item.packed);
  return (
    <li>
      <input type="checkbox" onClick={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <div className="stats">
        {" "}
        Start adding some items to your packing list 🏠
      </div>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  //console.log("footer", items);
  return (
    <footer className="stats" key={items.id}>
      <em>
        {percentage === 100
          ? "you got everything! Ready to go ✈️"
          : `
        You have ${numItems} items on Your list, and you already packed
        ${numPacked} ( ${percentage}% )`}
      </em>
    </footer>
  );
}
