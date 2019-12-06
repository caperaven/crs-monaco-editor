/**
 *  This is the language definition describing the language parts and assigning keys to features so that you can use it in things like styles.
 */

import {keywords, operators, functions} from "./ql-language.gen.js";

export const languageName = "mySpecialLanguage";
export const themeName = "myCoolTheme";

/**
 * Rich language features
 */
export const richLanguageConfiguration = {
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,

    comments: {
        lineComment: '//',
        blockComment: ['/*', '*/']
    },

    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
    ],

    __electricCharacterSupport: {
        docComment: { open: '/**', close: ' */' }
    },

    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"', notIn: ['string'] },
        { open: '\'', close: '\'', notIn: ['string', 'comment'] },
        { open: '`', close: '`' }
    ]
};

/**
 * Language features defining keywords, functions, operators ...
 */
export const language = {
    defaultToken: '',
    tokenPostfix: '.okql',

    keywords: keywords,
    functions: functions.map(item => item.fn),
    operators: operators,

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