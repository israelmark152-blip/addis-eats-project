export default function DishCard({ dish, onSelect }) {
  if (!dish) return null;

  return (
    <div className="card">
      <h3>{dish.name} - {dish.price} Birr</h3>
      <p>{dish.description}</p>
      <button onClick={() => onSelect(dish)}>View Details</button>
    </div>
  );
}