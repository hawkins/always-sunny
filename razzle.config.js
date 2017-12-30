module.exports = {
  modify: (config, { target, dev }, webpack) => {
    // do something to config

    // react-toolbox
    config.module.rules.push({
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true, // default is false
            sourceMap: true,
            importLoaders: 1,
            localIdentName: "[name]--[local]--[hash:base64:8]"
          }
        },
        "postcss-loader"
      ]
    });

    return config;
  }
};
