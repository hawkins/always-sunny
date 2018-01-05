module.exports = {
  modify: (config, { target, dev }, webpack) => {
    //   const cssRuleIndex = config.module.rules.findIndex(rule => {
    //     if (!rule.test) return false;
    //     return "a.css".match(rule.test);
    //   });
    //   config.module.rules[cssRuleIndex] = {
    //     test: /\.css$/,
    //     use: [
    //       "isomorphic-style-loader",
    //       {
    //         loader: "css-loader",
    //         options: {
    //           modules: true, // default is false
    //           sourceMap: dev,
    //           minimize: !dev,
    //           importLoaders: 1,
    //           localIdentName: "[name]--[local]--[hash:base64:8]"
    //         }
    //       },
    //       "postcss-loader"
    //     ]
    //   };
    //   // });
    return config;
  }
};
