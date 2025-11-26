import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig([
  // ignore folder(s)
  globalIgnores(['dist']),

  // config for TypeScript files
  {
    files: ['**/*.{ts,tsx}'],

    // parser + parserOptions (important for type-aware rules)
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        // <-- point to your tsconfig and set root dir to avoid the parsing error
        project: [resolve(__dirname, 'tsconfig.json')],
        tsconfigRootDir: __dirname,
      },
      globals: globals.browser,
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    extends: [
      js.configs.recommended,
      // use the official @typescript-eslint recommended config
      ... (tsPlugin.configs?.recommended ? [tsPlugin.configs.recommended] : []),
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],

    rules: {
      // keep react-hooks recommended rules
      ...reactHooks.configs.recommended.rules,

      // your TS rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      // react-refresh rule
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
])
