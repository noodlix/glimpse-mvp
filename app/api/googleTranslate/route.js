import { googleTranslate } from "@/lib/googleTranslate";
import { NextResponse } from "next/server";

const API_KEY = "AIzaSyBV_ixAW3XGP-vabufb8gyRBKBYz2dZ6aQ";

export async function POST(req, res) {
  const { text, lang } = await req.json();

  const translationprompt = {
    q: text,
    target: lang,
    key: API_KEY,
  };

  const resulttext = await googleTranslate(translationprompt);

  return new NextResponse(JSON.stringify({ resulttext }));
}
