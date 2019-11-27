import { terser } from "rollup-plugin-terser";

export default [
    {
        input: "src/crs-monaco-editor.js",
        output: [
            { file: 'dist/crs-monaco-editor.js', format: 'es' }
        ],
        plugins: [
            terser()
        ]
    }
];