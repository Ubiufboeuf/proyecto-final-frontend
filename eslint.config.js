import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import json from '@eslint/json'
import css from '@eslint/css'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,jsx,tsx}'], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  tseslint.configs.recommended,
  { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  { files: ['**/*.css'], plugins: { css }, language: 'css/css', extends: ['css/recommended'] },
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-empty-pattern': 'off',
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      '@stylistic/eol-last': ['error', 'always'],
      '@typescript-eslint/consistent-type-imports': 'error',
      'space-before-function-paren': ['error', 'always']
    }
  }
])
