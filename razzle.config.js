module.exports = {
  modify: (config, { target, dev }, webpack) => {
    // Note: This is ABSURDLY brittle and hacky,
    // we're manually swapping out razzle's default CSS rule (index 4)
    // with our own.
    // How else can we override their CSS rules?
    // Should be something like config.module.rules.push({
    config.module.rules[4] = {
      test: /\.css$/,
      use: [
        "isomorphic-style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true, // default is false
            sourceMap: dev,
            minimize: !dev,
            importLoaders: 1,
            localIdentName: "[name]--[local]--[hash:base64:8]"
          }
        },
        "postcss-loader"
      ]
    };
    // });
    return config;
  }
};
