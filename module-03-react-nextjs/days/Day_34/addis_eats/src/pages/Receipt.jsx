import { useLocation, Link } from "react-router-dom";

export default function Receipt() {
  const location = useLocation();
  const orderId = location.state?.orderId || "N/A";

  return (
    <div className="card">
      <h2>Order Confirmed!</h2>
      <p>Thank you for ordering with Addis Eats.</p>
      <p><strong>Order ID:</strong> #{orderId}</p>
      <Link to="/"><button>Back to Menu</button></Link>
    </div>
  );
}