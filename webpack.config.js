const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 别问我这是干嘛的，文档是说抽离css的
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理dist生产文件夹使用的

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../'),   //根目录
      verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  output: {
    filename: '[name].bundle.js',
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
  }
  ]
}
}