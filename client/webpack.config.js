const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                prependData: `@import "src/styles/variables.scss";`,
                includePaths: [path.join(__dirname, 'src/styles')],
              },
              additionalData: `
                @import "src/styles/variables.scss";
              `,
            },
          },
        ],
      },
    ],
  },
}
