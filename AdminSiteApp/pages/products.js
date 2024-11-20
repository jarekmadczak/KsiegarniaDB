import Link from "next/link";
import Layout from "../components/Layout"
export default function products() {

   return <Layout>
    <div className="py-3 px-4"></div>
          <Link className="bg-green-700 text-white rounded-md py-3 px-4 mt-30" href={'/products/new'}>Dodaj Produkt</Link>
        </Layout>
  }
  