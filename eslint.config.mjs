import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    ignores: [".next/**", "node_modules/**", "dist/**", "out/**"],
}, {
    extends: [...compat.extends(...nextCoreWebVitals.extends)],

    rules: {
        "react-hooks/exhaustive-deps": "off",
        "@next/next/no-img-element": "off",
    },
}, {
    files: ["remotion/*.{ts,tsx}"],
    extends: [...compat.extends("plugin:@remotion/recommended")],
}]);
