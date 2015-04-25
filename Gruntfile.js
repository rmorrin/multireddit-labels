'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    jshint: {
      // specify files
      files: ['app/script.js'],
      // standard jshint options
      // see: http://jshint.com/docs/
      options: {
        node: true,
        browser: true,
        bitwise: true,
        camelcase: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        quotmark: 'single',
        regexp: true,
        undef: true,
        unused: true,
        strict: true,
        globalstrict: false,
        trailing: true,
        smarttabs: true,
        globals : {
          jQuery: true
        }
      }
    },

    watch: {
      scripts: {
        files: ['app/script.js'],
        tasks: ['jshint'],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

};
