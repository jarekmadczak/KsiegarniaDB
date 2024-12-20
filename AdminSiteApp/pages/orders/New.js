import OrderForm from "../../components/OrdersForm";// Import OrderForm component
import Layout from "../../components/Layout";  // Import Layout component


export default function NewOrder() {
  return (
    <Layout>
      <h1 className="text-center font-bold text-xl">Nowe Zamówienie</h1>
      <div className="content-normal text-center">
        <OrderForm />  {/* Add the OrderForm component here */}
      </div>
    </Layout>
  );
}
