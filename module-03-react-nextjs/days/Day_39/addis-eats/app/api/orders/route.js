import { orderSchema } from "@/lib/schema";

export async function POST(request) {
  const body = await request.json();
  const result = orderSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      { error: "Validation failed", fieldErrors: result.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  return Response.json({ id: "ord_812", status: "created", data: result.data }, { status: 201 });
}