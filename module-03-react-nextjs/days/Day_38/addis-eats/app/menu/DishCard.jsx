export default function DishCard({ dish }) {
  return (
    <div style={{ borderBottom: "1px solid #eee", padding: "8px 0" }}>
      <h4>{dish.name}</h4>
      <p>Price: {dish.price} ETB</p>
    </div>
  );
}
