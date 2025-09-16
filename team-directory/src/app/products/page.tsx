import NewProductDialog from "../components/features/new-product-dialog";
import ProductCard from "../components/shared/product-card";
import { Product } from "../models/products/read";

const ProductsPage = async () => {
  const response = await fetch(
    "http://localhost/team-api/index.php/api/products"
  );
  const products = await response.json();

  return (
    <>
      <div className="flex justify-end p-6">
        <NewProductDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
