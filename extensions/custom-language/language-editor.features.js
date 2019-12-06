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
            { token: 'keyword', foreground: '1F4E8C', fontStyle: 'bold' },
            { token: 'function', foreground: '367350', fontStyle: 'bold' },
            { token: 'operator', foreground: 'A62121'},
            { token: 'number', foreground: 'F2B544', fontStyle: 'bold'},
            { token: 'number.float', foreground: 'F2B544', fontStyle: 'bold'},
            { token: 'number.hex', foreground: 'F2B544', fontStyle: 'bold'},
        ]
    });
};

