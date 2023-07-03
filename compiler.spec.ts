import { expect, test } from 'vitest'
import { compiler } from './compiler'

/**
 *  *                  LISP                      C
 *
 *   2 + 2          (add 2 2)                 add(2, 2)
 *   4 - 2          (subtract 4 2)            subtract(4, 2)
 *   2 + (4 - 2)    (add 2 (subtract 4 2))    add(2, subtract(4, 2))
*/

test('test 2 + 2 compiler', () => {
    const sourceCode = '(add 2 2)';
    const targetCode = 'add(2, 2)';
    expect(compiler(sourceCode)).toEqual(targetCode)
})

test('test 4 - 2 compiler', () => {
    const sourceCode = '(subtract 4 2)';
    const targetCode = 'subtract(4, 2)';
    expect(compiler(sourceCode)).toEqual(targetCode)
})

test('test 2 + (4 - 2) compiler', () => {
    const sourceCode = '(add 2 (subtract 4 2))';
    const targetCode = 'add(2, subtract(4, 2))';
    expect(compiler(sourceCode)).toEqual(targetCode)
})