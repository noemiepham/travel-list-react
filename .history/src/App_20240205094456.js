import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./Packinglist";
import Stats from "./Stats";
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
