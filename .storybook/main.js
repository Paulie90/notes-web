const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: ["@storybook/preset-create-react-app", "@storybook/addon-actions", "@storybook/addon-links"],
  webpackFinal: async (config) => {
    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        use: "awesome-typescript-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["sass-loader"],
        exclude: /node_modules/,
        include: path.resolve(__dirname, "../"),
      },
    );

    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  },
};
