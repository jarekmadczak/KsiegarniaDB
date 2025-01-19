import { mongooseConnect } from "../../lib/mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the User schema with the address field
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true }, // Add address field
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export default async function handle(req, res) {
  const { method, body } = req;
  await mongooseConnect();

  try {
    if (method === "POST") {
      if (body.action === "register") {
        // Registration logic
        const { firstName, lastName, email, password, address } = body;

        // Validate input
        if (!email || !password || !firstName || !lastName || !address) {
          return res.status(400).json({ message: "Wszystkie pola są wymagane." });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "Email jest już zajęty." });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const newUser = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          address,
        });

        await newUser.save();

        return res.status(201).json({ message: "Użytkownik zarejestrowany pomyślnie." });
      } else if (body.action === "login") {
        // Login logic
        const { email, password } = body;

        // Validate input
        if (!email || !password) {
          return res.status(400).json({ message: "Email i hasło są wymagane." });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: "Nieprawidłowy email lub hasło." });
        }

        // Compare the entered password with the stored password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(400).json({ message: "Nieprawidłowy email lub hasło." });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ token, message: "Zalogowano pomyślnie." });
      } else {
        return res.status(400).json({ message: "Nieznana akcja." });
      }
    } else if (method === "GET") {
      // GET request: Retrieve user info based on JWT token
      const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

      if (!token) {
        return res.status(401).json({ message: "Brak tokenu autoryzacyjnego." });
      }

      try {
        const decoded = jwt.verify(token, JWT_SECRET); // Verify token
        const userId = decoded.userId; // Extract user ID from token

        // Find the user by ID and exclude the password field
        const user = await User.findById(userId).select("-password");
        if (!user) {
          return res.status(404).json({ message: "Nie znaleziono użytkownika." });
        }

        return res.status(200).json(user); // Return the user's data
      } catch (error) {
        return res.status(401).json({ message: "Nieprawidłowy lub wygasły token." });
      }
    } else {
      return res.status(405).json({ message: "Metoda nieobsługiwana." });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: error.message || "Wystąpił błąd." });
  }
}
