import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [publisherYear, setPublisherYear] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [pages, setPages] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const uploadImages = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setIsUploading(true);
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }
      try {
        // Send the form data to the upload API
        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Store the returned image URLs
        setImages(response.data.links);
      } catch (error) {
        console.error("Upload error:", error);
      }
      setIsUploading(false);
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { 
      title, 
      author, 
      language, 
      isbn, 
      publisher: { name: publisherName, year: publisherYear },
      description, 
      price, 
      pages, 
      images, 
      category 
    };
    try {
      const response = await axios.post("/api/products", data);
      router.push("/products"); // Redirect after saving the product
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <form onSubmit={saveProduct}>
      {/* Form fields */}
      <div>
        <label>Product Name</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Author</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        <label>Language</label>
        <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} />
      </div>
      <div>
        <label>ISBN</label>
        <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      </div>
      <div>
        <label>Publisher Name</label>
        <input type="text" value={publisherName} onChange={(e) => setPublisherName(e.target.value)} />
      </div>
      <div>
        <label>Publisher Year</label>
        <input type="number" value={publisherYear} onChange={(e) => setPublisherYear(e.target.value)} />
      </div>
      <div>
        <label>Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Pages</label>
        <input type="number" value={pages} onChange={(e) => setPages(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Images</label>
        <input type="file" multiple onChange={uploadImages} />
        {isUploading && <div>Uploading...</div>}
        <div>
          {images.map((img, index) => (
            <img key={index} src={img} alt="Product" style={{ width: 100, height: 100 }} />
          ))}
        </div>
      </div>
      <button type="submit">Save Product</button>
    </form>
  );
}
