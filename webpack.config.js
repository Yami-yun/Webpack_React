const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// node.js에서 export 방식
module.exports = {
    mode: 'development',
    entry: './src/index.js',              // 번들하기 위한 모듈의 최초 진입점 설정
    output: {                             // 웹팩의 결과를 반환 설정
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    module: {                             // loader 설정, babel, css, image, 파일들을 번들시킬 수 있다.
        rules: [
            {
                test: /\.(js|jsx)$/,            // .js, .jsx 확장자 대상으로 loader실행
                exclude: /node_module/,   // node module 폴더 제외
                use:{
                    loader: 'babel-loader'   // babel loader를 실행
                },
            },

            {
                test: /\.(png|jpg|gif)$/i,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]',
                    publicPath: './dist/',
                },
            },

            {
                test: /\.css$/,
                use:[MiniCssExtractPlugin.loader, "css-loader"],
            }

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({ filename: 'test.css' }),
    ]

}