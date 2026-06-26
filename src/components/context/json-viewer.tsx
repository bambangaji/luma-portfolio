type JsonViewerProps = {
  title: string;
  data: unknown;
};

export const JsonViewer = ({
  title,
  data,
}: JsonViewerProps) => {
  return (
    <div
      className="
        mt-8 overflow-hidden
        rounded-3xl

        border border-gray-200
        bg-white

        shadow-xl

        dark:border-gray-800
        dark:bg-gray-900
      "
    >
      <div
        className="
          border-b border-gray-200
          px-6 py-4

          dark:border-gray-800
        "
      >
        <h2
          className="
            text-lg font-semibold
            text-slate-900
            dark:text-white
          "
        >
          {title}
        </h2>
      </div>

      <div className="overflow-auto p-6">
        <pre
          className="
            whitespace-pre-wrap
            text-sm leading-relaxed

            text-slate-700
            dark:text-slate-300
          "
        >
          {JSON.stringify(
            data,
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
};