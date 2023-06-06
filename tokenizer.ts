export enum TokenTypes {
  Paren,
  Name,
}

export interface Token {
  type: TokenTypes,
  value: string
}

export const tokenizer = (code: string): Token[] => {
  const tokens: Token[] = [];
  
  let current = 0;
  let char = code[current];
  if (char === '(') {
    tokens.push({
      type: TokenTypes.Paren,
      value: char,
    })
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
  return tokens;
}