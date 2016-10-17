const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// TODO production config
const NODE_ENV = process.env.NODE_ENV || 'development';
const PROD = NODE_ENV === 'production';

const extractCSS = new ExtractTextPlugin('styles.css');

const uglifyOptions = {
  compress: {
    screw_ie8: true, // React doesn't support IE8
    warnings: false
  },
  mangle: {
    screw_ie8: true
  },
  output: {
    comments: false,
    screw_ie8: true
  }
};

const plugins = [
  extractCSS,

  /*
  * Plugin: ForkCheckerPlugin
  * Description: Do type checking in a separate process, so webpack don't need to wait.
  *
  * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
  */
  new ForkCheckerPlugin(),

  /*
   * Plugin: CommonsChunkPlugin
   * Description: Shares common code between the pages.
   * It identifies common modules and put them into a commons chunk.
   *
   * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
   * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
   */
  new webpack.optimize.CommonsChunkPlugin({
    name: ['hmr', 'polyfills', 'vendor']
  }),

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

  // This helps ensure the builds are consistent if source hasn't changed:
  PROD ? new webpack.optimize.OccurrenceOrderPlugin() : null,
  // Try to dedupe duplicated modules, if any:
  PROD ? new webpack.optimize.DedupePlugin() : null,
  // Uncomment to minify the production bundles.
  // PROD ? new webpack.optimize.UglifyJsPlugin(uglifyOptions) : null,
].filter(_.identity);

const loaders = [
  {
    test: /\.json$/,
    loader: 'json',
  },
  {
    test: /\.tsx?$/,
    loader: 'awesome-typescript-loader',
  },
  {
    test: /\.scss$/,
    loader: extractCSS.extract([
      {
        loader: 'css-loader',
        query: {
          sourceMap: true,
          modules: true,
          importLoaders: 1,
          localIdentName: '[local]',
        }
      },
      {
        loader: 'sass-loader',
        sourceMap: true,
      },
      'postcss-loader',
    ]),
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
  entry: {
    vendor: [
      'webpack-hot-middleware/client',
      // isomorphic polyfills
      './polyfills',
      // vendor dependencies
      './vendor.browser.js'
    ],
    // app entry point
    app: './src/client/index.tsx'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss', '.less']
  },
  module: {
    loaders: loaders, // eslint-disable-line
  },
  plugins: plugins, // eslint-disable-line
  output: {
    path: path.join(__dirname, 'dist'),

    /**
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: http://webpack.github.io/docs/configuration.html#output-filename
     */
    filename: '[name].bundle.js',

    /**
     * The filename of the SourceMaps for the JavaScript files.
     * They are inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
     */
    sourceMapFilename: '[name].map',

    /** The filename of non-entry chunks as relative path
     * inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
     */
    chunkFilename: '[id].chunk.js',

    publicPath: '/dist/',
  }
};
