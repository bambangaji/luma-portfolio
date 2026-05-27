import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export const SectionChartMain = () => {
  const data = [
    { name: "Jan", users: 4000 },
    { name: "Feb", users: 3000 },
    { name: "Mar", users: 5000 },
    { name: "Apr", users: 7000 },
    { name: "May", users: 10000 },
    { name: "Jun", users: 12000 },
  ];

  return (
    <section className="bg-white py-0 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">User Growth</h2>

      <div className="w-full max-w-4xl h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#2563eb" // Tailwind blue-600
              strokeWidth={3}
              dot={{ r: 6, stroke: "#2563eb", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
