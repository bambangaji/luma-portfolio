import {
  Eye,
  Rocket,
  Save,
  Sparkles,
} from 'lucide-react';

import Swal from 'sweetalert2';

export const ButtonMenuPortfolio = () => {
  const simulateApi = async (
    title: string,
    success: string
  ) => {
    Swal.fire({
      title,
      html: `
        <div class="py-4">
          <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
          <p class="mt-4 text-sm text-slate-500">
            Please wait...
          </p>
        </div>
      `,
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    await new Promise(resolve =>
      setTimeout(resolve, 2500)
    );

    Swal.fire({
      icon: 'success',
      title: success,
      timer: 1800,
      showConfirmButton: false,
    });
  };

  const handleAnalyze =
    async () => {
      // TODO: await PortfolioApiService.analyze(...)
      await simulateApi(
        'Analyzing Resume...',
        'Resume analyzed successfully.'
      );
    };

  const handlePreview =
    () => {
      window.open(
        '/preview',
        '_blank'
      );
    };

  const handleSaveATS =
    async () => {
      // TODO: await PortfolioApiService.saveATS(...)
      await simulateApi(
        'Saving ATS Resume...',
        'ATS Resume saved successfully.'
      );
    };

  const handleDeploy =
    async () => {
      // TODO: await PortfolioApiService.deploy(...)
      await simulateApi(
        'Deploying Portfolio...',
        'Portfolio deployed successfully.'
      );
    };

  return (
    <div
      className="
        mb-8

        rounded-2xl
        border

        border-gray-200

        bg-white/80

        p-5

        backdrop-blur-xl

        dark:border-gray-800
        dark:bg-gray-900/80
      "
    >
      <div className="gap-5">
        <div>
          <h1
            className="
              text-2xl
              font-bold

              text-slate-900
              dark:text-white
            "
          >
            Portfolio Builder
          </h1>

          <p
            className="
              mt-1

              text-sm

              text-slate-500
              dark:text-slate-400
            "
          >
            Customize your portfolio, preview changes, and publish when you're ready.
          </p>
        </div>

        <div
          className="
            mt-4

            flex
            flex-wrap
            gap-3
          "
        >
          <button
            onClick={
              handleAnalyze
            }
            className="
              flex
              items-center
              gap-2

              rounded-xl

              border

              border-violet-300

              px-4
              py-3

              font-medium

              text-violet-600

              transition-all

              hover:bg-violet-50

              dark:border-violet-500/40
              dark:hover:bg-violet-500/10
            "
          >
            <Sparkles size={18} />
            Analyze Resume
          </button>

          <button
            onClick={
              handlePreview
            }
            className="
              flex
              items-center
              gap-2

              rounded-xl

              border

              border-gray-300

              px-4
              py-3

              font-medium

              text-slate-700

              transition-all

              hover:bg-gray-100

              dark:border-gray-700
              dark:text-white
              dark:hover:bg-gray-800
            "
          >
            <Eye size={18} />
            Preview
          </button>

          <button
            onClick={
              handleSaveATS
            }
            className="
              flex
              items-center
              gap-2

              rounded-xl

              border

              border-emerald-300

              px-4
              py-3

              font-medium

              text-emerald-600

              transition-all

              hover:bg-emerald-50

              dark:border-emerald-500/40
              dark:hover:bg-emerald-500/10
            "
          >
            <Save size={18} />
            Save ATS
          </button>

          <button
            onClick={
              handleDeploy
            }
            className="
              flex
              items-center
              gap-2

              rounded-xl

              bg-gradient-to-r

              from-violet-600
              to-cyan-500

              px-5
              py-3

              font-semibold

              text-white

              shadow-lg

              transition-all

              hover:scale-[1.02]
            "
          >
            <Rocket size={18} />
            Deploy
          </button>
        </div>
      </div>
    </div>
  );
};