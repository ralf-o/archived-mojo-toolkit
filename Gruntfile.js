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
    mochacli: {
        options: {
            harmony: true,
            require: [],
            reporter: 'nyan',
            bail: true
        },
        all: ['specs/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-traceur');
  grunt.loadNpmTasks('grunt-mocha-cli');
  
  // Default task.
  grunt.registerTask('default', ["traceur", "mochacli"]);
};
