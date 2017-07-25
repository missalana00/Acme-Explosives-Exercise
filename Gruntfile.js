module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      js: {
          src: ['xjs/main.js'],
          dest: 'dist/app.js'
      }
    },
    jshint: {
      options: {
        predef: [ "document", "console" ],
        esnext: true,
        globalstrict: true,
        globals: {},
        browserify: true
      },
      files: ['js/**/*.js']
    },
    sass: {
      dist: {
        files: {
          'css/main.css': '../sass/main.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      javascripts: {
        files: ['js/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'browserify', 'watch']);
};