import multer from "multer";
import path from "path";
import fs from "fs";

// Setup multer storage to save images in the 'public/uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './public/uploads';  // Path to save files
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate a unique name for the file using the timestamp and original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Disable Next.js's default body parser as we are using `multer` to handle multipart/form-data
export const config = {
  api: { bodyParser: false },
};

const uploadImages = upload.array('file');  // This expects multiple files to be uploaded with the name 'file'

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Use multer to handle file uploads
    uploadImages(req, res, (err) => {
      if (err) {
        console.error("Error uploading files:", err);
        return res.status(500).json({ error: "Error uploading files." });
      }

      // After files are uploaded, return the file paths as an array
      const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
      
      // Respond with the file paths
      return res.status(200).json({ links: imagePaths });
    });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
