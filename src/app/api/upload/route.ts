import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import { rateLimit } from "@/lib/rate-limit";

const ACCEPTED_EXT = [".glb", ".gltf", ".stl"];
const MAX_SIZE_BYTES = 40 * 1024 * 1024;

export async function POST(req: Request) {
  const limited = rateLimit(req, "upload");
  if (limited) return limited;

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file provided." }, { status: 400 });
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ACCEPTED_EXT.includes(ext)) {
    return NextResponse.json(
      { ok: false, error: `Unsupported file type. Use ${ACCEPTED_EXT.join(", ")}.` },
      { status: 422 }
    );
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json(
      { ok: false, error: "File is too large (max 40MB)." },
      { status: 422 }
    );
  }

  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const filename = `${uuid()}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadsDir, filename), buffer);

    const origin = new URL(req.url).origin;
    return NextResponse.json(
      { ok: true, url: `${origin}/uploads/${filename}` },
      { status: 201 }
    );
  } catch (err) {
    console.error("[upload] failed:", err);
    return NextResponse.json(
      { ok: false, error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
