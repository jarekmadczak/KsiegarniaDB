import multer from "multer";
import path from "path";
import fs from "fs";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './public/uploads'; 
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
   
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
export const config = {
  api: { bodyParser: false },
};

const uploadImages = upload.array('file');  
export default async function handler(req, res) {
  if (req.method === "POST") {
    //multer
    uploadImages(req, res, (err) => {
      if (err) {
        console.error("Error uploading files:", err);
        return res.status(500).json({ error: "Error uploading files." });
      }

      //return the file paths in array
      const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
      return res.status(200).json({ links: imagePaths });
    });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
