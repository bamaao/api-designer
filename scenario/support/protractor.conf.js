exports.config = {


  capabilities: {
    'browserName': 'chrome'
  },

  seleniumServerJar: './selenium/selenium-server-standalone-2.35.0.jar',
  chromeDriver: './selenium/chromedriver',

  baseUrl: 'https://ramltooling:ram10ve@j0hnqa.mulesoft.org/',

  specs: [
    '../test/e2e/editor-shelf/resource/resource-methods.js',
    '../test/e2e/editor-shelf/resource-types/rt-methods.js',
    '../test/e2e/editor-shelf/resource/resource-root.js',
    '../test/e2e/editor-shelf/resource-types/rt-root.js',
    '../test/e2e/editor-shelf/root.js',
    '../test/e2e/editor-shelf/traits.js',
    '../test/e2e/editor-parser.js' ,
    '../test/lib/*.js'
  ],

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 15000,
    onComplete: null,
    isVerbose: true,
    includeStackTrace: true

  }
};
