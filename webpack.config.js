const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isProd = process.argv.indexOf('-p') !== -1;

const cssDev = [
    'style-loader',
    'css-loader?sourceMap',
    'sass-loader?sourceMap'];

const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
        'css-loader', 'sass-loader'
		],
});

const cssConfig = isProd ? cssProd : cssDev;

const devtool = isProd ? 'none' : 'source-map';

module.exports = {
    devtool: devtool,
    entry: {
        app: './src/app/app.module.js'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'resources/js/[name].js',
        chunkFilename: 'resources/js/[name].js',
        pathinfo: true,
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    'file-loader?name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug'
                ]
            },
            {
                test: /\.woff2$/,
                loader: 'url-loader',
                query: {
                    limit: 65000,
                    name: 'resources/fonts/[hash].[ext]',
                    publicPath: '../../',
                    mimetype: 'application/font-woff2'
                }
            },
            {
                test: /\.woff$/,
                loader: 'url-loader',
                query: {
                    limit: 65000,
                    name: 'resources/fonts/[hash].[ext]',
                    publicPath: '../../',
                    mimetype: 'application/font-woff'
                }
            },
            {
                test: /\.svg$/,
                loader: 'url-loader',
                query: {
                    limit: 65000,
                    name: 'resources/fonts/[hash].[ext]',
                    publicPath: '../../',
                    mimetype: 'image/svg+xml'
                }
            },
            {
                test: /\.ttf$/,
                loader: 'url-loader',
                query: {
                    limit: 65000,
                    name: 'resources/fonts/[hash].[ext]',
                    publicPath: '../../',
                    mimetype: 'application/octet-stream'
                }
            },
            {
                test: /\.eot$/,
                loader: 'url-loader',
                query: {
                    limit: 65000,
                    name: 'resources/fonts/[hash].[ext]',
                    publicPath: '../../',
                    mimetype: 'application/vnd.ms-fontobject'
                }
            },
            {
                test: /\.otf$/,
                loader: 'url-loader',
                query: {
                    limit: 65000,
                    name: 'resources/fonts/[hash].[ext]',
                    publicPath: '../../',
                    mimetype: 'application/octet-stream'
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "src"),
        headers: { "Access-Control-Allow-Origin": "*" },
        compress: true,
        hot: true,
        open: true,
        port: 3000,
        disableHostCheck: true,
        stats: 'normal'
    },
    resolve: {
        alias: {
            
        }
    },
    plugins: [
        // Injects bundles in your index.html instead of wiring all manually.
        // It also adds hash to all injected assets so we don't have problems
        // with cache purging during deployment.
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'body'
        }),

        new ExtractTextPlugin({
            filename: 'resources/css/[name].css',
            disable: !isProd,
            allChunks: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),

        // Automatically move all modules defined outside of application directory to vendor bundle.
        // If you are using more complicated project structure, consider to specify common chunks manually.
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'resources/js/[name].js',
            minChunks: function (module) {
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),

        new CopyWebpackPlugin([

            { from: 'src/resources/', to: 'resources/' }          

        ])

    ]
};