import { useState } from 'react';

import { toast } from 'sonner';


import type { PdfJson } from '../interface/resume.model';
import { useEffect } from "react";
import { PdfService } from '../services/pdf-service';
import { JsonViewer } from '../components/context/json-viewer';
import { ResumeService } from '../services/resume-service';

export default function GenerateResume() {
  const [loading, setLoading] =
    useState(false);

  const [pdfResult, setPdfResult] =
    useState<PdfJson | null>(null);

  const [
    generatedResume,
    setGeneratedResume,
  ] = useState<any>(null);

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setLoading(true);

      const result =
        await PdfService.extract(
          file
        );

      setPdfResult(result);

      toast.success(
        'PDF extracted successfully'
      );
    } catch (error) {
      console.error(error);

      toast.error(
        'Failed to extract PDF'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateResume =
    async () => {
      if (!pdfResult) {
        toast.error(
          'Please upload a PDF first.'
        );
        return;
      }

      try {
        const response =
          await toast.promise(
            ResumeService.generateResume(
              pdfResult
            ),
            {
              loading:
                'Generating portfolio...',

              success:
                'Portfolio generated successfully',

              error:
                'Failed to generate portfolio',
            }
          );

        setGeneratedResume(
          response
        );
      } catch { }
    };
  useEffect(() => {
    console.log("Init called");
  }, []);
  return (
    <div
      className="
        min-h-screen
        bg-gray-50

        px-6 py-20

        dark:bg-gray-950
      "
    >
      <div
        className="
          mx-auto max-w-5xl
        "
      >
        {/* Header */}
        <div
          className="
            mb-10

            flex flex-col gap-4

            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <h1
              className="
                text-3xl font-bold
                text-slate-900

                dark:text-white
              "
            >
              Resume Generator
            </h1>

            <p
              className="
                mt-2 text-sm

                text-slate-500

                dark:text-slate-400
              "
            >
              Upload a resume and
              generate a portfolio JSON.
            </p>
          </div>

          <button
            disabled={!pdfResult}
            onClick={
              handleGenerateResume
            }
            className="
              rounded-2xl

              bg-gradient-to-r
              from-violet-600
              to-cyan-500

              px-6 py-3

              font-semibold
              text-white

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Generate Portfolio
          </button>
        </div>

        {/* Upload */}
        <label
          className="
            group flex cursor-pointer
            flex-col items-center
            justify-center

            rounded-3xl
            border-2 border-dashed

            border-violet-300
            bg-white

            px-6 py-16

            transition-all duration-300

            hover:border-violet-500
            hover:shadow-xl

            dark:border-violet-500/30
            dark:bg-gray-900
          "
        >
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleUpload}
          />

          <div
            className="
              rounded-2xl
              bg-violet-100
              p-5

              dark:bg-violet-500/10
            "
          >
            📄
          </div>

          <div
            className="
              mt-5 text-lg
              font-semibold

              text-slate-900

              dark:text-white
            "
          >
            Upload PDF
          </div>

          <div
            className="
              mt-2 text-sm

              text-slate-500

              dark:text-slate-400
            "
          >
            Click to browse PDF file
          </div>
        </label>

        {/* Loading */}
        {loading && (
          <div
            className="
              mt-4
              text-sm

              text-slate-500
            "
          >
            Extracting PDF...
          </div>
        )}

        {/* File Info */}
        {pdfResult && (
          <div
            className="
              mt-6

              rounded-2xl

              border border-violet-200
              bg-violet-50

              p-4

              text-sm

              dark:border-violet-500/20
              dark:bg-violet-500/10
            "
          >
            <div>
              <strong>File:</strong>{' '}
              {pdfResult.file_name}
            </div>

            <div>
              <strong>Pages:</strong>{' '}
              {pdfResult.total_pages}
            </div>
          </div>
        )}

        {pdfResult && (
          <JsonViewer
            title="Extracted PDF JSON"
            data={pdfResult}
          />
        )}

        {generatedResume && (
          <JsonViewer
            title="Generated Portfolio JSON"
            data={generatedResume}
          />
        )}
      </div>
    </div>
  );
}