import {
  createContext,
  useContext,
  useState,
} from 'react';

type ErrorContextType = {
  showError: (
    message: string
  ) => void;
};

const ErrorContext =
  createContext<ErrorContextType | null>(
    null
  );

export const ErrorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] =
    useState<string | null>(null);

  const showError = (
    message: string
  ) => {
    setMessage(message);
  };

  return (
    <ErrorContext.Provider
      value={{ showError }}
    >
      {children}

      {message && (
        <div
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            bg-black/40
          "
        >
          <div
            className="
              w-full max-w-md
              rounded-2xl
              bg-white
              p-6
              shadow-2xl
            "
          >
            <h3
              className="
                mb-2 text-lg font-bold
                text-red-500
              "
            >
              Error
            </h3>

            <p>{message}</p>

            <button
              onClick={() =>
                setMessage(null)
              }
              className="
                mt-5 rounded-xl
                bg-red-500
                px-4 py-2
                text-white
              "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context =
    useContext(ErrorContext);

  if (!context) {
    throw new Error(
      'useError must be used inside ErrorProvider'
    );
  }

  return context;
};