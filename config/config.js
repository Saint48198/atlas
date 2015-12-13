var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'nodeplay'
    },
    port: 3000,
    db: 'mongodb://localhost/nodeplay-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'nodeplay'
    },
    port: 3000,
    db: 'mongodb://localhost/nodeplay-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'nodeplay'
    },
    port: 3000,
    db: 'mongodb://localhost/nodeplay-production'
  }
};

module.exports = config[env];
