import { useNavigate } from "react-router-dom";
import { submitOrder } from "../api/orders";

export default function Checkout() {
  const navigate = useNavigate();

  const handleConfirm = async () => {
    const res = await submitOrder();
    if (res.success) {
      navigate("/receipt", { state: { orderId: res.orderId } });
    }
  };

  return (
    <div className="card">
      <h2>Checkout</h2>
      <p>Confirm your order details below.</p>
      <button onClick={handleConfirm}>Confirm & Pay</button>
    </div>
  );
}