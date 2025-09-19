import Carousel from "@/app/components/Carousel";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ id: string }>  }) {
   const { id } = await params;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  
  if (!res.ok) return notFound();
  
  const product: IProduct = await res.json();

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Carousel */}
      <Carousel images={product.images} />

      {/* Product Info */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-2xl font-semibold text-green-600">
            ${product.price}
          </span>
          {product.stock > 0 ? (
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              In Stock
            </span>
          ) : (
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
}