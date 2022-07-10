# Monaco CSS Linter

Monaco CSS Linter is a simple CSS Linter plugin for the [Monaco Editor](https://microsoft.github.io/monaco-editor/). It uses the [W3C CSS Validator](https://sparksuite.github.io/w3c-css-validator/) under the hood to verify CSS Code.

## Installation

```
npm i monaco-css-linter
```

## Usage

```ts
import monaco, { editor } from 'monaco-editor';
import CSSMonacoLinter from 'monaco-css-linter';

// The Monaco Editor can be easily created, given an
// empty container and an options literal.
// Two members of the literal are "value" and "language".
// The editor takes the full size of its container.

const editor = monaco.editor.create(document.getElementById('container'), {
    value: 'css code here ...',
    language: 'css',
});

const linter = new CSSMonacoLinter(editor, monaco);
linter.watch();
```

You can get the linter response in this way :

```ts
import { CSSMonacoMarks } from 'monaco-css-linter';

//...

const cssCode = editor.getValue();
const report = new CSSMonacoMarks(cssCode);
const response = report.getLinterResponse();
```

## API

### Class: `CSSMonacoLinter(editor: editor.IStandaloneCodeEditor, monaco: Monaco, options?: OptionsWithoutWarnings)`

#### Attributes

-   `editor: editor.IStandaloneCodeEditor` The object returned when you create an editor.
-   `monaco: typeof monaco` The monaco variable.
-   `options?: OptionsWithoutWarnings` w3c validator [options](https://sparksuite.github.io/w3c-css-validator/docs/functions/validate-text).

#### Methods

-   `lint` () => void: Lint one time the `editor`.
-   `watch` () => void: Lint the `editor` each time the `onChange` event is triggered.

### Class: `CSSMonacoMarks(css: string, options?: OptionsWithoutWarnings, model?: editor.ITextModel)`

#### Attributes

-   `css: string` The codoe to verify.
-   `options?: OptionsWithoutWarnings` w3c validator [options](https://sparksuite.github.io/w3c-css-validator/docs/functions/validate-text).
-   `model?: editor.ITextModel` the model of the `editor`.
-   `linterResponse?: ValidateTextResultWithoutWarnings` Value returned by the W3C CSS Validator.

#### Methods

-   `async getEditorMarks(monaco: Monaco): Promise<editor.IMarkerData[]>` Return the monaco markers.
-   `getLinterResponse(): ValidateTextResultWithoutWarnings | undefined`
-   `async requestLint(): Promise<ValidateTextResultWithoutWarnings>` Start the CSS linter asynchronously.

## License

MIT, see the [LICENSE](./LICENSE) file for detail.
