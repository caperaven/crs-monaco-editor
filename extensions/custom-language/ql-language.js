export const languageName = "mySpecialLanguage";
export const themeName = "myCoolTheme";

export const language = {
    defaultToken: '',
    tokenPostfix: '.okql',

    // language keywords
    keywords: [
        'abstract', 'as', 'break', 'case', 'catch', 'class', 'continue', 'const',
        'constructor', 'debugger', 'declare', 'default', 'delete', 'do', 'else',
        'enum', 'export', 'extends', 'false', 'finally', 'for', 'from', 'function',
        'get', 'if', 'implements', 'import', 'in', 'infer', 'instanceof', 'interface',
        'is', 'keyof', 'let', 'module', 'namespace', 'never', 'new', 'null', 'package',
        'private', 'protected', 'public', 'readonly', 'require', 'global', 'return',
        'set', 'static', 'super', 'switch', 'symbol', 'this', 'throw', 'true', 'try',
        'type', 'typeof', 'unique', 'var', 'void', 'while', 'with', 'yield', 'async',
        'await', 'of'
    ],

    // functions
    functions: [
        'pow', 'toLower', 'toUpper'
    ],

    // operators
    operators: [
        '+', '-', '*', '/', '<', ">", "<>", "="
    ],

    digits: /\d+(_+\d+)*/,

    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    tokenizer: {
        root: [
            [/[{}]/, 'delimiter.bracket'],
            {include: 'common'},
            {include: 'whitespace'}
        ],

        common: [
            // identifiers and keywords
            [/[a-z_$][\w$]*/, {
                cases: {
                    '@functions': 'function',
                    '@keywords': 'keyword',
                    '@default': 'identifier'
                }
            }],

            // numbers
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/0[xX][0-9a-fA-F]+/, 'number.hex'],
            [/\d+/, 'number'],

            // delimiter: after number because of .\d floats
            [/[;,.]/, 'delimiter'],

            // strings
            [/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
            [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],

            // characters
            [/'[^\\']'/, 'string'],
            [/(')(@escapes)(')/, ['string','string.escape','string']],
            [/'/, 'string.invalid']
        ],

        comment: [
            [/[^\/*]+/, 'comment' ],
            [/\/\*/,    'comment', '@push' ],    // nested comment
            ["\\*/",    'comment', '@pop'  ],
            [/[\/*]/,   'comment' ]
        ],

        string: [
            [/[^\\"]+/,  'string'],
            [/@escapes/, 'string.escape'],
            [/\\./,      'string.escape.invalid'],
            [/"/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ]
        ],

        whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/\/\*/,       'comment', '@comment' ],
            [/\/\/.*$/,    'comment'],
        ],
    }

};