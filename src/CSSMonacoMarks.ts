import monaco, { editor } from 'monaco-editor';
import cssValidator from 'w3c-css-validator';
import { ValidateTextResultWithoutWarnings } from 'w3c-css-validator/dist/types/result';
import { OptionsWithoutWarnings } from 'w3c-css-validator/dist/types/options';

type Monaco = typeof monaco;

type MarkerSeveritySlug = 'Info' | 'Warning' | 'Error';

export class CSSMonacoMarks {
    protected css: string;
    protected options?: OptionsWithoutWarnings;
    protected model?: editor.ITextModel;
    protected linterResponse?: ValidateTextResultWithoutWarnings;

    constructor(css: string, options?: OptionsWithoutWarnings, model?: editor.ITextModel) {
        this.css = css;
        this.options = options;
        this.model = model;
    }

    public async requestLint(): Promise<ValidateTextResultWithoutWarnings> {
        return cssValidator.validateText(this.css).then((result) => {
            console.log(result);
            this.linterResponse = result;
            return this.linterResponse;
        });
    }

    public async getEditorMarks(monaco: Monaco): Promise<editor.IMarkerData[]> {
        return this.requestLint().then((linterResponse) => {
            return linterResponse.errors.map((issue) => ({
                startLineNumber: issue.line,
                startColumn: 1,
                endLineNumber: issue.line,
                endColumn: this.model !== undefined ? this.model.getLineLength(issue.line) : NaN,
                message: issue.message,
                severity: monaco.MarkerSeverity['Error' as MarkerSeveritySlug],
            }));
        });
    }

    public getLinterResponse(): ValidateTextResultWithoutWarnings | undefined {
        return this.linterResponse;
    }
}
