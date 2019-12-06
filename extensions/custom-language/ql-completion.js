// import {functions} from "./ql-language.gen.js";

export function createCompletionItemProvider(monaco) {
    const result = {
        provideCompletionItems: function(model, position) {
            const fnSuggestions = [
                {
                    label: "pow",
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: "power function",
                    insertText: "pow(${1:base}, ${2:explonent})",
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                }
            ];

            return {
                suggestions: [...fnSuggestions]
            }
        }
    };

    return result;
}