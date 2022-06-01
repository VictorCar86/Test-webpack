const path = require('path'); // Para trabajar con archivos y rutas de directorios
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const Dotenv = require("dotenv-webpack")

module.exports = {
    // mode: 'production', // le pasamos explicitamente el modo desde el archivo
    entry: './src/index.js', // el punto de entrada de mi aplicación
    output: { // Esta es la salida de mi bundle
        path: path.resolve(__dirname, 'dist'),
        // resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo
        // para no tener conflictos entre Linux, Windows, etc
        filename: '[name].[contenthash].js',
        // El nombre del archivo final
        assetModuleFilename: "assets/images/[hash][ext][query]",
        clean: true
    },
    mode: "production",
    resolve: {
        extensions: ['.js'], // Las extensiones que Webpack va a leer
        alias: {
            "@utils": path.resolve(__dirname, "src/utils/"),
            "@templates": path.resolve(__dirname, "src/templates/"),
            "@styles": path.resolve(__dirname, "src/styles/"),
            "@images": path.resolve(__dirname, "src/assets/images/")
        }
    },
    module: {
    // Reglar para trabajar con Webpack
        rules : [
            {
                test: /\.m?js$/, // Lee los archivos con extensión .js
                exclude: /node_modules/, // Ignora los módulos de la carpeta
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i, // Lee los archivos con extensión .css
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "stylus-loader"
                ]
            },
            {
                test: /\.png/,
                type: "asset/resource"
            },
            {
                test: /\.(woff|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[hash][ext]"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "assets/[name].[contenthash].css"
        }),
        new Dotenv()
    ],
    optimization: {
        minimize: true,
        minimizer : [new CssMinimizerPlugin()]
    }
}