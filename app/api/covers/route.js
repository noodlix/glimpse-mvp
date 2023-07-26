// import clientPromise from "@/lib/mongodb";
import { covergen } from '@/lib/covergen';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  const {lastMessage} = await req.json()
    console.log(lastMessage, 'ABOOBABABJS~');
  const count = 1
  const size = 512

  const coverprompt = {
    prompt: lastMessage,
    n: count,
    size: `${size}x${size}`,
    response_format: 'url',
  }
    // const client = await clientPromise;
    // const db = client.db("Glimpse");

    // await db.collection("books_info").insertOne({
    // summary: summary,
    // title: title[0].content,
    // });

    // return data;
    const coverurl = await covergen(coverprompt)
    return new NextResponse(JSON.stringify({coverurl}))
}