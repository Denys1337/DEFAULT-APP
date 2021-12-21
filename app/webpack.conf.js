import webpack from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import merge from 'webpack-merge'; // eslint-disable-line import/no-extraneous-dependencies
import yaml from 'js-yaml';
import path from 'path';
import fs from "fs";

function loadConfig() {
  const ymlFile = fs.readFileSync( 'config.yml', 'utf8' );
  return yaml.load( ymlFile );
}

const { PATHS } = loadConfig();
const TARGET = process.env.npm_lifecycle_event;
const IS_SERVER = TARGET === 'start' || TARGET === 'continue';
const common = {
  output: {
    publicPath: path.normalize( ( IS_SERVER ? '' : PATHS.wp.replace( /^\.\./, '' ) ) + '/js/' ),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png/i,
        use: ['url-loader'],
      },
    ],
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    jquery: 'jQuery',
    jQuery: 'jQuery',
  },
};

if ( IS_SERVER ) {
  module.exports = merge( common, {
    devtool: '#source-map',
  } );
} else if ( TARGET === 'build' || 0 === TARGET.indexOf( 'wp-' ) ) {
  module.exports = merge( common, {
    devtool: false,
    plugins: [
      new webpack.optimize.UglifyJsPlugin( {
        compress: {
          warnings: false,
        },
        output: { comments: false },
        sourceMap: false,
      } ),
    ],
  } );
} else {
  module.exports = common;
}
