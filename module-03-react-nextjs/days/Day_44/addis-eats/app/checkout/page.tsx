"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { orderSchema } from "@/lib/schema";
import { getSessionAction } from "@/app/actions/auth";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const session = await getSessionAction();
      if (!session) {
        router.push("/signin?next=/checkout");
      } else {
        if (session.name) {
          setFormData((prev) => ({ ...prev, name: session.name }));
        }
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = orderSchema.safeParse(formData);

    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        name: formatted.name?._errors[0],
        phone: formatted.phone?._errors[0],
      });
      return;
    }

    setErrors({});
    setSubmitted(true);
    clearCart();
  };

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-500">
        Checking authentication...
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="text-center py-16 bg-white border rounded-xl p-8 max-w-lg mx-auto shadow-sm mt-8">
        <h2 className="text-3xl font-bold text-emerald-600 mb-2">Order Confirmed! 🎉</h2>
        <p className="text-gray-600">
          Thank you, {formData.name}. We will contact you at {formData.phone} shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 border rounded-xl shadow-sm mt-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number (Ethiopia)
          </label>
          <input
            type="text"
            placeholder="0912345678"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <button
          type="submit"
          disabled={cart.length === 0}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          {cart.length === 0 ? "Your Cart is Empty" : "Place Order"}
        </button>
      </form>
    </div>
  );
}