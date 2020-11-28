module.exports = {
  parser: `@typescript-eslint/parser`,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'plugin:react/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'unused-imports'],
  parserOptions: {
    ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  env: {

    browser: true,
    node: true,
  },
  rules: {
    quotes: 'off',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    indent: ['error', 2, { SwitchCase: 1 }],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        semi: true,
        singleQuote: true,
        printWidth: 120,
      },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    'unused-imports/no-unused-imports-ts': 'error',
  },
};
