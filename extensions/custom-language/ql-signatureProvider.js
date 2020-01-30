import {functions} from "./ql-language.gen.js";

export function createSignatureProvider(monaco) {
    const result = {
        signatureHelpTriggerCharacters: ['(', ","],
        provideSignatureHelp: function(model, position, token) {
            const fnName = getFunctionName(model, position);
            if (fnName.length == 0) return;

            console.log(fnName);

            return getSignatureFor(fnName);
        }
    };

    return result;
}

function getSignatureFor(fnName) {
    const obj = functions.get(fnName);
    if (obj == null) return;

    const ret = {
        activeSignature: 0,
        activeParameter: 0,
        signatures: [
            {
                label: obj.description,
                documentation: obj.example,
                parameters: []
            }
        ]
    };

    return {
        value: ret,
        dispose() { }
    };
}

function getFunctionName(model, position) {
    let whitespace = model.findPreviousMatch(" ", position.column);
    if (whitespace == null) {
        whitespace = {
            range: {
                endColumn: 0
            }
        }
    }
//    if (whitespace == null) return "";

    const bracket = model.findNextMatch("(", {column: whitespace.range.endColumn, lineNumber: position.lineNumber});
    if (bracket == null) return "";

    const start = whitespace.range.startColumn;
    const end = bracket.range.startColumn;

    const word = model.getValueInRange({startColumn: start, endColumn: end});
    if (word.indexOf("(") != -1) return "";

    return word.trim();
}