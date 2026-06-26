import { usePortfolioStore } from '../../store/portfolio.store';

export const ProfileEditor =
  () => {
    const portfolio =
      usePortfolioStore(
        state =>
          state.portfolio
      );

    if (!portfolio)
      return null;

    return (
      <div>
        <h3
          className="
            mb-6
            text-xl
            font-bold
          "
        >
          Hero Section
        </h3>

        <div className="space-y-4">
          <input
            value={
              portfolio.hero
                .badge
            }
            className="
              w-full
              rounded-lg
              border
              p-3
            "
          />

          <input
            value={
              portfolio.hero
                .headline
            }
            className="
              w-full
              rounded-lg
              border
              p-3
            "
          />

          <textarea
            rows={8}
            value={
              portfolio.hero
                .description
            }
            className="
              w-full
              rounded-lg
              border
              p-3
            "
          />
        </div>
      </div>
    );
  };