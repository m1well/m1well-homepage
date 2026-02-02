import js from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import sortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,

  {
    files: ['**/*.{js,ts,mjs,cjs}'],
    plugins: {
      'simple-import-sort': sortPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  {
    files: ['**/*.astro'],
    plugins: {
      'simple-import-sort': sortPlugin,
    },
    rules: {
      'astro/no-conflict-set-directives': 'error',
      'astro/no-unused-define-vars-in-style': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['*.config.{js,mjs}', 'tools/**/*.{js,mjs}'],
    languageOptions: {
      globals: globals.node,
    },
  },

  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
];
