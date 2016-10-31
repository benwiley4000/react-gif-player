var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var portfinder = require('portfinder');
var opn = require('opn');

var argv = require('minimist')(process.argv.slice(2));

var config = require('./webpack.config.js');

function getPort (callback) {
  if (argv.port) {
    return callback(void 0, argv.port);
  }
  portfinder.basePort = 8080;
  portfinder.getPort(callback);
}

function listen (callback) {
  getPort(function (err, port) {
    if (err) {
      return callback(err);
    }
    var url = 'http://localhost:' + port;
    var devConfig = Object.assign({}, config, {
      entry: [
        'webpack-dev-server/client?' + url
      ].concat(config.entry)
    });
    var server = new WebpackDevServer(webpack(devConfig), {
      staticOptions: { index: 'example.html' },
      stats: { colors: true },
      publicPath: config.output.publicPath
    });
    server.listen(port, 'localhost', function (err) {
      callback(err, url);
    });
  });
}

listen(function (err, url) {
  if (err) {
    throw err;
  }
  opn(url);
});
