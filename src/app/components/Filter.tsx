"use client"
import { useRouter } from "next/navigation"

interface FiltersProps {
  sortBy: string
  order: string
  category: string
  categories: string[]
}

export default function Filters({
  sortBy,
  order,
  category,
  categories,
}: FiltersProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
      {/* Sort Dropdown */}
      <select
        className="px-4 py-2 border rounded-lg"
        defaultValue={sortBy}
        onChange={(e) =>
          router.push(`/?page=1&sortBy=${e.target.value}&order=${order}&category=${category}`)
        }
      >
        <option value="title">Sort by Title</option>
        <option value="price">Sort by Price</option>
        <option value="stock">Sort by Stock</option>
      </select>

      {/* Order Dropdown */}
      <select
        className="px-4 py-2 border rounded-lg"
        defaultValue={order}
        onChange={(e) =>
          router.push(`/?page=1&sortBy=${sortBy}&order=${e.target.value}&category=${category}`)
        }
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      {/* Category Dropdown */}
      <select
        className="px-4 py-2 border rounded-lg"
        defaultValue={category}
        onChange={(e) =>
          router.push(`/?page=1&sortBy=${sortBy}&order=${order}&category=${e.target.value}`)
        }
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}