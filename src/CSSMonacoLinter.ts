import monaco, { editor } from 'monaco-editor';
import { OptionsWithoutWarnings } from 'w3c-css-validator/dist/types/options';
import { CSSMonacoMarks } from './CSSMonacoMarks';

type Monaco = typeof monaco;

export class CSSMonacoLinter {
    protected editor: editor.IStandaloneCodeEditor;
    protected monaco: Monaco;
    protected options?: OptionsWithoutWarnings;

    constructor(editor: editor.IStandaloneCodeEditor, monaco: Monaco, options?: OptionsWithoutWarnings) {
        this.editor = editor;
        this.monaco = monaco;
        this.options = options;
    }

    public lint() {
        const code = this.editor.getValue();
        if (code === '') return;
        const languageID = this.editor.getModel()?.getLanguageId();
        if (languageID === 'css') {
            const model = this.editor.getModel();
            if (model === null) {
                throw new Error("Your model still doesn't exist.");
            }
            const monacoLinter = new CSSMonacoMarks(code, this.options, model);
            monacoLinter.getEditorMarks(this.monaco).then((issues) => {
                this.monaco.editor.setModelMarkers(model, 'owner', issues);
            });
        }
    }

    public watch() {
        this.lint();
        this.editor.onDidChangeModelContent((e) => {
            this.lint();
        });
    }
}
