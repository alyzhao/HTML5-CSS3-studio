const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
	entry: './js/index.js',
	devtool: 'inline-source-map',   // 跟踪错误堆栈
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: [
					'babel-loader'
				],
				exclude: /node_modules/
			},
			{
				test: /\.(scss|css)$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'sass-loader'],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)\w*/,
				loader: 'file-loader?publicPath=/build/&outputPath=font'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'index.css',
			disable: false,
			allChunks: true
		})
	],
	output: {
		path: path.join(__dirname, 'js'),
		filename: "bundle.js", 
	}
}