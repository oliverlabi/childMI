const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (env) => ({
    mode: env.NODE_ENV === "development" ? "development" : "production",
    entry: path.resolve(__dirname, './src/index.tsx'),

    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            plugins: [(env.NODE_ENV === "development") && require.resolve('react-refresh/babel')].filter(Boolean),
                        },
                    },
                ],
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                data: '@import "styles/global.scss";',
                                includePaths: [__dirname, 'src']
                            }
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [(env.NODE_ENV === "development" ? "development" : "production") && new ReactRefreshWebpackPlugin()].filter(Boolean),

    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': path.join(__dirname, 'src'),
        }
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: "/"
    },

    devtool: env.NODE_ENV === "development" ? 'inline-source-map' : false,

    devServer: env.NODE_ENV === "development" ? {
        hot: true,
        static: path.resolve(__dirname, './dist'),
        historyApiFallback: true,
        host: "dev-childmi.ee",
        port: 49501,
    } : {},
});