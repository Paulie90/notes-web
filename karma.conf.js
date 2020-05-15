var path = require("path");

module.exports = function (config) {
  config.set({
    browsers: ["ChromeHeadless"],
    // browsers: ["Chrome"],
    frameworks: ["jasmine"],
    files: ["spec/setup.ts", "src/**/*.spec.ts", "src/**/*.spec.tsx"],
    preprocessors: {
      "spec/setup.ts": ["webpack"],
      "src/**/*.spec.ts": ["webpack"],
      "src/**/*.spec.tsx": ["webpack"],
    },

    colors: true,
    webpack: {
      mode: "development",
      module: {
        rules: [
          {
            test: /.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              presets: ["@babel/react"],
            },
          },
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            loader: "awesome-typescript-loader",
          },
          {
            test: /\.(c|sc)ss$/,
            loader: "ignore-loader",
          },
        ],
      },
      resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
          spec: path.join(__dirname, "./spec"),
          core: path.join(__dirname, "./src/core"),
          data: path.join(__dirname, "./src/data"),
          components: path.join(__dirname, "./src/components"),
          views: path.join(__dirname, "./src/views"),
        },
      },
    },
    webpackMiddleware: {
      stats: "errors-warnings",
    },
  });
};
