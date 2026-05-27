import { useState } from "react";
import { SectionChartMain } from "../components/sections/sectionChartMain";
import { SectionCircleChart } from "../components/sections/sectionCircleChart";
import { SectionHeader } from "../components/sections/sectionHeader"; // <-- adjust path as needed
import { ChevronDown } from "lucide-react";


export default function HomePage() {
    const listSection = [
        { title: "Header Section", component: <SectionHeader />, color: "bg-blue-100", },
        { title: "Main Chart", component: <SectionChartMain />, color: "bg-gray-100", },
        { title: "Circle Chart", component: <SectionCircleChart />, color: "bg-green-100", },
    ]

    const [visibleSections, setVisibleSections] = useState<boolean[]>(
        listSection.map(() => true)
    )

    const toggleSection = (index: number) => {
        setVisibleSections((prev) =>
            prev.map((v, i) => (i === index ? !v : v))
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            {listSection.map((section, index) => {
                const isVisible = visibleSections[index]

                return (
                    <div
                        key={index}
                        className={` shadow-sm bg-white/60 overflow-hidden transition-all duration-500  ${section.color}`}
                    >
                        {/* Header (only visible when collapsed) */}
                        {!isVisible && (
                            <div
                                onClick={() => toggleSection(index)}
                                className="cursor-pointer select-none hover:bg-gray-50 transition"
                            >
                                <div className="max-w-[1600px] mx-auto flex items-center justify-between px-8 py-4">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {section.title}
                                    </h2>
                                    <button
                                        className="flex items-center justify-center border border-gray-400 rounded-full p-2 hover:border-blue-500 hover:text-blue-500 transition-all"
                                    >
                                        <ChevronDown className="w-5 h-5 rotate-0" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Content (only visible when expanded) */}
                        {isVisible && (
                            <div className="relative">


                                {/* Collapse button inside same width */}
                                <div className="max-w-[1600px] mx-auto flex justify-end px-8 pt-4">
                                    <button
                                        onClick={() => toggleSection(index)}
                                        className="flex items-center justify-center border border-gray-400 rounded-full p-2 hover:border-red-500 hover:text-red-500 transition-all bg-white/80 shadow-sm"
                                    >
                                        <ChevronDown className="w-5 h-5 rotate-180 transition-transform duration-300" />
                                    </button>
                                </div>
                                <div className="max-w-[1600px] mx-auto px-8 pt-2 pb-12 transition-all duration-500">
                                    {section.component}
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}