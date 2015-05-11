module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    traceur: {
      options: {
        // traceur options here
        experimental: true,
        // module naming options,
        modules: 'inline',
                  "inline": 'src/mojo-toolkit.js',
        "out": 'target/mojo-toolkit-compiled.js',

        moduleNaming: {
          //stripPrefix: "src/es6",
          //addPrefix: "com/mycompany/project"
        },
        copyRuntime: "target"
      }
    },
    babel: {
        options: {
            sourceMap: true,
            modules: 'common',
            retainLines: true
        },
        dist: {
            files: [{
                expand: true,
                cwd: 'src',
                src: ['**/*.js'],
                dest: 'target/commonjs/src',
                ext: '.js'
            },
            {
                expand: true,
                cwd: 'specs',
                src: ['**/*.js'],
                dest: 'target/commonjs/specs',
                ext: '.js'
            }]
        }
    },
    mochaTest: {
        test: {
            options: {
                reporter: 'spec',
                require: 'node_modules/grunt-babel/node_modules/babel-core/node_modules/regenerator/runtime.js',
                bail: true
            },
            src: ['target/commonjs/specs/**/*.js']
        }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-babel');
  //grunt.loadNpmTasks('grunt-traceur');
  // Default task.
  grunt.registerTask('test', ["babel", "mochaTest"]);
  grunt.registerTask('default', ["babel", "test"]);
};
