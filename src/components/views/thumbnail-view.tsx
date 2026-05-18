import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import type { ItemDetail } from "../../models/item-detail.model";

interface Props {
  items: any[],
  minHeight?: string
}

export default function ThumbnailView({ items }: Props) {
  const navigate = useNavigate();
  const handleClick = (product: ItemDetail) => {
    navigate(`/product/${product.id}`, { state: product });
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, i) => (
        <div
          key={i}
          onClick={() => handleClick(item)}
          className="cursor-pointer group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 bg-white dark:bg-gray-900"
        >
          <div className="aspect-video bg-gray-200 dark:bg-gray-800 overflow-hidden">
            <img
              src={`https://picsum.photos/300/200?random=${i}`}
              alt={`Result ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="p-4 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                Product #{i + 1}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3 text-blue-500" />
                Jakarta
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              A short description about this product, showing just enough to catch your eye.
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
