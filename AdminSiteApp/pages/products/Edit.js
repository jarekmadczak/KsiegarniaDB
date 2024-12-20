import Layout from "../../components/Layout";
import EditProductForm from "../../components/ProductEditForm";
import { useRouter } from "next/router";


export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query; // Fetch the product ID from the URL

  return (
    <Layout>
      {id ? (
        
         <div className="content-normal text-center"> <h1 className="text-center font-bold text-xl">Edytuj</h1> <EditProductForm productId={id} /> </div>
        // Pass the product ID to the EditProductForm
      ) : (
        <div className="text-center mt-10">Loading...</div> // Show a loader if ID is not available
      )}
    </Layout>
  );
}
