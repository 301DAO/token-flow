/** @type {import('prettier').Config} */
module.exports = {
  semi: true,
  tabWidth: 4,
  useTabs: false,
  printWidth: 80,
  endOfLine: 'auto',
  singleQuote: true,
  arrowParens: 'avoid',
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  quoteProps: 'as-needed',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
  ],
};
