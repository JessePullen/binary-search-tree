import globals from "globals";
import pluginJs from "@eslint/js";
import jest from 'eslint-plugin-jest';

export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {ignores: ["dist/main.js", "webpack.config.js"]},
  {files: ['**/*.test.js', '**/*.spec.js'],
    ...jest.configs['flat/recommended']}
];