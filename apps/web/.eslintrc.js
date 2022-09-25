/** @type {import('eslint').ESLint} */
module.exports = {
  root: true,
  extends: ['custom', 'plugin:react-hooks/recommended'],
  rules: {
    'import/no-anonymous-default-export': ['off'],
  },
};
