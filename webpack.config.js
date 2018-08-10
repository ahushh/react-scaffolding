const Webpack = require('webpack');
const Path = require('path');

const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const outPath = Path.join(__dirname, './dist');
const sourcePath = Path.join(__dirname, './src');
const assetsPath = Path.join(__dirname, './assets');

const isProduction = process.argv.indexOf('--mode=production') >= 0;
const isDevServer = process.argv.find(v => v.includes('webpack-dev-server'));

let plugins = [
  new Dotenv({
    path: `./.env.${isProduction ? 'production' : 'development'}`,
    safe: false
  }),
  new HtmlWebpackPlugin({
    template: './index.html',
    hash: true
  }),
  new ExtractTextPlugin('[name].css')
];

if (isDevServer) {
  plugins = [
    ...plugins,
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ];
}

if (!isDevServer) {
  plugins = [
    ...plugins,
    new CopyWebpackPlugin([
      { from: '../assets', to: '../dist/assets' }
    ])
  ];
}

const sourceMap = !isProduction;

const styleLoaders = [
  //  },
  { loader: 'css-loader', options: { sourceMap, alias: { '../img': '../images' } } },
  { loader: 'postcss-loader', options: { sourceMap } },
  { loader: 'sass-loader', options: { sourceMap } }
];

const styleUse = isDevServer ?
  [{ loader: 'style-loader', options: { sourceMap } }, ...styleLoaders] :
  ExtractTextPlugin.extract({ fallback: 'style-loader', use: styleLoaders });

const loaders = [
  {
    test: /\.tsx?$/,
    exclude: [/\.test\.tsx?$/],
    use: [
      {
        loader: 'ts-loader'
        // loader: `awesome-typescript-loader?sourceMap=${isProduction ? 'false' : 'true'}`
      }
    ]
  },
  {
    test: /\.s?css$/,
    include: [sourcePath],
    use: styleUse
  },
  {
    test: /\.scss$/,
    include: [assetsPath],
    use: styleUse
  },
  {
    test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
    include: [assetsPath, /node_modules/],
    use: [{
      loader: 'file-loader',
      options: {
        name: '[hash].[ext]'
      }
    }]
  },
  {
    test: /\.(png|jpg|gif|svg|jpeg|ico)$/,
    include: [sourcePath, assetsPath],
    use: [{
      loader: 'file-loader',
      options: {
        name: './images/[name].[hash].[ext]'
      }
    }]
  }
];

const config = {
  stats: {
    children: false
  },
  target: 'web',
  // The base directory, an absolute path,
  // for resolving entry points and loaders from configuration.
  context: sourcePath,
  entry: {
    main: ['./index.tsx']
    // vendor: './vendor.ts',
  },
  devtool: isProduction ? 'none' : 'source-map',
  output: {
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    path: outPath,
    // the url to the output directory resolved relative to the HTML page
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: 'lazy_[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules', sourcePath]
  },
  module: {
    rules: loaders
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    compress: true,
    port: 3000,
    hot: !isProduction,
    stats: {
      children: false
    }
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  plugins
};

module.exports = config;
