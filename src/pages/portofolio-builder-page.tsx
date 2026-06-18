export const PortfolioBuilderPage = () => {
  return (
    <div
      className="
        h-screen
        overflow-hidden

        grid
        grid-cols-[320px_1fr]
      "
    >
      <CmsSidebar />

      <PortfolioPreview />
    </div>
  );
};