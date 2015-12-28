var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'atlas'
    },
    port: 3000,
    db: 'mongodb://localhost/atlas'
  },

  test: {
    root: rootPath,
    app: {
      name: 'atlas'
    },
    port: 3000,
    db: 'mongodb://localhost/atlas'
  },

  production: {
    root: rootPath,
    app: {
      name: 'atlas'
    },
    port: 3000,
    db: 'mongodb://localhost/atlas'
  }
};

module.exports = config[env];
