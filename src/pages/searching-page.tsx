import { useState } from "react"
import FilterSidebar from "../components/search/filter-sidebar"
import CardView from "../components/views/card-view"
import ListView from "../components/views/list-view"
import ThumbnailView from "../components/views/thumbnail-view"
import Pagination from "../components/pagination"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTh, faList, faImages } from "@fortawesome/free-solid-svg-icons"
import type { ItemDetail } from "../models/item-detail.model"

type ViewType = "card" | "list" | "thumbnail"

export default function SearchPage() {
    const [viewType, setViewType] = useState<ViewType>("card")
    const items: ItemDetail[] = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        name: `Product #${i + 1}`,
        location: ["Jakarta", "Bandung", "Surabaya", "Medan", "Yogyakarta", "Bali"][i % 6],
        image: `https://picsum.photos/300/200?random=${i + 1}`,
        description: "A short description about this product, showing just enough to catch your eye.",
        price: `Rp ${(2_000_000 + i * 250_000).toLocaleString("id-ID")}`,
        rating: 4 + (i % 2 ? 0.3 : 0.8),
        reviews: 50 + i * 10,
    }));

    return (
        <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-70px)] overflow-hidden py-6">
            <FilterSidebar onFilterChange={(filter) => console.log("Filter applied:", filter)} />

            <section className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4 overflow-y-auto">
                {/* Header Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Showing 1-10 of 100 results</p>

                    <div className="flex items-center gap-2">
                        {[
                            { type: "card", icon: faTh },
                            { type: "list", icon: faList },
                            { type: "thumbnail", icon: faImages },
                        ].map(({ type, icon }) => (
                            <button
                                key={type}
                                onClick={() => setViewType(type as ViewType)}
                                className={`p-2 rounded-md border ${viewType === type
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                            >
                                <FontAwesomeIcon icon={icon} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dynamic View */}
                <div className="h-[calc(100vh-21vh)]">
                    {viewType === "card" && <CardView items={items} />}
                    {viewType === "list" && <ListView items={items} />}
                    {viewType === "thumbnail" && <ThumbnailView items={items} />}
                </div>
                <Pagination />
            </section>
        </div>
    )
}
