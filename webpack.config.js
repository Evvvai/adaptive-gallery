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
              sassOptions: {
                prependData: `@import "src/styles/variables.scss";`,
                includePaths: [path.join(__dirname, 'src/styles')],
              },
              sourceMap: true,
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
