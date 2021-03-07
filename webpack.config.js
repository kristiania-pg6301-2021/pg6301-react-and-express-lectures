const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        contentBase: './public'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    optimization: {
        /*
            This is done to avoid creation of unwanted license file for the dependencies
         */
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false,
        })]
    }
};