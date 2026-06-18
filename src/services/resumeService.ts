import { toast } from 'sonner';
import templateJson from '../data/templateJsonResume.json';
import templateClassificationJson from '../data/templateJsonClassification.json';
import type { PdfJson } from '../interface/resume.model';

export class ResumeService {
    private static readonly URL =
        'http://localhost:5678/webhook/generate-resume';
    private static readonly URL_CLASSIFICATION =
        'http://localhost:5678/webhook/classification-resume';

    private static readonly MAX_RETRY = 3;

    static async generateResume(
        resumeText: PdfJson
    ) {
        const toastId = toast.loading(
            'Generating resume...'
        );

        let lastError: Error | null = null;

        try {
            for (
                let attempt = 1;
                attempt <= this.MAX_RETRY;
                attempt++
            ) {
                try {
                    const response = await fetch(
                        this.URL,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type':
                                    'application/json',
                            },
                            body: JSON.stringify({
                                resume_text: JSON.stringify(
                                    resumeText.sections
                                ),
                                template_json:
                                    templateJson,
                            }),
                        }
                    );

                    if (!response.ok) {
                        throw new Error(
                            `Request failed (${response.status})`
                        );
                    }

                    const result =
                        await response.json();

                    // Retry if backend says failed
                    if (
                        result?.success ===
                        false
                    ) {
                        throw new Error(
                            result.message ||
                            result.error ||
                            'Generation failed'
                        );
                    }

                    toast.success(
                        `Resume generated successfully`,
                        {
                            id: toastId,
                        }
                    );

                    return this.classificationResume(result.json);
                } catch (error) {
                    lastError =
                        error instanceof Error
                            ? error
                            : new Error(
                                'Unknown error'
                            );

                    console.warn(
                        `Attempt ${attempt}/${this.MAX_RETRY} failed`,
                        lastError
                    );

                    // Stop retrying if last attempt
                    if (
                        attempt ===
                        this.MAX_RETRY
                    ) {
                        break;
                    }

                    toast.loading(
                        `Retrying (${attempt}/${this.MAX_RETRY})...`,
                        {
                            id: toastId,
                        }
                    );

                    // Small delay before retry
                    await new Promise(
                        resolve =>
                            setTimeout(
                                resolve,
                                1000
                            )
                    );
                }
            }

            throw (
                lastError ??
                new Error(
                    'Failed to generate resume'
                )
            );
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Unable to connect to Resume Service';

            toast.error(message, {
                id: toastId,
            });

            throw error;
        }


    }
    static async classificationResume(
        resumeText: string,
    ) {
        console.log("Classification called",resumeText);
        const toastId = toast.loading(
            'Generating resume...'
        );

        let lastError: Error | null = null;

        try {
            for (
                let attempt = 1;
                attempt <= this.MAX_RETRY;
                attempt++
            ) {
                try {
                    const response = await fetch(
                        this.URL_CLASSIFICATION,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type':
                                    'application/json',
                            },
                            body: JSON.stringify({
                                resume_text: resumeText,
                                template_json:
                                    templateClassificationJson,
                            }),
                        }
                    );

                    if (!response.ok) {
                        throw new Error(
                            `Request failed (${response.status})`
                        );
                    }

                    const result =
                        await response.json();

                    // Retry if backend says failed
                    if (
                        result?.success ===
                        false
                    ) {
                        throw new Error(
                            result.message ||
                            result.error ||
                            'Generation failed'
                        );
                    }

                    toast.success(
                        `Resume generated successfully`,
                        {
                            id: toastId,
                        }
                    );

                    return result;
                } catch (error) {
                    lastError =
                        error instanceof Error
                            ? error
                            : new Error(
                                'Unknown error'
                            );

                    console.warn(
                        `Attempt ${attempt}/${this.MAX_RETRY} failed`,
                        lastError
                    );

                    // Stop retrying if last attempt
                    if (
                        attempt ===
                        this.MAX_RETRY
                    ) {
                        break;
                    }

                    toast.loading(
                        `Retrying (${attempt}/${this.MAX_RETRY})...`,
                        {
                            id: toastId,
                        }
                    );

                    // Small delay before retry
                    await new Promise(
                        resolve =>
                            setTimeout(
                                resolve,
                                1000
                            )
                    );
                }
            }

            throw (
                lastError ??
                new Error(
                    'Failed to generate resume'
                )
            );
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Unable to connect to Resume Service';

            toast.error(message, {
                id: toastId,
            });

            throw error;
        }


    }
}
