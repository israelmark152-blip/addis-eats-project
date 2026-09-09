import { useState } from "react";
import DishCard from "./DishCard";
import SearchBox from "./SearchBox";
import Modal from "../ui/Modal";

const menuData = [
  { id: "1", name: "Doro Wat", price: 240, description: "Spicy chicken stew with boiled egg and Injera." },
  { id: "2", name: "Shiro Tegabeno", price: 120, description: "Slow-cooked chickpea stew in a clay pot." },
  { id: "3", name: "Beef Tibs", price: 300, description: "Sautéed beef strips with onions and peppers." }
];

export default function Menu() {
  const [items, setItems] = useState(menuData);
  const [selectedDish, setSelectedDish] = useState(null);

  const handleSearch = (term) => {
    const filtered = menuData.filter((d) =>
      d.name.toLowerCase().includes(term.toLowerCase())
    );
    setItems(filtered);
  };

  return (
    <section>
      <h2>Menu</h2>
      <SearchBox onSearch={handleSearch} />
      <div className="dish-list">
        {items.map((dish) => (
          <DishCard key={dish.id} dish={dish} onSelect={setSelectedDish} />
        ))}
      </div>

      <Modal isOpen={!!selectedDish} onClose={() => setSelectedDish(null)} title={selectedDish?.name}>
        <p>{selectedDish?.description}</p>
        <p><strong>Price:</strong> {selectedDish?.price} Birr</p>
      </Modal>
    </section>
  );
}