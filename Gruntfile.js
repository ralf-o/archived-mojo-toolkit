module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: {
                src: ["build/*", "dist/v<%= pkg.version %>"],
            }
        },
        babel: {
            options: {
                modules: 'common',
                retainLines: true,
                moduleIds: false
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.js'],
                    dest: 'build/src',
                    ext: '.js'
                },
                {
                    expand: true,
                    cwd: 'specs',
                    src: ['**/*.js'],
                    dest: 'build/specs',
                    ext: '.js'
                }]
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: [
                        'node_modules/grunt-babel/node_modules/babel-core/node_modules/regenerator/runtime.js'
                    ],
                    bail: true
                },
                src: ['build/specs/**/*.js']
            }
        },
        yuidoc: {
            compile: {
               name: '<%= pkg.name %>',
               description: '<%= pkg.description %>',
               version: '<%= pkg.version %>',
               url: '<%= pkg.homepage %>',
               options: {
                   paths: 'src/',
                   outdir: 'dist/v<%= pkg.version %>/docs/api-youidoc/',
                   themedir: 'node_modules/yuidoc-theme-blue/',
                   tabtospace: 4
                }
            }
        },
        jsdoc: {
            dist: {
                src: ['build/src/**/*.js'],
                options: {
                    destination: 'dist/v<%= pkg.version %>/docs/api-jsdoc'
                }
            }
        },
        esdoc : {
            dist : {
                options: {
                    source: 'src/module/',
                    destination: 'dist/v<%= pkg.version %>/docs/api',
                    //autoPrivate: false,
		    title: 'Mojo Toolkit',
                    test: {
                        type: 'mocha',
                        source: './specs',
                        includes: ['\\Spec.js']
                    }
                }
            }
        },
        browserify: {
            js: {
                //extend: true,
                //src: ['build/src/**/*.js'],
                src: 'build/src/mojo.js',
                dest: 'dist/v<%= pkg.version %>/mojo-<%= pkg.version %>.js'
            }
        },
        uglify: {
            options: {
                ASCIIOnly: true,
                banner: '/*\n'
                        + ' <%= pkg.name %> v<%= pkg.version %> - '
                        + '<%= grunt.template.today("yyyy-mm-dd") %>\n'
                        + ' Homepage: <%= pkg.homepage %>\n'
                        + ' Licencse: Apache License, Version 2.0\n'
                        + '*/\n'
            },
            js: {
                src: ['dist/v<%= pkg.version %>/mojo-<%= pkg.version %>.js'],
                dest: 'dist/v<%= pkg.version %>/mojo-<%= pkg.version %>.js'
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                src: ['dist/v<%= pkg.version %>/mojo-<%= pkg.version %>.js'],
                dest: 'dist/v<%= pkg.version %>/mojo-<%= pkg.version %>.js.gz'
            }
        },
        watch: {
            js: {
                options: {
                    spawn: true,
                },
                files: ['src/**/*.js', 'specs/**/*.js'],
                tasks: ['compile', 'mochaTest']
                //tasks: ['esdoc']
            }
        }
    });

    // TODO: This is not really working :-(
    // On watch events, if the changed file is a test file then configure mochaTest to only
    // run the tests from that file. Otherwise run all the tests
    grunt.event.on('watch', function (action, filePath) {
        if (filePath.match('^src/')) {
            grunt.config.set(['mochaTest', 'test', 'src'], 'build/specs/**/*.js');
        } else if (filePath.match('^specs/')) {
            grunt.config.set(['mochaTest', 'test', 'src'], 'build/' + filePath);
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-mocha-test');
    //grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-esdoc');

    grunt.registerTask('compile', ['babel']);
    grunt.registerTask('test', ['babel', 'mochaTest']);
    grunt.registerTask('doc', ['babel', "mochaTest", 'yuidoc']);
    grunt.registerTask('dist', ['clean', "babel", 'mochaTest', /* 'yuidoc', 'jsdoc', */'esdoc', 'browserify', 'uglify', 'compress']);
    grunt.registerTask('default', ['dist']);
};
