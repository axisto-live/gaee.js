'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'gaee.js', 'test/spec/**/*.js']
    },

    mocha: {
      src: ['test/index.html'],
      options: {
        run: true,
        reporter: 'Spec',
        log: true
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      target: {
        files: {
          'gaee.min.js': ['gaee.js'],
          'gaee.jwplayer5.min.js': ['gaee.jwplayer5.js']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'mocha', 'uglify']);
};
