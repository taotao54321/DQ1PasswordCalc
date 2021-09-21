const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const is_development = process.env.NODE_ENV === "development";

module.exports = {
    target: "web",
    mode: is_development ? "development" : "production",
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        webassemblyModuleFilename: "[hash].wasm",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        modules: [__dirname, "src", "node_modules"],
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    experiments: {
        asyncWebAssembly: true,
    },
};
