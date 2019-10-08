const path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 网上说是压缩js的
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 别问我这是干嘛的，文档是说抽离css的 加最小化压缩
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理dist生产文件夹使用的
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 还是css 使用的
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})  // css 使用的
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      template: './index.html'  // 模板
    })
  ],
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
		rules: [
    {
			test: /\.scss$/,
			use: [
				MiniCssExtractPlugin.loader,
				// process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
				"css-loader", // 将 CSS 转化成 CommonJS 模块
				"sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
      ]
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        }
      }
    }
  ]
  }
}