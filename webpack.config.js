var path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist'),
	},
	devtool: 'source-map',
	devServer: {
			contentBase: "./dist"
	},

	module: {
		rules: [
			{
				test: /\.js$/, exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
			},
			{
				test: /\.(woff|woff2)$/,
				use: {
					loader: 'url-loader',
					options: {
						name: 'fonts/[hash].[ext]',
						limit: 5000,
						mimetype: 'application/font-woff'
					}
				}
			},
			{
				test: /\.(ttf|eot|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'fonts/[hash].[ext]'
					}
				}
			}
		]
	}
};