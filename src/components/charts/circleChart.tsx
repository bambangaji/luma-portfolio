import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface ChartData {
  [key: string]: string | number;
  name: string;
  value: number;
}

interface CircleChartProps {
  data: ChartData[];
  colors?: string[];
  title?: string;
  innerRadius?: number;
  outerRadius?: number;
  bgColor?: string;
}

export default function CircleChart({
  data,
  colors = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"],
  title = "Circle Chart",
  innerRadius = 80,
  outerRadius = 120,
  bgColor = "bg-white",
}: CircleChartProps) {
  return (
    <section
      className={`${bgColor} flex flex-col items-center justify-center sm:w-[600px]`}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>

      <div className="w-full max-w-md h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={5}
              dataKey="value"
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <div>
                  <span className="hidden">{entry.name}</span>
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                </div>

              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
