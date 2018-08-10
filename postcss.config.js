/* eslint import/no-extraneous-dependencies: 0 */

const isProduction = process.argv.indexOf('--mode=production') >= 0;

const supportingBrowsers = [
  'last 2 versions',
  'ie >= 10',
  'Android >= 4',
  'iOS >= 9'
];

const plugins = isProduction ? [
  require('cssnano')({
    preset: 'default'
  })
] : [];

function getConfig(ctx) {
  return {
    // options: {
    //   ident: 'postcss',
    //   syntax: 'postcss-scss',
    //   parser: 'postcss-scss',
    // },
    plugins: [
      require('autoprefixer')({
        browsers: supportingBrowsers
      }),
      ...plugins
    ]
  };
}

module.exports = ctx => getConfig(ctx);
