import Link from 'next/link'

interface ProductsProps {
  products: IProduct[]
}

export default function Products({ products }: ProductsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h2 className="text-lg font-semibold line-clamp-1">{product.title}</h2>
            <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
            <div className="mt-3">
              <p className="text-xl font-bold text-blue-600">${product.price}</p>
              <p
                className={`text-sm ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}