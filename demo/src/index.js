import CSSMonacoLinter from '../../lib/index.js';

window.addEventListener('editor-mounted', (e) => {
    const monaco = e.detail;
    const cssEditor = monaco.editor.create(document.getElementById('editor'), {
        value: `body{
    background-color: red;
    color: 45;
}

.my-class{
    SALUT:'RED' 
}
    `,
        language: 'css',
        theme: 'vs-dark',
    });

    const copy = { ...cssEditor };
    copy.getModel = cssEditor.getModel;
    copy.getValue = cssEditor.getValue;
    console.log(copy.getModel());

    console.log('salut les gens');
    console.log(cssEditor);
    console.log(cssEditor.getValue());
    console.log(cssEditor.getModel());
    const linter = new CSSMonacoLinter(copy, monaco);
    console.log(linter);
    linter.watch();
});
