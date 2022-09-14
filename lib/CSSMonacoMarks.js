"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSSMonacoMarks = void 0;
const w3c_css_validator_1 = __importDefault(require("w3c-css-validator"));
class CSSMonacoMarks {
    constructor(css, options, model) {
        this.css = css;
        this.options = options;
        this.model = model;
    }
    requestLint() {
        return __awaiter(this, void 0, void 0, function* () {
            return w3c_css_validator_1.default.validateText(this.css, this.options).then((result) => {
                this.linterResponse = result;
                return this.linterResponse;
            });
        });
    }
    getEditorMarks(monaco) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.requestLint().then((linterResponse) => {
                return linterResponse.errors.map((issue) => ({
                    startLineNumber: issue.line,
                    startColumn: 1,
                    endLineNumber: issue.line,
                    endColumn: this.model !== undefined ? this.model.getLineLength(issue.line) : NaN,
                    message: issue.message,
                    severity: monaco.MarkerSeverity['Error'],
                }));
            });
        });
    }
    getLinterResponse() {
        return this.linterResponse;
    }
}
exports.CSSMonacoMarks = CSSMonacoMarks;
