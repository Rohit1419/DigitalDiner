import Layout from "../components/Layout/Layout";
import Cart from "../components/Cart/Cart";

export default function CartPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <Cart />
      </div>
    </Layout>
  );
}
