import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('Glimpse');
  const collection = db.collection('books_info');

  const books = await collection.find().toArray();

  res.status(200).json(books);
}