﻿import * as assert from "assert";
import { IToken } from "../src/Tokenizer";
import { IAstBody } from "../src/Parser";
import { ICstBody } from "../src/Transformer";

import {
    tokenizer,
    parser,
    transformer,
    codeGenerator,
    compiler
} from "../src/Compiler";

const input = '(add 2 (subtract 4 2))';
const output = 'add(2, subtract(4, 2));';

const tokens = [
    { type: 'paren', value: '(' },
    { type: 'symbol', value: 'add' },
    { type: 'number', value: '2' },
    { type: 'paren', value: '(' },
    { type: 'symbol', value: 'subtract' },
    { type: 'number', value: '4' },
    { type: 'number', value: '2' },
    { type: 'paren', value: ')' },
    { type: 'paren', value: ')' }
];

const ast = {
    type: 'Program',
    body: [{
        type: 'CallExpression',
        name: 'add',
        params: [
            {
                type: 'NumberLiteral',
                value: '2'
            }, {
                type: 'CallExpression',
                name: 'subtract',
                params: [
                    {
                        type: 'NumberLiteral',
                        value: '4'
                    }, {
                        type: 'NumberLiteral',
                        value: '2'
                    }]
            }]
    }]
};

const newAst = {
    type: 'Program',
    body: [{
        type: 'ExpressionStatement',
        expression: {
            type: 'CallExpression',
            callee: {
                type: 'Identifier',
                name: 'add'
            },
            arguments: [{
                type: 'NumberLiteral',
                value: '2'
            }, {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'subtract'
                    },
                    arguments: [
                        {
                            type: 'NumberLiteral',
                            value: '4'
                        }, {
                            type: 'NumberLiteral',
                            value: '2'
                        }]
                }]
        }
    }]
};

assert.deepStrictEqual(tokenizer(input), tokens, 'Tokenizer should turn `input` string into `tokens` array');
assert.deepStrictEqual(parser(<Array<IToken>><any>tokens), ast, 'Parser should turn `tokens` array into `ast`');
assert.deepStrictEqual(transformer(<IAstBody><any>ast), newAst, 'Transformer should turn `ast` into a `newAst`');
assert.deepStrictEqual(codeGenerator(<ICstBody><any>newAst), output, 'Code Generator should turn `newAst` into `output` string');
assert.deepStrictEqual(compiler(input), output, 'Compiler should turn `input` into `output`');

console.log('All Passed!');
