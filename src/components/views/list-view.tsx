import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"

interface Props {
  items: any[]
}

export default function ListView({ items }: Props) {
  return (
    <div className="space-y-3">
      {items.map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition"
        >
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                Product #{i + 1}
              </h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3 text-blue-500" />
              Jakarta
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Short description here...</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
            View
          </button>
        </div>
      ))}
    </div>
  )
}
