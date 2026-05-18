import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBox, faMapMarkerAlt, faSearch, faStore } from "@fortawesome/free-solid-svg-icons"

type SortOption = "relevance" | "newest" | "oldest" | "popular"
type FilterType = "item" | "place" | "vendor"

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Relevance", value: "relevance" },
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Most Popular", value: "popular" },
]

const FILTER_TABS = [
  { label: "Item", icon: faBox, type: "item" as FilterType },
  { label: "Place", icon: faMapMarkerAlt, type: "place" as FilterType },
  { label: "Vendor", icon: faStore, type: "vendor" as FilterType },
]

interface FilterSidebarProps {
  onFilterChange?: (filter: { type: FilterType; sort: SortOption }) => void
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [selectedOption, setSelectedOption] = useState<SortOption>("relevance")
  const [activeFilter, setActiveFilter] = useState<FilterType>("item")

  const handleFilterClick = (type: FilterType) => {
    setActiveFilter(type)
    onFilterChange?.({ type, sort: selectedOption })
  }

  const handleReset = () => {
    setActiveFilter("item")
    setSelectedOption("relevance")
    onFilterChange?.({ type: "item", sort: "relevance" })
  }

  const handleSearch = () => {
    onFilterChange?.({ type: activeFilter, sort: selectedOption })
  }

  return (
    <aside
      className="w-full md:w-1/4 h-[calc(50vh-6rem)] 
      bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
      rounded-2xl shadow-sm p-6 flex flex-col justify-between transition-colors duration-300"
    >
      {/* Filters */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-1">
        <h2 className="text-gray-900 dark:text-gray-100 text-lg font-semibold">Filters</h2>

        {/* Tabs */}
        <div>
          <p className="text-gray-800 dark:text-gray-200 mb-3 font-medium">Type</p>
          <ul className="flex flex-wrap -mb-px text-sm font-medium border-b border-gray-200 dark:border-gray-700">
            {FILTER_TABS.map((tab) => (
              <li key={tab.label} className="me-2">
                <button
                  onClick={() => handleFilterClick(tab.type)}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-t-lg border-b-2 transition-all duration-200 ${
                    tab.type === activeFilter
                      ? "text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-950/30"
                      : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <FontAwesomeIcon icon={tab.icon} className="w-4 h-4" />
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Search */}
        <div className="space-y-2">
          <p className="text-gray-800 dark:text-gray-200 font-medium">Name</p>
          <div className="relative w-full">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 w-5 h-5 z-10"
            />
            <input
              type="text"
              placeholder="Search something..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Selects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-800 dark:text-gray-200 mb-2 font-medium">Province</p>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value as SortOption)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-gray-800 dark:text-gray-200 mb-2 font-medium">State</p>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value as SortOption)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleReset}
          className="flex-1 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          Reset
        </button>
        <button
          onClick={handleSearch}
          className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all"
        >
          Search
        </button>
      </div>
    </aside>
  )
}
