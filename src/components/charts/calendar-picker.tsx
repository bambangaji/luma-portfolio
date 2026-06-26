import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function CalendarPicker() {
  const [selected, setSelected] = useState<Date>();

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-3">Pick a date</h2>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        className="border rounded-lg p-3"
      />
      {selected && (
        <p className="mt-3 text-blue-600 font-medium">
          You picked: {selected.toDateString()}
        </p>
      )}
    </div>
  );
}
