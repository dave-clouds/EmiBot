import js from '@eslint/js';

export default [
  {
    ignores: ['node_modules/', 'coverage/', 'dist/', 'build/', '.git/'],
  },

  js.configs.recommended,

  {
    files: ['src/**/*.js', 'tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
      },
    },

    rules: {
      'no-console': 'off',
    },
  },
];
