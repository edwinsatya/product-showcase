import Link from 'next/link'

interface PaginationProps {
  page: number
  totalPages: number 
  sortBy: string
  order: string
  category: string
}

export default function Pagination({ category, order, page, sortBy, totalPages }: PaginationProps){
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Link
            key={i}
            href={`/?page=${i + 1}&sortBy=${sortBy}&order=${order}&category=${category}`}
            className={`px-4 py-2 rounded-lg border ${
              page === i + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
  )
}