module.exports = config =>
  config.set({
    singleRun: true,
    frameworks: ['mocha', 'chai', 'browserify'],
    files: ['test/**/*.js'],
    colors: true,
    browsers: ['FirefoxDeveloperHeadless'],
    preprocessors: {
      'test/**/*.js': [ 'browserify' ]
    },
    browserify: {
      debug: true,
      transform: [ ['babelify', {presets: ['es2015']}] ]
    }
  })
