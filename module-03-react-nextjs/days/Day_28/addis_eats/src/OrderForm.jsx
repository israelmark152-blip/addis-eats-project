import { useState } from "react";

export default function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
  });

  // Validates TeleBirr format (09... or +2519...)
  const validPhone = /^(?:\+251|0)9\d{8}$/.test(form.phone);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Order submitted for ${form.name} in ${form.area}`);
  }

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h3>Delivery Details</h3>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your name"
        required
      />
      <input
        type="text"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone (09... or +2519...)"
      />
      {form.phone && !validPhone && (
        <p className="err">Use format 09... or +2519...</p>
      )}
      <select name="area" value={form.area} onChange={handleChange}>
        <option value="Bole">Bole</option>
        <option value="Kazanchis">Kazanchis</option>
        <option value="Piassa">Piassa</option>
      </select>
      <button type="submit" disabled={!validPhone || !form.name}>
        Pay with TeleBirr
      </button>
    </form>
  );
}