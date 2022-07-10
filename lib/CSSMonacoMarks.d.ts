import monaco, { editor } from 'monaco-editor';
import { ValidateTextResultWithoutWarnings } from 'w3c-css-validator/dist/types/result';
import { OptionsWithoutWarnings } from 'w3c-css-validator/dist/types/options';
declare type Monaco = typeof monaco;
export declare class CSSMonacoMarks {
    protected css: string;
    protected options?: OptionsWithoutWarnings;
    protected model?: editor.ITextModel;
    protected linterResponse?: ValidateTextResultWithoutWarnings;
    constructor(css: string, options?: OptionsWithoutWarnings, model?: editor.ITextModel);
    requestLint(): Promise<ValidateTextResultWithoutWarnings>;
    getEditorMarks(monaco: Monaco): Promise<editor.IMarkerData[]>;
    getLinterResponse(): ValidateTextResultWithoutWarnings | undefined;
}
export {};
