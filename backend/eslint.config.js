import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores(["node_modules", "coverage"]),
    {
        files: ["**/*.js"],
        extends: [js.configs.recommended],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
                ...globals.es2021,
                fetch: "readonly",
            },
        },
        rules: {
            "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^[A-Z_]" }],
            "no-console": "off",
        },
    },
    {
        files: ["tests/**/*.js"],
        languageOptions: {
            globals: globals.node,
        },
    },
]);
