/**
 * This file gets generated during compile time from something like antler to be used in your language definition
 */

export const keywords = [
    'in', 'not', 'or', 'and', 'true', 'false', 'null'
];

export const functions = new Map(
    [
        ["pow", {
            "description": "math power function",
            "example": "pow(base: number, expoonent: number)",
            "template": "pow(${1:base}, ${2:exponent})"
            }],

        ["add", {
            "description": "math add function",
            "example": "add(value1: number, value2: number)",
            "template": "add(${1:value1}, ${2:value2})"
        }]
    ]
);

export const operators = [
    '+', '-', '*', '/', '<', ">", "<>", "=", 'eq', 'gt', 'lt', 'add', 'minus', 'mul', 'div', 'mod'
];
