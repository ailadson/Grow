var path = require('path');

 module.exports = {
     entry: './frontend/game.js',
     output: {
         path: path.join(__dirname, 'app', 'assets', 'javascripts'),
         filename: 'bundle.js'
     },
     module: {
         loaders: [
             { test: path.join(__dirname, 'es6'),
               loader: 'babel-loader' }
         ]
     }
 };
