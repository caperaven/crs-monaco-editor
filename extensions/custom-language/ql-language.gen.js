/**
 * This file gets generated during compile time from something like antler to be used in your language definition
 */

export const keywords = [
    'in', 'not', 'or', 'and', 'true', 'false', 'null'
];

export const functions = [
    {
        "fn": "pow",
        "description": "math power function",
        "parameters": [
            {
                "param": "base",
                "description": "base parameter",
                "type": "number"
            },
            {
                "param": "exponent",
                "description": "exponent parameter",
                "type": "number"
            }
        ],
        "template": "pow(${1:base}, exponent)"
    },
    {
        "fn": "round",
        "description": "round number function",
        "template": "round(${1:value})"
    },
    {
        "fn": "tolower",
        "description": "convert text to all lowercase",
        "template": "tolower(${1:value})"
    },
    {
        "fn": "touppper",
        "description": "convert text to all uppercase",
        "template": "toupper(${1:value})"
    },
    {
        "fn": "startswith",
        "description": "check if a string starts with a specified character",
        "template": "startswith(${1:value})"
    }
];

export const operators = [
    '+', '-', '*', '/', '<', ">", "<>", "=", 'eq', 'gt', 'lt', 'add', 'minus', 'mul', 'div', 'mod'
];
