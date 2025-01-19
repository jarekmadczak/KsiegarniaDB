import mongoose from 'mongoose';

// URL połączenia z bazą danych Ksiegarnia
const MONGO_URL = "mongodb+srv://Administrator:Admin@ksiegarnia.pezok.mongodb.net/Ksiegarnia?retryWrites=true&w=majority&appName=Ksiegarnia";

export async function mongooseConnect() {
  // Sprawdzenie, czy już istnieje połączenie
  if (mongoose.connection.readyState === 1) {
    console.log("Połączono z bazą danych Ksiegarnia");
    return mongoose.connection;
  }

  console.log("Łączenie z bazą danych Ksiegarnia...");
  return mongoose.connect(MONGO_URL).then(() => {
    console.log("Połączono z bazą danych Ksiegarnia");
  });
  
}
