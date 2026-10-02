import { cookies } from "next/headers";

// Forced dynamic because checkout reads session cookies for live user cart/pricing
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  return (
    <div>
      <h2>Checkout Page</h2>
      <p>Securely processing order details...</p>
    </div>
  );
}