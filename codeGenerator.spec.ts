import { expect, test } from 'vitest'
import { codeGenerator } from './codeGenerator'
import { transformerAst } from './transformer.spec'

/**
 *  *                  LISP                      C
 *
 *   2 + 2          (add 2 2)                 add(2, 2)
 *   4 - 2          (subtract 4 2)            subtract(4, 2)
 *   2 + (4 - 2)    (add 2 (subtract 4 2))    add(2, subtract(4, 2))
*/

test('test code generator', () => {
    const targetCode = 'add(2, subtract(4, 2))';
    expect(codeGenerator(transformerAst)).toEqual(targetCode)
})