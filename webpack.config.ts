import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import type { Configuration as ConfigurationWebpack } from 'webpack';
import type { Configuration as ConfigurationDevServer } from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

interface Configuration extends ConfigurationWebpack {
  devServer?: ConfigurationDevServer
}

function configuration(_env: unknown, argv: { mode: string }): Configuration {
  return {
    entry: {
      index: './src/index.tsx',
      another: './src/assets/notes.json',
    },
    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                esModule: false,
              },
            },
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false,
              },
            },
            {
              loader: 'css-loader',
            }, 'sass-loader', 'postcss-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
          use: ['file-loader'],
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new CopyPlugin({
        patterns: [
          { from: 'src/manifest.json', to: 'manifest.json' },
          { from: 'src/assets/favicon.png', to: 'favicon.png' },
          { from: 'src/assets/icons/*.png', to: 'assets/icons/[name].png' },
          { from: 'src/assets/screenshots/*.png', to: 'assets/screenshots/[name].png' },
        ],
      }),
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
      new WorkboxPlugin.GenerateSW({
        // these options encourage the ServiceWorkers to get in there fast
        // and not allow any straggling "old" SWs to hang around
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024 * 4,
      }),
    ],
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.cjs', '.mjs', '.scss'],
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      historyApiFallback: true,
      port: 8888,
      open: true,
      hot: true,
    },
    optimization: {
      splitChunks: {
        minSize: { javascript: 20000, 'css/mini-extra': 10000 },
      },
    },
  };
}

export default configuration;
