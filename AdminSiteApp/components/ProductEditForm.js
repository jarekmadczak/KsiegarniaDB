import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function EditProductForm({ productId }) {
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
  const [amount, setAmount] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch categories
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });

    // Fetch product details
    axios.get(`/api/products?id=${productId}`).then((res) => {
      const product = res.data;
      setTitle(product.title);
      setAuthor(product.author);
      setLanguage(product.language);
      setIsbn(product.isbn);
      setPublisherName(product.publisher?.name || "");
      setPublisherYear(product.publisher?.year || "");
      setDescription(product.description);
      setPrice(product.price);
      setPages(product.pages);
      setImages(product.images || []);
      setCategory(product.category || "");
      setAmount(product.amount || 0);
    });
  }, [productId]);

  const uploadImages = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setIsUploading(true);
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }
      try {
        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setImages([...images, ...response.data.links]);
      } catch (error) {
        console.error("Upload error:", error);
      }
      setIsUploading(false);
    }
  };
  const deleteImage = (imageUrl) => {
    setImages(images.filter((img) => img !== imageUrl));
  };
  

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = {
      _id: productId, // Add the ID for the PUT request
      title,
      author,
      language,
      isbn,
      publisher: { name: publisherName, year: publisherYear },
      description,
      price,
      pages,
      images,
      category,
      amount,
    };
    try {
      const response = await axios.put("/api/products", data); // Use PUT instead of POST
      router.push("/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  

  return (
    <form onSubmit={saveProduct} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      {/* Product Name */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Nazwa ksiązki</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Author */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Autor</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Language */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Jezyk</label>
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ISBN */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">ISBN</label>
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Publisher Name */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Wydawnictwo Nazwa</label>
        <input
          type="text"
          value={publisherName}
          onChange={(e) => setPublisherName(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Publisher Year */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Wydawnictwo Rok</label>
        <input
          type="number"
          value={publisherYear}
          onChange={(e) => setPublisherYear(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Cena</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Pages */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Strony</label>
        <input
          type="number"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Opis</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Amount */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Ilosc</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Gatunek</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Wybierz gatunek</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Images */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Zdjecia</label>
        <input
          type="file"
          multiple
          onChange={uploadImages}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isUploading && <div>Uploading...</div>}
        <div className="flex gap-2 mt-2 flex-wrap">
          {images.map((img, index) => (
            <div key={index} className="relative group w-24 h-24">
            <img
              src={img}
              alt={`Product ${index}`}
              className="w-full h-full object-cover rounded-md"
            />
            <div
              className="absolute inset-0 bg-red-600 bg-opacity-75 text-white flex justify-center items-center opacity-0 group-hover:opacity-100 rounded-md cursor-pointer"
              onClick={() => deleteImage(img)}
            >
              Usuń
            </div>
        
        </div>
      ))}
      </div>
</div>
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Zapisz produkt
      </button>
    </form>
  );
}

