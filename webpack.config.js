const path = require('path');

module.exports = {
    entry: './demo/src/index.js',
    output: {
        path: path.resolve(__dirname, 'demo/dist'),
        filename: 'demo.bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    resolve: {
        fallback: {
            https: false,
            /**
             * Required by w3c-css-validator
             */
            util: false,
        },
    },
};
