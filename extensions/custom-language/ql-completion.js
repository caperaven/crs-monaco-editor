import {functions, keywords, operators} from "./ql-language.gen.js";

export function createCompletionItemProvider(monaco) {
    const result = {
        provideCompletionItems: function(model, position) {
            // JHR: Need to add the handling of properties.

            const functions = getFunctions(monaco);
            const keywords = getKeywords(monaco);
            const operators = getOperators(monaco);

            return {
                suggestions: [...functions, ...keywords, ...operators]
            }
        }
    };

    return result;
}

function getFunctions(monaco) {
    const result = [];
    for (let fn of functions) {
        result.push({
            label: fn.fn,
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: fn.description,
            insertText: fn.template,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        })
    }
    return result;
}

function getKeywords(monaco) {
    const result = [];
    for (let key of keywords) {
        result.push({
            label: key,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: key
        })
    }
    return result;
}

function getOperators(monaco) {
    const result = [];
    for (let opr of operators) {
        result.push({
            label: opr,
            kind: monaco.languages.CompletionItemKind.Operator,
            insertText: opr
        })
    }
    return result;
}