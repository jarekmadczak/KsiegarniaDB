import { MongoClient } from 'mongodb';

const MONGO_URL = "mongodb+srv://Administrator:POdzaqD17@ksiegarnia.pezok.mongodb.net/Ksiegarnia?retryWrites=true&w=majority&appName=Ksiegarnia";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metoda nie dozwolona' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email i hasło są wymagane' });
  }

  let client;

  try {
    client = new MongoClient(MONGO_URL);
    await client.connect();

    const db = client.db('Ksiegarnia');
    const usersCollection = db.collection('AdminUser'); // Kolekcja AdminUser

    // Wyszukanie użytkownika na podstawie emaila
    const user = await usersCollection.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
    }

    // Zalogowano pomyślnie
    return res.status(200).json({ message: 'Zalogowano pomyślnie' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd serwera wewnętrznego' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
