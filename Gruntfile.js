module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  grunt.initConfig({
    eslint: {
      options: {
        configFile: '.eslintrc.json'
      },
      target: ['lib/**/*.js', 'test/**/*.js', '!test/lib/feedhenry.js']
    }
  });

  grunt.registerTask('test', ['eslint']);
};