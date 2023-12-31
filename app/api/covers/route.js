import { authOptions } from "@/lib/authOptions";
import { covergen } from "@/lib/covergen";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function getBooksData() {
  const client = await clientPromise;
  const db = client.db("Glimpse");
  const booksData = await db.collection("books_info").find({}).toArray();
  return booksData;
}

export async function POST(req, res) {
  // export default async function handler(req, res) {
  // if (req.method === 'POST') {
  const { lastMessage, titlefordb } = await req.json();
  // console.log(titlefordb, "ABOOBABABJS~");
  const count = 1;
  const size = 512;
  const session = await getServerSession(authOptions);
  const { email, image } = session?.user || {};
  const currentDate = new Date(Date.now() + 21600000);

  const coverprompt = {
    prompt: lastMessage,
    n: count,
    size: `${size}x${size}`,
    response_format: "url",
  };

  // return data;
  const coverurl = await covergen(coverprompt);
  const client = await clientPromise;
  const db = client.db("Glimpse");

  await db.collection("books_info").insertOne({
    title: titlefordb,
    summary: lastMessage,
    url: coverurl,
    email: email,
    date: currentDate.toISOString(),
  });

  async function checkUserExists(email) {
    const user = await db.collection("users").findOne({ email });
    return user !== null;
  }
  const userExists = await checkUserExists(email);
  if (!userExists) {
    // Save the email to the 'users' collection
    await db.collection("users").insertOne({
      email: email,
    });
  }
  // const urlfordb = coverurl
  // console.log(urlfordb, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA')

  return new NextResponse(JSON.stringify({ coverurl }));
}
// else if (req.method === 'GET') {

export async function GET(req, res) {
  try {
    const booksData = await getBooksData();
    res.status(200).json(booksData);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
