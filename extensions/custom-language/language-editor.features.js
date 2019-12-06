import {language, languageName, themeName} from "./ql-language.js";

globalThis.registerLanguage = (monaco) => {
    monaco.languages.register({ id: languageName });
    monaco.languages.setMonarchTokensProvider(languageName, language);

    monaco.editor.defineTheme(themeName, {
        base: 'vs',
        inherit: true,
        rules: [
            { token: 'keyword', foreground: '1a9db0', fontStyle: 'bold' },
            { token: 'function', foreground: 'FF69B4', fontStyle: 'bold' },
            { token: 'number', foreground: 'c900c1'},
            { token: 'number.float', foreground: 'c900c1'},
            { token: 'number.hex', foreground: 'c900c1'},
        ]
    });
};

