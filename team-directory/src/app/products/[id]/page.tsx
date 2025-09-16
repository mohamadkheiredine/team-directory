import ProductCard from "@/app/components/shared/product-card";

interface ProductDetailsParams {
  params: Promise<{ id: number }>;
}

const ProductDetailsPage = async ({ params }: ProductDetailsParams) => {
  const { id } = await params;
  const res = await fetch(`http://localhost/team-api/index.php/api/products/${id}`);
  const product = await res.json();

  return (
    <div className="p-2 md:p-4">
      <ProductCard product={product} isViewDetail={false} />
    </div>
  );
};

export default ProductDetailsPage;