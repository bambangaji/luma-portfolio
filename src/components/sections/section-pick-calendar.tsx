import CalendarPicker from "../charts/calendar-picker";

export const SectionPickCalendar = () => {
    return (
        <section className="bg-white py-16 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">User Growth</h2>
            <div className="w-full max-w-4xl h-96">
                <CalendarPicker />
            </div>
        </section>
    );
}
