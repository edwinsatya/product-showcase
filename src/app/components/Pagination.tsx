import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
  sortBy: string;
  order: string;
  category: string;
}

export default function Pagination({
  category,
  order,
  page,
  sortBy,
  totalPages,
}: PaginationProps) {
  // helper to build link
  const buildLink = (p: number) =>
    `/?page=${p}&sortBy=${sortBy}&order=${order}&category=${category}`;

  // generate page numbers with ellipsis
  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      // show all if few pages
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      {/* Prev Button */}
      {page > 1 && (
        <Link
          href={buildLink(page - 1)}
          className="px-3 py-1 rounded-full border bg-white text-gray-700 hover:bg-gray-100 text-sm md:text-base"
        >
          ‹ Prev
        </Link>
      )}

      {/* Page Numbers */}
      {getPages().map((p, i) =>
        typeof p === "number" ? (
          <Link
            key={i}
            href={buildLink(p)}
            className={`px-3 py-1 rounded-full border text-sm md:text-base ${
              page === p
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {p}
          </Link>
        ) : (
          <span key={i} className="px-2 text-gray-400">
            {p}
          </span>
        )
      )}

      {/* Next Button */}
      {page < totalPages && (
        <Link
          href={buildLink(page + 1)}
          className="px-3 py-1 rounded-full border bg-white text-gray-700 hover:bg-gray-100 text-sm md:text-base"
        >
          Next ›
        </Link>
      )}
    </div>
  );
}