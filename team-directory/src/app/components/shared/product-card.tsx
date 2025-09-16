"use client";
import { Product } from "@/app/models/products/read";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./button";
import EditProductDialog from "../features/edit-product-dialog";
import DeleteProductDialog from "../features/delete-product-dialog";

const ProductCard = ({
  product,
  isViewDetail = true,
}: {
  product: Product;
  isViewDetail?: boolean;
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm hover:scale-105 transform transition-all duration-300 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
        <span className="text-sm text-gray-500">{product.sku}</span>
      </div>

      <div className="mb-2">
        <p className="text-gray-700">
          <span className="font-semibold">Price:</span> ${product.price}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Stock:</span> {product.stock}
        </p>
      </div>

      {isViewDetail && (
        <Link
          href={`/products/${product.id}`}
          className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-sm px-3"
        >
          View Details
        </Link>
      )}

      {!isViewDetail && (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
          <Button
            className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition h-10"
            onClick={() => setIsEditOpen(true)}
          >
            Edit Product
          </Button>
          <EditProductDialog
            isOpen={isEditOpen}
            onOpenChange={setIsEditOpen}
            product={product}
          />
          <DeleteProductDialog product={product} isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
          <Button
            className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition h-10"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete Product
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
