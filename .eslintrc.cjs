module.exports = {
  extends: [
    'plugin:astro/recommended',
    'plugin:astro/jsx-a11y-recommended',
    'plugin:tailwindcss/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // 空格和縮進
    'indent': [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    'no-tabs': 'error',
    'no-trailing-spaces': 'error',
    // 引號和字符串
    'quotes': ['error', 'single'],
    'quote-props': ['error', 'consistent-as-needed'],
    'prefer-template': 'error',
    // 分號
    'semi': ['error', 'never'],
    // 命名約定
    'camelcase': 'error',
    // 禁止使用 var 關鍵字
    'no-var': 'error',
    // 禁止未使用的變量
    'no-unused-vars': 'error',
    // 箭頭函數的使用
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'arrow-parens': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    // 代碼塊前後空格
    'block-spacing': 'error',
    'space-before-blocks': 'error',
    'space-in-parens': ['error', 'never'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'off',
    // TypeScript any
    '@typescript-eslint/no-explicit-any': 'off'
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {}
    }
  ],
  ignorePatterns: ['**/node_modules/', '**/dist/', '**/build/', '.cache', '**/distro/']
}
