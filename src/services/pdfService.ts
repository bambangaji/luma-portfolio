import * as pdfjsLib from 'pdfjs-dist';

import pdfWorker from
    'pdfjs-dist/build/pdf.worker.min.mjs?url';
import type { PdfJson, ResumeSection } from '../interface/resume.model';

pdfjsLib.GlobalWorkerOptions.workerSrc =
    pdfWorker;

export class PdfService {
    static async extract(
        file: File
    ): Promise<PdfJson> {
        const arrayBuffer =
            await file.arrayBuffer();

        const pdf =
            await pdfjsLib.getDocument({
                data: arrayBuffer,
            }).promise;

        let rawText = '';

        for (
            let pageNumber = 1;
            pageNumber <= pdf.numPages;
            pageNumber++
        ) {
            const page =
                await pdf.getPage(pageNumber);

            const content =
                await page.getTextContent();

            const pageText =
                content.items
                    .map((item: any) =>
                        'str' in item
                            ? item.str
                            : ''
                    )
                    .join('\n');

            rawText +=
                pageText + '\n';
        }

        const sections =
            this.extractSections(
                rawText
            );

        return {
            file_name: file.name,
            total_pages:
                pdf.numPages,
            sections,
        };
    }

    private static extractSections(
        text: string
    ): ResumeSection[] {
        const lines = text
            .split('\n')
            .map(line =>
                line.trim()
            )
            .filter(Boolean);

        const sections: ResumeSection[] =
            [];

        let currentSection:
            | ResumeSection
            | null = null;

        for (const line of lines) {
            const isHeading =
                this.isHeading(line);

            if (isHeading) {
                currentSection = {
                    title: line,
                    content: [],
                };

                sections.push(
                    currentSection
                );

                continue;
            }

            if (!currentSection) {
                currentSection = {
                    title: 'ABOUT',
                    content: [],
                };

                sections.push(
                    currentSection
                );
            }

            currentSection.content.push(
                line
            );
        }

        return sections;
    }

    private static isHeading(
        line: string
    ): boolean {
        if (
            line.length > 50
        ) {
            return false;
        }

        if (
            /^[A-Z\s&]+$/.test(
                line
            )
        ) {
            return true;
        }

        const commonTitles = [
            'education',
            'experience',
            'work experience',
            'professional experience',
            'employment history',
            'projects',
            'skills',
            'technical skills',
            'certifications',
            'languages',
            'summary',
            'profile',
            'about',
            'contact',
        ];

        return commonTitles.includes(
            line.toLowerCase()
        );
    }
}