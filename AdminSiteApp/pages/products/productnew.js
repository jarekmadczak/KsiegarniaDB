import ProductForm from "../../components/ProductForm";
import Layout from "../../components/Layout";

export default function NewProduct() {
  return (
    <Layout>
      <h1 className="text-center font-bold text-xl">New Product</h1>
      <div className="content-normal text-center"><ProductForm /> </div>
   
    </Layout>
  );
}