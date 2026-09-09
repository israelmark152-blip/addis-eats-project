import { useState } from "react";
import { validate, AREAS } from "./validate";
import { Field } from "./Field";
import { placeOrder } from "../api/orders";
import { useCartStore } from "../store/cartStore";

export function CheckoutForm({ onSuccess }) {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  // Pure derived errors on render
  const errors = validate(form);
  const hasErrors = Object.keys(errors).length > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    // Mark all as touched to display errors if submitted early
    setTouched({ name: true, phone: true, area: true, notes: true });

    // Focus first invalid field
    const firstError = Object.keys(errors)[0];
    if (firstError) {
      document.getElementById(firstError)?.focus();
      return;
    }

    if (submitting) return; // Prevent double-submission
    setSubmitting(true);

    try {
      const order = await placeOrder({ ...form, items });
      clearCart();
      if (onSuccess) onSuccess(order);
    } catch (err) {
      setServerError(err.fieldErrors?.phone || "Order submission failed. Please try again.");
      // Focus first error on failure while retaining form input values
      document.getElementById("phone")?.focus();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: "400px", margin: "0 auto" }}>
      {serverError && (
        <div role="alert" style={{ background: "#f8d7da", padding: "0.75rem", marginBottom: "1rem", borderRadius: "4px" }}>
          {serverError}
        </div>
      )}

      <Field id="name" label="Full Name" error={errors.name} touched={touched.name}>
        <input name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} />
      </Field>

      <Field id="phone" label="TeleBirr Mobile Number" error={errors.phone} touched={touched.phone}>
        <input name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur} placeholder="09... or +2519..." />
      </Field>

      <Field id="area" label="Delivery Area" error={errors.area} touched={touched.area}>
        <select name="area" value={form.area} onChange={handleChange} onBlur={handleBlur}>
          {AREAS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </Field>

      <Field id="notes" label="Special Instructions (Optional)" error={errors.notes} touched={touched.notes}>
        <textarea name="notes" value={form.notes} onChange={handleChange} onBlur={handleBlur} rows={3} />
      </Field>

      <button type="submit" disabled={submitting || (Object.keys(touched).length > 0 && hasErrors)} style={{ padding: "0.75rem 1.5rem", cursor: "pointer" }}>
        {submitting ? "Sending your order..." : `Confirm Order - ${total} ETB`}
      </button>
    </form>
  );
}