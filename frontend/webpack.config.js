const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = true;

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
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
                            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
                        },
                    },
                ],
            }
        ]
    },
    plugins: [isDevelopment && new ReactRefreshWebpackPlugin()].filter(Boolean),

    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    },

    devServer: {
        hot: true,
        static: path.resolve(__dirname, './build'),
    },
};