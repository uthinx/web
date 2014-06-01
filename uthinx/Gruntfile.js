// Generated on 2014-05-21 using generator-webapp 0.4.9
'use strict';
var cordova = require('cordova');

module.exports = function (grunt) {
    "use strict";

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    // Configurable paths
    var aws = grunt.file.readJSON('aws-keys.json'), // Read the file
        config = {
            app: 'app',
            dist: '../www'
        },
    // Define the configuration for all the tasks
        cordovaConfig = {
            platform: grunt.option('platform')
        };

    grunt.initConfig({
        // Project settings
        config: config,
        // Watches files for changes and runs tasks based on the changed files
        // Wipe out previous builds and test reporting.
        aws_s3: {
            options: {
                accessKeyId: aws.AWSAccessKeyId, // Use the variables
                secretAccessKey: aws.AWSSecretKey, // You can also use env variables
                region: 'us-west-2',
                uploadConcurrency: 5, // 5 simultaneous uploads
                downloadConcurrency: 5 // 5 simultaneous downloads
            },
            production: {
                options: {
                    bucket: 'uthinx/apps/settings'
                },
                files: [
                    { expand: true, cwd: 'dist/app/js', src: ['**'], dest: 'app'}
                ]
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: "uthinx.templates"
                },
                files: {
                    "vendor/bower/uthinx/thinx.templates.js": ["app/templates/*.hbs"]
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "app/css/uthinx-bootstrap.css": "vendor/bower/bootstrap/less/bootstrap.less"
                }
            }
            /*,
             production: {
             options: {
             paths: ["assets/css"],
             cleancss: true,
             modifyVars: {
             imgPath: '"http://mycdn.com/path/to/images"',
             bgColor: 'red'
             }
             },
             files: {
             "path/to/result.css": "path/to/source.less"
             }
             }*/
        },
        watch: {
            cordova: {
                files: [
                    '<%= uthinx.app %>/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '{.tmp,<%= uthinx.app %>}/scripts/{,*/}*.js',
                    '<%= uthinx.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: ['copy:auto', 'cordova-prepare']
            },
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            js: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= config.app %>/images/{,*/}*'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    open: false,
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    base: '<%= config.dist %>',
                    livereload: false
                }
            }
        },
        // Run your source code through JSHint's defaults.
        //jshint: ["app/**/*.js"],
        // Empties folders to start fresh
        clean: {
            options: {
                force: true
            },
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= config.dist %>/*',
                            '!<%= config.dist %>/.git*'
                        ]
                    }
                ]
            },
            app: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            'app/js/*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },
        // Make sure code styles are up to par and there are no obvious mistakes
        // Run your source code through JSHint's defaults.
        jshint: ["app/**/*.js"],

        //jshint: {
        //    options: {
        //        jshintrc: '.jshintrc',
        //        reporter: require('jshint-stylish')
        //    },
        //    all: [
        //        'Gruntfile.js',
        //        '<%= config.app %>/scripts/{,*/}*.js',
        //        '!<%= config.app %>/scripts/vendor/*',
        //        'test/spec/{,*/}*.js'
        //    ]
        //},

        // Mocha testing framework configuration options
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        },

        // Automatically inject Bower components into the HTML file
        bowerInstall: {
            app: {
                src: ['<%= config.app %>/index.html'],
                exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '<%= config.dist %>/images/{,*/}*.*',
                        '<%= config.dist %>/styles/fonts/{,*/}*.*',
                        '<%= config.dist %>/*.{ico,png}'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/images',
                        src: '{,*/}*.{gif,jpeg,jpg,png}',
                        dest: '<%= config.dist %>/images'
                    }
                ]
            }
        },

        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= config.dist %>/images'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.dist %>',
                        src: '{,*/}*.html',
                        dest: '<%= config.dist %>'
                    }
                ]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //     dist: {
        //         files: {
        //             '<%= config.dist %>/styles/main.css': [
        //                 '.tmp/styles/{,*/}*.css',
        //                 '<%= config.app %>/styles/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },
        // uglify: {
        //     dist: {
        //         files: {
        //             '<%= config.dist %>/scripts/scripts.js': [
        //                 '<%= config.dist %>/scripts/scripts.js'
        //             ]
        //         }
        //     }
        // },
        // concat: {
        //     dist: {}
        // },
        uglify: {
            my_target: {
                files: {
                    'vendor/bower/uthinx/uthinx.min.js': ['vendor/bower/uthinx/thinx.ajax.js', 'vendor/bower/uthinx/uthinx.utils.js','vendor/bower/uthinx/uthinx.events.js', 'vendor/bower/uthinx/uthinx.templates.js'],
                    'vendor/bower/jquery/jquery.all.min.js' : ["vendor/bower/jquery/jquery.min.js", "vendor/bower/jquery/plugins/jquery.viewport.js", "vendor/bower/nanoscroller/bin/javascripts/jquery.nanoscroller.js"]
                }
            }
        },
        // Copies remaining files to places other tasks can use
        copy: {
            /*
            auto: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= uthinx.app %>',
                        dest: '<%= uthinx.dist %>',
                        src: [
                            '{,* /}*.*'
                        ]
                    }
                ]
            },
            */
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>',
                        dest: '<%= config.dist %>',
                        src: [
                            '*.{ico,png,txt,xml}',
                            '.htaccess',
                            'img/{,*/}*.webp',
                            '{,*/}*.html',
                            'res/*',
                            'js/*',
                            'css/uthinx.min.css',
                            'fonts/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: ['fonts/*.*'],
                        dest: '<%= config.dist %>'
                    }
                ]
            }
            /*,
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,* /}*.css'
            }
            */
        },
        /*
         // Move vendor and app logic during a build.
         copy: {
         release: {
         files: [
         {
         src: ["app/**"],
         dest: "dist/"
         },
         {
         src: "vendor/**",
         dest: "dist/"
         }
         ]
         }
         },
         */
        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },
        // This task uses James Burke's excellent r.js AMD builder to take all
        // modules and concatenate them into a single file.
        requirejs: {
            release: {
                options: {
                    mainConfigFile: "app/config.js",
                    generateSourceMaps: false,
                    include: ["main"],
                    insertRequire: ["main"],
                    out: "app/js/uthinx.min.js",
                    optimize: "uglify2",

                    // Since we bootstrap with nested `require` calls this option allows
                    // R.js to find them.
                    findNestedDependencies: true,

                    // Include a minimal AMD implementation shim.
                    name: "almond",

                    // Setting the base url to the distribution directory allows the
                    // Uglify minification process to correctly map paths for Source
                    // Maps.
                    baseUrl: "app",

                    // Wrap everything in an IIFE.
                    wrap: true,

                    // Do not preserve any license comments when working with source
                    // maps.  These options are incompatible.
                    preserveLicenseComments: false
                }
            }
        },

        // This task simplifies working with CSS inside Backbone Boilerplate
        // projects.  Instead of manually specifying your stylesheets inside the
        // HTML, you can use `@imports` and this task will concatenate only those
        // paths.
        styles: {
            // Out the concatenated contents of the following styles into the below
            // development file path.
            "dist/styles.css": {
                // Point this to where your `index.css` file is location.
                src: "app/styles/index.css",

                // The relative path to use for the @imports.
                paths: ["app/styles"],

                // Rewrite image paths during release to be relative to the `img`
                // directory.
                forceRelative: "/app/img/"
            }
        },

        // Minfiy the distribution CSS.
        cssmin: {
            release: {
                files: {
                    "app/css/uthinx.min.css": ["app/css/uthinx-bootstrap.css"]
                }
            }
        },

        server: {
            options: {
                host: "0.0.0.0",
                port: 8000
            },

            development: {},

            release: {
                options: {
                    prefix: "dist"
                }
            },

            test: {
                options: {
                    forever: false,
                    port: 8001
                }
            }
        },

        processhtml: {
            release: {
                files: {
                    "dist/index.html": ["index.html"]
                }
            }
        },
        //
        compress: {
            release: {
                options: {
                    archive: "dist/source.min.js.gz"
                },

                files: ["dist/source.min.js"]
            }
        },

        // Unit testing is provided by Karma.  Change the two commented locations
        // below to either: mocha, jasmine, or qunit.
        karma: {
            options: {
                basePath: process.cwd(),
                singleRun: true,
                captureTimeout: 7000,
                autoWatch: true,

                reporters: ["progress", "coverage"],
                browsers: ["PhantomJS"],

                // Change this to the framework you want to use.
                frameworks: ["jasmine"],

                plugins: [
                    "karma-jasmine",
                    "karma-mocha",
                    "karma-qunit",
                    "karma-phantomjs-launcher",
                    "karma-coverage"
                ],

                preprocessors: {
                    "app/**/*.js": "coverage"
                },

                coverageReporter: {
                    type: "lcov",
                    dir: "test/coverage"
                },

                files: [
                    // You can optionally remove this or swap out for a different expect.
                    "vendor/bower/chai/chai.js",
                    "vendor/bower/requirejs/require.js",
                    "test/runner.js",

                    {
                        pattern: "app/**/*.*",
                        included: false
                    },
                    // Derives test framework from Karma configuration.
                    {
                        pattern: "test/<%= karma.options.frameworks[0] %>/**/*.spec.js",
                        included: false
                    },
                    {
                        pattern: "vendor/**/*.js",
                        included: false
                    }
                ]
            },

            // This creates a server that will automatically run your tests when you
            // save a file and display results in the terminal.
            daemon: {
                options: {
                    singleRun: false
                }
            },

            // This is useful for running the tests just once.
            run: {
                options: {
                    singleRun: true
                }
            }
        },

        coveralls: {
            options: {
                coverage_dir: "test/coverage/PhantomJS 1.9.2 (Linux)/"
            }
        }
    });

    grunt.loadNpmTasks("grunt-karma");
    grunt.loadNpmTasks('grunt-aws-s3');
    grunt.loadNpmTasks("grunt-bbb-server");
    grunt.loadNpmTasks("grunt-bbb-styles");
    grunt.loadNpmTasks("grunt-processhtml");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-bbb-requirejs");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-karma-coveralls");
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    // start of the cordova Grunt task
    grunt.registerTask('buildweb', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('cordova-prepare', 'Prepare the native application', function () {
        var done = this.async();

        if (cordovaConfig.platform === null) {
            // Build all platforms
            cordova.prepare(done);
        } else {
            cordova.prepare(cordovaConfig.platform, done);
        }
    });

    grunt.registerTask('cordova-build', 'Build the native application', function () {
        var done = this.async();

        if (cordovaConfig.platform === null) {
            // Build all platforms
            cordova.build(done);
        } else {
            cordova.build(cordovaConfig.platform, done);
        }
    });

    grunt.registerTask('cordova-emulate', 'Emulate the application', function () {
        var done = this.async();

        if (cordovaConfig.platform === null) {
            // Build all platforms
            cordova.emulate(done);
        } else {
            cordova.emulate(cordovaConfig.platform, done);
        }
    });

    grunt.registerTask('build', [
        'buildweb',
        'cordova-build'
    ]);

    grunt.registerTask('emulate', [
        'build',
        'cordova-emulate'
    ]);

    grunt.registerTask('cordova-run', 'Run the application on a device', function () {
        var done = this.async();

        if (cordovaConfig.platform === null) {
            // Build all platforms
            cordova.run(done);
        } else {
            cordova.run(cordovaConfig.platform, done);
        }
    });

    grunt.registerTask('run', [
        'build',
        'cordova-run'
    ]);

    // Create an aliased test task.
    grunt.registerTask("test", ["karma:run"]);

    // When running the default Grunt command, just lint the code.
    grunt.registerTask("defaultWeb", [
        "clean",
        "jshint",
        "processhtml",
        "copy",
        "requirejs",
        "styles",
        "cssmin"
    ]);

    grunt.registerTask('defaultApp', [
        'newer:jshint',
        'test',
        'build'
    ]);
    // send to aws
    grunt.registerTask("aws", ["aws_s3"]);
    //
    grunt.registerTask("wwwcopy", ["copy"]);
    //just run the linter on all fiiles
    grunt.registerTask("hint", ["jshint"]);
    //make the dis file so can be tested locally in browser
    grunt.registerTask("require", ["requirejs"]);
    //less and compress the css
    grunt.registerTask("cssall", ["less", "cssmin"]);
    //
    grunt.registerTask("uthinxjs", ["clean:app","handlebars", "uglify","requirejs"]);
};