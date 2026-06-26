import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerFieldProps {
    label: string;

    value?: string | null;

    disabled?: boolean;

    onChange: (
        value: string | null
    ) => void;
}

export const DatePickerField = ({
    label,
    value,
    disabled = false,
    onChange,
}: DatePickerFieldProps) => {
    const parseDate = (
        date?: string | null
    ) => {
        if (!date) {
            return null;
        }

        const parsed =
            new Date(date);

        return Number.isNaN(
            parsed.getTime()
        )
            ? null
            : parsed;
    };

    const formatDate = (
        date: Date
    ) => {
        const year =
            date.getFullYear();

        const month = String(
            date.getMonth() + 1
        ).padStart(2, '0');

        return `${year}-${month}-01`;
    };

    return (
        <div className="space-y-2">
            <label
                className="
          text-sm
          font-medium

          text-slate-500
          dark:text-white
        "
            >
                {label}
            </label>

            <div
                className="
          rounded-xl

          border

          border-gray-300
          dark:border-gray-700

          bg-white
          dark:bg-gray-900

          transition-all

          hover:border-violet-400
          hover:shadow-md

          focus-within:border-violet-500
          focus-within:ring-2
          focus-within:ring-violet-500/20
        "
            >
                <DatePicker
                    selected={parseDate(
                        value
                    )}
                    disabled={disabled}
                    showMonthYearPicker
                    dateFormat="MMM yyyy"
                    wrapperClassName="block w-full"
                    popperPlacement="bottom-start"

                    onChange={(
                        date: Date | null
                    ) => {
                        if (!date) {
                            onChange(null);
                            return;
                        }

                        onChange(
                            formatDate(date)
                        );
                    }}


                    className="
            w-full

            cursor-pointer

            bg-transparent

            px-4
            py-3

            outline-none

            text-slate-900
            dark:text-white
          "
                />
            </div>
        </div>
    );
};