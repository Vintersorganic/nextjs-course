// /api/new-meetup
import { MongoClient } from 'mongodb'

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body 

    const client = await MongoClient.connect('mongodb+srv://varulvsnatt:varulvsnatt@cluster0.m2aur.mongodb.net/nextJSmeetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupCollections = db.collection('meetups')
    const result = await meetupCollections.insertOne(data)

    console.log(result);

    client.close()

    res.status(201).json({
      message: 'Meetup inserted!'
    })
  }
}

export default handler