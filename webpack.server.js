const path = require('path');
const webpack = require('webpack');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const serverDistPath = path.resolve(__dirname, 'dist/server');
const clientPath = path.resolve(__dirname, 'src');
console.log(`distPath: ${nodeModulesPath}`);
console.log(`clientPath: ${clientPath}`);
module.exports = {
    name: 'Server',
    entry: {
        app: './server/server.ts',
    },
    target: 'node',
    output: {
        path: serverDistPath,
        filename: '[name].server.js'
    },
  resolve: {
    extensions: ['.ts', '.js','.json']
  },
/*    externals: [
        nodeExternals()
    ],*/
    plugins: [
        new webpack.IgnorePlugin(/\.(css|less)$/),
        // new webpack.BannerPlugin({banner: 'require("source-map-support").install();', raw: true, entryOnly: false})
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                exclude: [/node_modules/, clientPath],
                options: {
                    configFile: './tslint.json',
                    failOnHint: false,
                    tsConfigFile: './server/tsconfig.server.json',
                    typeCheck: true
                },
            },
            {
                test: /.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: [/node_modules/, clientPath],
                options: {
                    configFileName: './server/tsconfig.server.json'
                }
            }
        ]
    },
    devtool: 'sourcemap'
};
