﻿import * as assert from "assert";
import { Token, tokenizer } from "../src/Tokenizer";
import { parser } from "../src/Parser";
import { ExpressionVisitor } from "../src/ExpressionVisitor";

const input = `(define circle-area (lambda (r) (* pi (* r r))))`;

const tokens = tokenizer(input);
const ast = parser(tokens);
//const result = interpret(ast);

//const visitor = new ExpressionVisitor();
//visitor.visit(ast);

console.log(JSON.stringify(ast, null, 4));
//console.log(result);

//assert.deepStrictEqual(tokenizer(input), tokens, 'Tokenizer should turn `input` string into `tokens` array');

//console.log('All Passed!');