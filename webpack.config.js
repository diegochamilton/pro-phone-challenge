const webpack = require("webpack");
const path = require("path");

const environment = process.env.NODE_ENV;
const isProduction = environment === "production";

const ENTRY = path.join(__dirname, "./src/index.jsx");
const OUTPUT = path.join(__dirname, "public");
const FILES_DIRECTORY = "./public";

module.exports = {
  entry: ENTRY,
  output: {
    filename: "bundle.js",
    path: OUTPUT,
    publicPath: "/",
  },
  mode: environment,
  devtool: "inline-source-map",
  optimization: {
    concatenateModules: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: {
                    mode: "local",
                    exportLocalsConvention: "camelCase",
                    localIdentName: isProduction
                      ? "[hash:base64]"
                      : "[local]--[hash:base64:5]",
                  },
                  importLoaders: 1,
                },
              },
              "sass-loader",
            ],
          },
          {
            use: ["style-loader", "css-loader", "sass-loader"],
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    enforceExtension: false,
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(environment),
    }),
  ],
};
