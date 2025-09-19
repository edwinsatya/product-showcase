import generateQuery from "@/utils/generateUrl"
import Link from "next/link"
import Filters from "./components/Filter"
import Pagination from "./components/Pagination"

export default async function Home(props: { 
  searchParams: Promise<{ 
    page?: string 
    sortBy?: string
    order?: "asc" | "desc"
    category?: string
  }> 
}) {
  const searchParams = await props.searchParams
  const page = Number(searchParams.page) || 1
  const limit = 8
  const skip = (page - 1) * limit
  const sortBy = searchParams.sortBy || "title"
  const order = searchParams.order || "asc"
  const category = searchParams.category || ""

  // Build API URL
  const queryParams = generateQuery({ category, order, sortBy, limit, skip })

  const res = await fetch(`https://dummyjson.com/products${queryParams}`, { cache: "no-store" })
  const data: IProductResponse = await res.json()

  // Fetch categories for filter
  const categoryRes = await fetch("https://dummyjson.com/products/category-list")
  const categories: string[] = await categoryRes.json()
  
  const totalPages = Math.ceil(data.total / limit)

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      {/* Sort & Filter Controls */}
      <Filters sortBy={sortBy} order={order} category={category} categories={categories} />

      {/* Grid of products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map((product) => (
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

      {/* Pagination */}
      <Pagination category={category} order={order} page={page} sortBy={sortBy} totalPages={totalPages} />
    </main>
  )
}
