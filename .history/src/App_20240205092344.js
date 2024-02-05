import { useState } from "react";
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
  return (
    <div className="App">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={items}
        onToggleItem={handleToggleItem}
        onDelete={handleDelete}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> ⏰ TODO LIST ⏱ </h1>;
}

function Form({ handleAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    console.log(event.target);

    handleAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you want to do?</h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onToggleItem, onDelete }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (setSortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onToggleItem={onToggleItem}
            onDelete={onDelete}
          />
        ))}
      </ul>
      <div className="action">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by input description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
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
