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
    mochaTest: {
        test: {
        options: {
            es_staging: true,
            harmony: true,
            harmony_shipping: true,
            harmony_rest_parametersx: true,
            harmony_arrow_functions: true,
            
            require: [],
            reporter: 'spec',
            bail: true
        },
        src: ['specs/**/*.js']
        }
    }
  });

  grunt.loadNpmTasks('grunt-traceur');
    grunt.loadNpmTasks('grunt-mocha-test');
  // Default task.
  grunt.registerTask('default', ["mochaTest"]);
};
