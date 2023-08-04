import { translateText } from "@/lib/googleTranslate";
import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

export async function POST(req, res) {
  const { inputText, desiredlang } = await req.json();

  const translationprompt = {
    q: inputText,
    target: desiredlang,
    key: API_KEY,
  };

  const resulttext = await translateText(translationprompt);
  return new NextResponse(JSON.stringify({ resulttext }));
}
