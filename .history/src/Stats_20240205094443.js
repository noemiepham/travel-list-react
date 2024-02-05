import { useState } from "react";
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
export default Stats;
