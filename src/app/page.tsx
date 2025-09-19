import generateQuery from "@/utils/generateUrl"
import Filters from "./components/Filter"
import Pagination from "./components/Pagination"
import Products from "./components/Products"

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
  const limit = 12
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
      {/* Sort & Filter Controls */}
      <Filters sortBy={sortBy} order={order} category={category} categories={categories} />

      {/* Grid of products */}
      <Products products={data.products} />

      {/* Pagination */}
      <Pagination category={category} order={order} page={page} sortBy={sortBy} totalPages={totalPages} />
    </main>
  )
}
