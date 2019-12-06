import {language, richLanguageConfiguration, languageName, themeName} from "./ql-language.js";
import {createCompletionItemProvider} from "./ql-completion.js";

globalThis.registerLanguage = (monaco) => {
    const completionProvider = createCompletionItemProvider(monaco);

    monaco.languages.register({ id: languageName });
    monaco.languages.setMonarchTokensProvider(languageName, language);
    monaco.languages.setLanguageConfiguration(languageName, richLanguageConfiguration);
    monaco.languages.registerCompletionItemProvider(languageName, completionProvider);

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

