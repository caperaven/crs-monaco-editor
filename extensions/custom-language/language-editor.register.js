import {language, languageName, themeName} from "./ql-language.js";

globalThis.registerLanguage = (monaco) => {
    monaco.languages.register({ id: languageName });
    monaco.languages.setMonarchTokensProvider(languageName, language);

    monaco.editor.defineTheme(themeName, {
        base: 'vs',
        inherit: true,
        rules: [
        ]
    });
};

