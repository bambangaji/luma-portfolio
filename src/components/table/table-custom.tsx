import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

type ColumnType = "text" | "number" | "image" | "action" | "link-detail";

interface TableColumn<T> {
  key: keyof T;
  label: string;
  className?: string;
  type?: ColumnType;
  render?: (item: T) => ReactNode;
}

interface SharedTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  darkMode?: boolean;
  rowsPerPage?: number;
  onDetail?: (item: T) => void;
  detailButtonTitle?: string;
  detailButtonIcon?: ReactNode;
  renderDetailButton?: (item: T) => ReactNode;
}

export default function TableCustom<T extends { id?: string | number }>({
  columns,
  data,
  darkMode = false,
  rowsPerPage = 5,
  onDetail,
}: SharedTableProps<T>) {
  const navigate = useNavigate();
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [imageModal, setImageModal] = useState<string | null>(null);

  // ✅ Sorting
  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    return sortDirection === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  // ✅ Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  const renderValue = (value: unknown): ReactNode => {
    if (value == null) return "-";
    if (typeof value === "string" || typeof value === "number") return value;
    return String(value);
  };

  return (
    <div
      className={`overflow-x-auto ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        } shadow-lg rounded-2xl border ${darkMode ? "border-gray-700" : "border-gray-200"
        } p-5 space-y-4`}
    >
      <table className="min-w-full border-collapse">
        <thead>
          <tr
            className={`${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
              }`}
          >
            {columns.map((col, index) => {
              const isActive = sortColumn === col.key;
              return (
                <th
                  key={index}
                  onClick={() => handleSort(col.key)}
                  className={`px-6 py-3 text-left font-semibold cursor-pointer select-none hover:bg-gray-200 dark:hover:bg-gray-700 transition ${col.className ?? ""
                    }`}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {isActive ? (
                      sortDirection === "asc" ? (
                        <FontAwesomeIcon icon={faSortUp} className="w-3 h-3" />
                      ) : (
                        <FontAwesomeIcon icon={faSortDown} className="w-3 h-3" />
                      )
                    ) : (
                      <FontAwesomeIcon icon={faSort} className="w-3 h-3 opacity-50" />
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((item, i) => (
            <tr
              key={i}
              className={`border-t ${darkMode
                ? "border-gray-700 hover:bg-gray-800"
                : "border-gray-100 hover:bg-gray-50"
                } transition`}
            >
              {columns.map((col, idx) => {
                const value = item[col.key];

                switch (col.type) {
                  case "image":
                    return (
                      <td key={idx} className="px-6 py-3">
                        <img
                          src={String(value)}
                          alt="thumbnail"
                          className="w-12 h-12 object-cover rounded-lg cursor-zoom-in hover:scale-105 transition-transform"
                          onClick={() => setImageModal(String(value))}
                        />
                      </td>
                    );

                  case "link-detail": {
                    const pathKey = `${String(col.key)}_path` as keyof T; // e.g. "pic-path"
                    const pathValue = item[pathKey]; // get "profile/12"

                    return (
                      <td key={idx} className="px-6 py-3">
                        <button
                          onClick={() => navigate(`/detail/${pathValue}`)} // ✅ /detail/profile/12
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1 font-medium transition-colors"
                        >
                          {renderValue(value)}{" "}
                          <FontAwesomeIcon icon={faLink} className="w-3 h-3" />
                        </button>
                      </td>
                    );
                  }

                  case "number":
                    return (
                      <td key={idx} className="px-6 py-3 text-right">
                        {renderValue(value)}
                      </td>
                    );

                  case "action":
                    return (
                      <td key={idx} className="px-6 py-3 text-right">
                        <button
                          onClick={() => onDetail?.(item)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium inline-flex items-center gap-1"
                        >
                          View <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                        </button>
                      </td>
                    );

                  default:
                    return (
                      <td key={idx} className="px-6 py-3">
                        {renderValue(value)}
                      </td>
                    );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 px-2 text-sm">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border ${currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-200 dark:hover:bg-gray-800"
              } transition`}
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Prev
          </button>

          <div className="space-x-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg border ${currentPage === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : darkMode
                    ? "border-gray-700 hover:bg-gray-800"
                    : "border-gray-300 hover:bg-gray-100"
                  } transition`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border ${currentPage === totalPages
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-200 dark:hover:bg-gray-800"
              } transition`}
          >
            Next <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}

      {/* 🖼️ Image Modal */}
      {imageModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 !mt-0"
          onClick={() => setImageModal(null)}
        >
          <img
            src={imageModal}
            alt="Zoomed"
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
