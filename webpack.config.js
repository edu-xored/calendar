const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// TODO production config
const NODE_ENV = process.env.NODE_ENV || 'development';
// const DEBUG = NODE_ENV === 'development';
const PROD = NODE_ENV === 'production';

// TODO allow to customize css loader
const cssLoader = 'css?sourceMap&modules&importLoaders=1&localIdentName=[local]';
const sassLoader = `${cssLoader}!postcss!sass?sourceMap`;

const uglifyOptions = {
	sourceMap: true,
	compressor: {
		warnings: false,
		dead_code: true,
	},
	output: {
		// preamble: banner,
		comments: 'all',
	},
	beautify: true,
	mangle: false,
};

const plugins = [
  new ExtractTextPlugin('styles.css', { allChunks: true }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
    },
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
  }),
  PROD ? new webpack.optimize.OccurenceOrderPlugin() : null,
  PROD ? new webpack.optimize.UglifyJsPlugin(uglifyOptions) : null,
].filter(_.identity);

const loaders = [
  {
    test: /\.json$/,
    loader: 'json',
  },
  {
    test: /\.tsx?$/,
    loader: 'ts-loader',
  },
  {
    test: /\.(scss|css)$/,
    loader: ExtractTextPlugin.extract('style', sassLoader),
  },
  // "file" loader makes sure those assets get served by WebpackDevServer.
  // When you `import` an asset, you get its (virtual) filename.
  // In production, they would get copied to the `build` folder.
  {
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
    loader: 'file',
    query: {
      name: 'static/media/[name].[hash:8].[ext]'
    }
  },
  // "url" loader works just like "file" loader but it also embeds
  // assets smaller than specified size as data URLs to avoid requests.
  {
    test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
    loader: 'url',
    query: {
      limit: 10000,
      name: 'static/media/[name].[hash:8].[ext]'
    }
  }
];

module.exports = {
  devtool: 'source-map',
  entry: [
    // TODO try to use webpackHotDevClient
    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // of CSS changes), or refresh the page (in case of JS changes). When you
    // make a syntax error, this client will display a syntax error overlay.
    // Note: instead of the default WebpackDevServer client, we use a custom one
    // to bring better experience for Create React App users. You can replace
    // the line below with these two lines if you prefer the stock client:
    // require.resolve('webpack-dev-server/client') + '?/',
    // require.resolve('webpack/hot/dev-server'),
    // require.resolve('react-dev-utils/webpackHotDevClient'),

    'webpack-hot-middleware/client',

    // TODO include polyfills
    // We ship a few polyfills by default:
    // require.resolve('./polyfills'),

    // app entry point
    './src/client/index.tsx'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: plugins, // eslint-disable-line
  module: {
    loaders: loaders, // eslint-disable-line
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss', '.less'],
  },
  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ]
      }),
    ];
  },
};
