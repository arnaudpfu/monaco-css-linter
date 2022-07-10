import monaco, { editor } from 'monaco-editor';
import { OptionsWithoutWarnings } from 'w3c-css-validator/dist/types/options';
declare type Monaco = typeof monaco;
export declare class CSSMonacoLinter {
    protected editor: editor.IStandaloneCodeEditor;
    protected monaco: Monaco;
    protected options?: OptionsWithoutWarnings;
    constructor(editor: editor.IStandaloneCodeEditor, monaco: Monaco, options?: OptionsWithoutWarnings);
    lint(): void;
    watch(): void;
}
export {};
