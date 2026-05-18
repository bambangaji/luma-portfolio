import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"

interface Props {
  items: any[]
}

export default function CardView({ items }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
      {items.map((_, i) => (
        <div
          key={i}
          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 truncate">
              Product #{i + 1}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3 text-blue-500" />
              Jakarta
            </p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Some description here...</p>
        </div>
      ))}
    </div>
  )
}
