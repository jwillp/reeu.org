const path = require('path');
const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const ManifestPlugin = require('webpack-manifest-plugin');
const SuppressEntryChunksPlugin = require('./build_scripts/SuppressEntryChunksPlugin');

// Utility functions
const _ = {

    // Get the last element of an array. Passing **n** will return the last N
    // values in the array.
    last: function(arr) {
        return arr[arr.length - 1]
    },

    first: function(arr) {
        return arr[0]
    },

    split: function(str, t) {
        return str.split(t)
    },

    replace: function(str, a, b) {
        return str.replace(a, b)
    }
}

module.exports = function(env = {}) {

    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = env.production ? 'production' : 'development';
    }
    console.log("WEBPACK ENV: " + process.env.NODE_ENV)

    // Easily resolves path relative to this config file
    function resolve (dir) {
        return path.join(__dirname, dir)
    }

    // Returns the correct loader for certain type of file
    function makeStyleLoader(type) {
      const cssLoader = {
        loader: 'css-loader',
        options: {
            // Minify
          minimize: false,  //env.production
        }
      };
      const loaders = [
        cssLoader,
        'autoprefixer-loader?browsers=last 2 version',
        //'resolve-url-loader'
      ];
      if ( type )
        loaders.push( type + '-loader' );
      if ( env.production ) {
        return ExtractTextPlugin.extract( {
          use: loaders,
          fallback: 'vue-style-loader',
          filename: 'css/[name].min.css'
        } );
      } else {
        return [ 'vue-style-loader' ].concat( loaders );
      }
    }


    // There are two list entry points:
    // - one list for dev
    // - one list for prod

    // Dev entry
    // bundles everything from src/bundle.js


    // Prod entry
    // Proceses
    //  - global js
    //  - per page js
    //  - global css
    //  - per page css

    return {

        entry: env.production ? {
            // PRODUCTION ENTRY

            app: './src/bundles/app.js',
        } : [
            // DEV ENTRY
            './src/bundles/bundle-dev.js'
        ],

        output: {
            path: resolve('build/'),
            filename: env.production ? 'js/[name].[hash].min.js' : 'bundle.min.js',

            // For dev builds serve files to a local server so we can hot reload
            // indicates where files should be served from memory
            publicPath: env.production ? '../' : 'http://localhost:8080/dist/'
        },

        // Indicates how webpack should resolve paths when importing files.
        // from js
        resolve: {
          // Indicates extensions that can be omitted
          extensions: ['.js', '.json'],
          alias: {
            '@': resolve('src')
          }
        },

        plugins: env.production ? [
            // PROD BUILD PLUGINS

            // replaces process.env.NODE_ENV with "production"
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: `'${process.env.NODE_ENV}'` // production
                }
            }),

            // Uglifies babel code
            new webpack.optimize.UglifyJsPlugin( {
                compress: {
                    warnings: false
                }
            }),

            // Extract plugin (for extracting css from js)
            new ExtractTextPlugin( {
                filename: 'css/[name].[contenthash].min.css'
            }),

            // Generate a manifest of files with their associated hash name
            new ManifestPlugin({
                // Do not put fonts in manifest
                filter: (file) => file.name.endsWith('.js') || file.name.endsWith('.css'),

                // Make sure file name in manifest contain their full rel path to build
                map: (file) => {
                    const publicPath = '../'

                    // Find relative dir
                    let dir = file.path.replace(publicPath,'')
                    filenameWithHash = dir.replace(/^.*[\\\/]/, '')
                    dir = dir.replace(filenameWithHash, '')

                    // Add relative dir to file name
                    file.name = dir + file.name

                    // Remove public path
                    file.path = file.path.replace(publicPath,'')
                    return file
                }
            }),

            // Suppresses Chunks (js) that are not needed
            new SuppressEntryChunksPlugin([
                'home'
            ])
        ] : [
            // DEV BUILD PLUGINS

            // hot reload plugin
            new webpack.HotModuleReplacementPlugin(),

            // display module names in hot reload instead of module ids
            new webpack.NamedModulesPlugin(),

            // replaces process.env.NODE_ENV with "production"
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: `'${process.env.NODE_ENV}'` // development
                }
            }),
        ],

        // Generate source maps
        //devtool: env.production ? false : '#cheap-module-eval-source-map',

        devServer: {
            // Only serve files that are part of our bundle
            // everything else will be served by Apache or Nginx
            contentBase: resolve('.'),

            // Gzip Compression
            compress: true,

            // Activate hot reloading
            hot: true,
            // Allow CORS, our server is running on other port than webpacks erver
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        },

        module: {
            loaders: [
                // Babel
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },

                // CSS
                {
                    test: /\.css$/,
                    use: makeStyleLoader()
                },

                // SASS
                {
                    test: /\.scss$/,
                    use: makeStyleLoader('sass')
                },

                // Images
                {
                    test: /\.(png|jpe?g|gif)(\?.*)?$/,
                    // loader: 'url-loader?limit=100000',
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    }
                },

                // Fonts
                {
                  test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                  loader: 'file-loader',
                  options: {
                    name: 'fonts/[name].[ext]'
                  }
                }
            ] // loaders end
        } // module end
    };
}
