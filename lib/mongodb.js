import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local')
}

client = new MongoClient(uri, options)
clientPromise = client.connect()

export default clientPromise
