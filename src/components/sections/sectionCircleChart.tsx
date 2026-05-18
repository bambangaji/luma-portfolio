import { useState } from "react";
import CircleChart from "../charts/circleChart";

// 1️⃣ Define a type for valid chart keys
type ChartType = "tech" | "users" | "revenue";

export default function SectionCircleChart() {
    const [selectedOption, setSelectedOption] = useState<ChartType>("tech");

    // 2️⃣ Define data type for chartData object
    const chartData: Record<ChartType, { name: string; value: number }[]> = {
        tech: [
            { name: "Frontend", value: 45 },
            { name: "Backend", value: 25 },
            { name: "Mobile", value: 15 },
            { name: "DevOps", value: 15 },
        ],
        users: [
            { name: "Free", value: 60 },
            { name: "Pro", value: 25 },
            { name: "Enterprise", value: 15 },
        ],
        revenue: [
            { name: "Subscriptions", value: 50 },
            { name: "Licensing", value: 30 },
            { name: "Consulting", value: 20 },
        ],
    };

    const chartOptions: { value: ChartType; label: string }[] = [
        { value: "tech", label: "Tech Focus" },
        { value: "users", label: "User Distribution" },
        { value: "revenue", label: "Revenue Breakdown" },
    ];

    const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"];

    return (
        <section className="bg-white py-0 flex flex-col justify-center sm:flex-row">
            <div className="flex flex-col  gap-6  p-8 sm:p-2">
                <h2 className="text-3xl font-bold text-gray-800">Data Overview</h2>
                <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value as ChartType)}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {chartOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            <CircleChart
                data={chartData[selectedOption]}
                colors={COLORS}
                title={chartOptions.find((o) => o.value === selectedOption)?.label}
                bgColor="bg-white"
            />
        </section>
    );
}
