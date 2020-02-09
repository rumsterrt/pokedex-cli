const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const srcPath = path.join(__dirname, './src')

module.exports = {
    entry: './src',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: ['file-loader'],
            },
        ],
    },
    resolve: {
        modules: ['node_modules', srcPath],
        extensions: ['*', '.js', '.jsx'],
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: srcPath,
        host: 'localhost',
        port: '3000',
        hot: true,
        historyApiFallback: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(srcPath, 'index.html'),
            filename: 'index.html',
            inject: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
}
