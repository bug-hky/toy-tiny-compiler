export enum TokenTypes {
  Paren,
  Name,
  Number,
}

export interface Token {
  type: TokenTypes,
  value: string
}

export const tokenizer = (code: string): Token[] => {
  const tokens: Token[] = [];
  
  let current = 0;

  while (current < code.length) {

    let char = code[current];
    
    const REG_WHITESPACE = /\s/i
    if (REG_WHITESPACE.test(char)) {
      current++
      continue
    }

    if (char === '(') {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      })

      current++
      continue
    }

    if (char === ')') {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      })

      current++
      continue
    }

    const REG_LETTERS = /[a-z]/i
    if (REG_LETTERS.test(char)) {
      
      let value = ''
      
      while (REG_LETTERS.test(char) && current < code.length) {
        value += code[current]
        char = code[++current]
      }

      tokens.push({
        type: TokenTypes.Name,
        value,
      })
    }

    const REG_NUMBER = /[0-9]/i
    if (REG_NUMBER.test(char)) {
      
      let value = ''

      while (REG_NUMBER.test(char) && current < code.length) {
        value += code[current]
        char = code[++current]
      }

      tokens.push({
        type: TokenTypes.Number,
        value,
      })
    }

  }
  return tokens;
}