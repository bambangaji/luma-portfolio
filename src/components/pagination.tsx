import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

export default function Pagination() {
  return (
    <div className="flex items-center justify-center gap-3 pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
      <button className="px-3 py-2 text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition">
        <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
        Previous
      </button>

      {[1, 2, 3, 4, 5].map((page) => (
        <button
          key={page}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            page === 1
              ? "bg-blue-600 text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          {page}
        </button>
      ))}
      <span className="text-gray-500 dark:text-gray-400 px-2">...</span>
      <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
        10
      </button>

      <button className="px-3 py-2 text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition">
        Next
        <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
      </button>
    </div>
  )
}
