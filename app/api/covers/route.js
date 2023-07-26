import { covergen } from '@/lib/covergen';
import clientPromise from "@/lib/mongodb";
import { NextResponse } from 'next/server';


export async function POST(req, res) {
  const {lastMessage, titlefordb} = await req.json()
    console.log(titlefordb, 'ABOOBABABJS~');
  const count = 1
  const size = 512

  const coverprompt = {
    prompt: lastMessage,
    n: count,
    size: `${size}x${size}`,
    response_format: 'url',
  }

    // return data;
    const coverurl = await covergen(coverprompt)
    const client = await clientPromise;
    const db = client.db("Glimpse");

    
    await db.collection("books_info").insertOne({
    title: titlefordb,
    summary: lastMessage,
    url: coverurl
    });

    // const urlfordb = coverurl
    // console.log(urlfordb, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA')

    return new NextResponse(JSON.stringify({coverurl}))
}