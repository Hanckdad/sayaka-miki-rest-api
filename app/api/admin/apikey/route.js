import { verifySession } from "@/lib/adminSession";
import { addKey, deleteKey, listKeys } from "@/lib/apikey";

export async function GET() {
  if (!verifySession()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json(listKeys());
}

export async function POST(req) {
  if (!verifySession()) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { label } = await req.json();
  const key = addKey(label || "new-key");

  return Response.json({ key });
}

export async function DELETE(req) {
  if (!verifySession()) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { key } = await req.json();
  deleteKey(key);

  return Response.json({ success: true });
}