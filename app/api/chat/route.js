import { OpenAIStream } from '@/lib/OpenAIStream';
// import clientPromise from "@/lib/mongodb";

import { NextResponse } from 'next/server';

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

export const runtime = 'edge';

export async function POST(req) {
  const body = await req.json()

  const messages = [
    {
      role: 'system',
      content: `write preview of the given book under 400 characters as if you were describing a painting of an important scene from the book. use epithets and describe everything literally and precisely, do not say the name of the book or the name of the author  do not include any additional information`,
    },
  ]
  messages.push(...body?.messages)

  const payload = {
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS
      ? parseInt(process.env.AI_MAX_TOKENS)
      : 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  }

  // const client = await clientPromise;
  // const db = client.db("nextjs-mongodb-demo");
  // await db.collection("messages").insertOne({message: messages.slice(-1)[0].content});

  const stream = await OpenAIStream(payload)
  return new NextResponse(stream)
}
