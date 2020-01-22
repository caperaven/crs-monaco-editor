import {language, richLanguageConfiguration, languageName, themeName} from "./ql-language.js";
import {createCompletionItemProvider} from "./ql-completion.js";
import {createHoverProvider} from "./ql-hover.js";
import {createSignatureProvider} from "./ql-signatureProvider.js"

globalThis.registerLanguage = (monaco) => {
    const completionProvider = createCompletionItemProvider(monaco);
    const hoverProvider = createHoverProvider(monaco);
    const signatureProvider = createSignatureProvider(monaco);

    monaco.languages.register({ id: languageName });
    monaco.languages.setMonarchTokensProvider(languageName, language);
    monaco.languages.setLanguageConfiguration(languageName, richLanguageConfiguration);
    monaco.languages.registerCompletionItemProvider(languageName, completionProvider);
    monaco.languages.registerHoverProvider(languageName, hoverProvider);
    monaco.languages.registerSignatureHelpProvider(languageName, signatureProvider);

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

