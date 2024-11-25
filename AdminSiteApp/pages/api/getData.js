import { MongoClient } from 'mongodb';

const MONGO_URL = "mongodb+srv://Administrator:POdzaqD17@ksiegarnia.pezok.mongodb.net/Ksiegarnia?retryWrites=true&w=majority&appName=Ksiegarnia";

export default async function handler(req, res) {
  let client;

  try {
    client = new MongoClient(MONGO_URL);
    await client.connect();

    const db = client.db('Ksiegarnia');
    const collection = db.collection('AdminUser');

    const data = await collection.find({}).toArray(); 
    res.status(200).json(data); 
  } catch (error) {
    console.error('Błąd połączenia z MongoDB:', error);
    res.status(500).json({ message: 'Nie udało się pobrać danych' }); 
  } finally {
    if (client) {
      await client.close();
    }
  }
}
