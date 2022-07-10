"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSSMonacoLinter = void 0;
const CSSMonacoMarks_1 = require("./CSSMonacoMarks");
class CSSMonacoLinter {
    constructor(editor, monaco, options) {
        this.editor = editor;
        this.monaco = monaco;
        this.options = options;
    }
    lint() {
        var _a;
        const code = this.editor.getValue();
        const languageID = (_a = this.editor.getModel()) === null || _a === void 0 ? void 0 : _a.getLanguageId();
        if (languageID === 'css') {
            const model = this.editor.getModel();
            if (model === null) {
                throw new Error("Your model still does't exist.");
            }
            const monacoLinter = new CSSMonacoMarks_1.CSSMonacoMarks(code, this.options, model);
            monacoLinter.getEditorMarks(this.monaco).then((issues) => {
                this.monaco.editor.setModelMarkers(model, 'owner', issues);
            });
        }
    }
    watch() {
        this.lint();
        this.editor.onDidChangeModelContent((e) => {
            this.lint();
        });
    }
}
exports.CSSMonacoLinter = CSSMonacoLinter;
