'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'public/stylesheets',
          cssDir: 'public/stylesheets',
          outputStyle: 'compressed'
        }
      }
    },
    watch: {
      css: {
        files: 'public/stylesheets/*.scss',
        tasks: ['compass']
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['compass', 'concurrent']);
};