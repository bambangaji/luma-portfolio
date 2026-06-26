interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({
  onClick,
}: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg"
    >
      +
    </button>
  );
}