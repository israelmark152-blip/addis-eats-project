import { useNavigate } from "react-router-dom";
import { CheckoutForm } from "../checkout/CheckoutForm";

export default function Checkout() {
  const navigate = useNavigate();

  const handleSuccess = (order) => {
    alert(`Order #${order.id} successfully placed!`);
    navigate("/", { replace: true });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Checkout</h2>
      <CheckoutForm onSuccess={handleSuccess} />
    </div>
  );
}