import { useEffect, useState } from "react";
/* const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Money", quantity: 10, packed: false },
  { id: 4, description: "Billets", quantity: 12, packed: true },
]; */

export default function App() {
  //const [notes, setNotes] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9000/notes")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  console.log("data", items);

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
  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/notes/" + id, {
      method: "DELETE",
    });
    console.log("delet", items);
    const newItem = items.filter((item) => item.id !== id);
    setItems(newItem);
  };

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
  return <h1> ⏰ Travel List ⏱ </h1>;
}
const isFormValid = (item) => {
  return item.description;
};
function Form({ handleAddItems }) {
  const [notes, setNotes] = useState({
    id: undefined,
    description: "",
    quantity: 1,
    packed: false,
  });
  //  const [description, setDescription] = useState("");
  //const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    //if (!notes) return;

    if (isFormValid(notes)) {
      console.log("gdsgdsg");
      fetch("http://localhost:9000/notes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(notes),
      })
        .then((res) => console.log(res.json()))
        .then((item) => {
          console.log("dddddd", item);
          // handleAddItems(item)
        });
    }
    /* 
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    console.log(event.target);

    handleAddItems(newItem); */
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you want to do?</h3>
      <select
        value={notes.quantity}
        onChange={(event) =>
          setNotes({ ...notes, quantity: event.target.value })
        }
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
        value={notes.description}
        onChange={(event) =>
          setNotes({ ...notes, description: event.target.value })
        }
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onToggleItem, onDelete }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <List
            item={item}
            key={item.id}
            onToggleItem={onToggleItem}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

function List({ item, onToggleItem, onDelete }) {
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
