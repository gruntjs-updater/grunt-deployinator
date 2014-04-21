/*
 * grunt-deployinator
 * https://github.com/istvan-antal/grunt-deployinator
 *
 * Copyright (c) 2014 István Miklós Antal
 * Licensed under the MIT license.
 */
module.exports = function (grunt) {
    'use strict';
    var jsHintOptions;
    
    jsHintOptions = {
        bitwise: true,
        curly: true,
        camelcase: true,
        eqeqeq: true,
        freeze: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        forin: true,
        sub: true,
        undef: true,
        unused: true,
        noempty: true,
        boss: false,
        eqnull: true,
        browser: true,
        indent: 4,
        maxcomplexity: 7,
        maxstatements: 36,
        maxparams: 5,
        maxdepth: 3,
        maxlen: 100,
        trailing: true,
        maxerr: 5,
        globals: {
            module: true,
            require: true,
            exports: true,
            grunt: true,
            describe: true,
            it: true
        }
    };
    
    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'spec/*.js'
            ],
            options: jsHintOptions,
        },
        clean: {
            coverage: {
                src: ['coverage/']
            }
        },
        copy: {
            coverage: {
                src: ['spec/**'],
                dest: 'coverage/'
            }
        },
        instrument: {
            files: 'lib/*.js',
            options: {
                lazy: true,
                basePath: 'coverage/'
            }
        },
        mochaTest: {
            all: {
                options: {
                    reporter: 'spec'
                },
                src: ['coverage/spec/*.js']
            }
        },
        storeCoverage: {
            options: {
                dir: 'coverage/reports'
            }
        },
        coverage: {
            options: {
                thresholds: {
                    'statements': 100,
                    'branches': 100,
                    'lines': 100,
                    'functions': 100
                },
                dir: 'coverage/reports',
                root: '.'
            }
        },
        makeReport: {
            src: 'coverage/reports/**/*.json',
            options: {
                type: 'lcov',
                dir: 'coverage/reports',
                print: 'detail'
            }
        }
    });
    
    grunt.loadTasks('tasks');
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-istanbul-coverage');

    grunt.registerTask('test',
        ['clean', 'instrument', 'copy', 'mochaTest', 'storeCoverage', 'makeReport', 'coverage']
    );
    
    grunt.registerTask('check', ['jshint', 'test']);
    
    grunt.registerTask('default', ['jshint', 'test']);
};
