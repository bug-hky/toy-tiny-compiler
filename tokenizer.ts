export enum TokenTypes {
  Paren
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

  return tokens;
}