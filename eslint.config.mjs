/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-01-31
 ------------------------------------------------- */

import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  { ignores: ['dist/**', 'node_modules/**'] },
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      parserOptions: { sourceType: 'module', ecmaVersion: 'latest' },
      globals: globals.node,
    },
    rules: {
      // TypeScript-ESLint rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Import rules
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          'alphabetize': { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/extensions': 'off',

      // ESLint rules
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-nested-ternary': 'error',
      'no-lonely-if': 'warn',
      'no-undefined': 'warn',
      'no-unexpected-multiline': 'warn',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'warn',
      'no-unused-vars': 'off',
      'max-params': ['error', 5],
      'max-depth': ['warn', 4],
    },
  },
  tseslint.configs.recommended,
  // Lint JSON files. Visit https://github.com/eslint/json
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
    ignores: ['package-lock.json', '**/tsconfig*.json'],
  },
  // Visit https://github.com/eslint/markdown
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
  },
  // Disable ESLint formatting rules that conflict with Prettier
  eslintConfigPrettier,
]);
