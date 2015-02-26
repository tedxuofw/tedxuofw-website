// Generated on 2014-07-08 using generator-jekyllrb 1.2.1
'use strict';

// Directory reference:
//   css: _assets/css
//   compass: _assets/scss
//   javascript: _assets/javascript
//   images: _assets/media
//   fonts: _assets/fonts

module.exports = function (grunt) {
  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Rewrite urls to handle missing .html
  var rewriteModule = require('http-rewrite-middleware');
  
  var middlewareFunc = function(connect, options) {
    var middlewares = [];
    middlewares.push(rewriteModule.getMiddleware([
      {
        from: '^(\/)$',
        to: '$1'
      },
      {
        from: '^([^\.]+?)\/?$',
        to: '$1.html'
      }
    ]));
    
    if (!Array.isArray(options.base)) {
      options.base = [options.base];
    }
    
    var directory = options.directory || options.base[options.base.length - 1];
    options.base.forEach(function (base) {
      middlewares.push(connect.static(base));
    });
    
    middlewares.push(connect.directory(directory));
    return middlewares;
  };
  
  
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);
  // Speedup
  //require('jit-grunt')(grunt);

  grunt.initConfig({
    // Configurable paths
    yeoman: {
      app: 'app',
      dist: 'dist'
    },
    watch: {
      options: {
        spawn: false
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      compass: {
        files: [
            '<%= yeoman.app %>/_assets/scss/**/*.{scss,sass}',
            '<%= yeoman.app %>/_bower_components/bootstrap-sass-official/assets/stylesheets/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer:server']
      },
      css: {
        files: ['<% yeoman.app %>/_assets/css/**/*.css']
      },
      autoprefixer: {
        files: ['<%= yeoman.app %>/_assets/css/**/*.css'],
        tasks: ['copy:stageCss', 'autoprefixer:server']
      },
      jekyll: {
        files: [
          '<%= yeoman.app %>/**/*.{html,yml,md,mkd,markdown}',
          '!<%= yeoman.app %>/_bower_components/**/*'
        ],
        tasks: ['jekyll:server']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.jekyll/**/*.html',
          '.tmp/_assets/css/**/*.css',
          '{.tmp,<%= yeoman.app %>}/<%= js %>/**/*.js',
          '<%= yeoman.app %>/_assets/media/**/*.{gif,jpg,jpeg,png,svg,webp}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '.jekyll',
            '<%= yeoman.app %>'
          ],
          middleware: middlewareFunc
        }
      },
      dist: {
        options: {
          open: true,
          base: [
            '<%= yeoman.dist %>'
          ],
          middleware: middlewareFunc
        }
      },
      test: {
        options: {
          base: [
            '.tmp',
            '.jekyll',
            'test',
            '<%= yeoman.app %>'
          ],
          middleware: middlewareFunc
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.dist %>/*',
            // Running Jekyll also cleans the target directory.  Exclude any
            // non-standard `keep_files` here (e.g., the generated files
            // directory from Jekyll Picture Tag).
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: [
        '.tmp',
        '.jekyll'
      ]
    },
    compass: {
      options: {
        // If you're using global Sass gems, require them here.
        // require: ['singularity', 'jacket'],
        bundleExec: true,
        sassDir: '<%= yeoman.app %>/_assets/scss',
        cssDir: '.tmp/_assets/css',
        imagesDir: '<%= yeoman.app %>/_assets/media',
        javascriptsDir: '<%= yeoman.app %>/_assets/javascript',
        importPath: '<%= yeoman.app %>/_bower_components/',
        relativeAssets: false,
        httpImagesPath: '/_assets/media',
        httpGeneratedImagesPath: '/_assets/media/generated',
        outputStyle: 'expanded',
        raw: 'extensions_dir = "<%= yeoman.app %>/_bower_components"\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/_assets/media/generated'
        }
      },
      server: {
        options: {
          debugInfo: true,
          generatedImagesDir: '.tmp/_assets/media/generated'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/_assets/css',
          src: '**/*.css',
          dest: '<%= yeoman.dist %>/_assets/css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '.tmp/_assets/css',
          src: '**/*.css',
          dest: '.tmp/_assets/css'
        }]
      }
    },
    uncss: {
      dist: {
        options: {
          ignore: ['.collapse', '.collapsing', '.collapse.in'],
          csspath: '../.tmp',
          stylesheets: ['../.tmp/_assets/css/main.css']
        },
        files: {
          '.tmp/_assets/css/main.css': ['<%= yeoman.dist %>/**/*.html']
        }
      }
    },
    wiredep: {
      options: {
        
      },
      app: {
        src: ['<%= yeoman.app%>/_layouts/*.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['<%= yeoman.app%>/_assets/scss/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },
    jekyll: {
      options: {
        //bundleExec: true,
        config: '_config.yml,_config.build.yml',
        src: '<%= yeoman.app %>'
      },
      dist: {
        options: {
          dest: '<%= yeoman.dist %>',
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.dist %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },
    usemin: {
      options: {
        assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/_assets']
      },
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/_assets/css/**/*.css']
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Usemin adds files to concat
    //concat: {},
    // Usemin adds files to uglify
    //uglify: {},
    // Usemin adds files to cssmin
    cssmin: {
      dist: {
        options: {
          check: 'gzip'
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.{jpg,jpeg,png}',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            src: [
              // Jekyll processes and moves HTML and text files.
              // Usemin moves CSS and javascript inside of Usemin blocks.
              // Copy moves asset files and directories.
              '_assets/media/**/*',
              '_assets/fonts/**/*',
              // Like Jekyll, exclude files & folders prefixed with an underscore.
              //'!**/_*{,/**}',
              // Explicitly add any files your site needs for distribution here.
              //'_bower_components/jquery/jquery.js',
              //'favicon.ico',
              //'apple-touch*.png'
            ],
            dest: '<%= yeoman.dist %>'
          },
          {
            expand: true,
            flatten: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            src: [
              '_bower_components/bootstrap-sass-official/assets/fonts/**/*'
            ],
            dest: '<%= yeoman.dist %>/_assets/css/bootstrap'
          }
        ]
      },
      server: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            src: [
              // Jekyll processes and moves HTML and text files.
              // Usemin moves CSS and javascript inside of Usemin blocks.
              // Copy moves asset files and directories.
              '_assets/media/**/*',
              '_assets/fonts/**/*',
              // Like Jekyll, exclude files & folders prefixed with an underscore.
              //'!**/_*{,/**}',
              // Explicitly add any files your site needs for distribution here.
              //'_bower_components/jquery/jquery.js',
              //'favicon.ico',
              //'apple-touch*.png'
            ],
            dest: '.tmp'
          },
          {
            expand: true,
            flatten: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            src: [
              '_bower_components/bootstrap-sass-official/assets/fonts/**/*'
            ],
            dest: '.tmp/_assets/css/bootstrap'
          }
        ]
      },
      // Copy CSS into .tmp directory for Autoprefixer processing
      stageCss: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>/_assets/css',
            src: '**/*.css',
            dest: '.tmp/_assets/css'
          }
        ]
      }
    },
    filerev: {
      options: {
        length: 4
      },
      dist: {
        files: [{
          src: [
            '<%= yeoman.dist %>/_assets/javascript/**/*.js',
            '<%= yeoman.dist %>/_assets/css/**/*.css',
            '<%= yeoman.dist %>/_assets/media/**/*.{gif,jpg,jpeg,png,svg,webp}',
            '<%= yeoman.dist %>/_assets/fonts/**/*.{eot*,otf,svg,ttf,woff}'
          ]
        }]
      }
    },
    buildcontrol: {
      dist: {
        options: {
          remote: '../',
          branch: 'gh-pages',
          commit: true,
          push: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/_assets/javascript/**/*.js',
        'test/spec/**/*.js'
      ]
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      check: {
        src: [
          '<%= yeoman.app %>/_assets/css/**/*.css',
          '<%= yeoman.app %>/_assets/scss/**/*.scss'
        ]
      }
    },
    concurrent: {
      server: [
        'compass:server',
        'copy:server',
        'jekyll:server'
      ],
      dist: [
        'compass:dist',
        'copy:dist'
      ]
    },
    replace: {
      dist: {
        src: ['<%= yeoman.dist %>/_assets/css/*.css'],
        overwrite: true,                 // overwrite matched source files
        replacements: [
          {
            from: '/_bower_components/bootstrap-sass-official/assets/fonts/bootstrap/',
            to: '/_assets/css/bootstrap/'
          }
        ]
      }
    },
    notify: {
      server: {
        options: {
          title: 'Watch Complete',
          message: 'Ready to go!'
        }
      },
      dist: {
        options: {
          title: 'Finished Building',
          message: 'Ready to deploy!'
        }
      }
    }
  });

  // Define Tasks
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'notify:server',
      'watch'
    ]);
  });

  // No real tests yet. Add your own.
  grunt.registerTask('test', [
  //   'clean:server',
  //   'concurrent:test',
  //   'connect:test'
  ]);

  grunt.registerTask('check', [
    'clean:server',
    'jekyll:check',
    'compass:server',
    'jshint:all',
    'csslint:check'
  ]);

  grunt.registerTask('build', [
    'clean',
    // Jekyll cleans files from the target directory, so must run first
    'jekyll:dist',
    'wiredep',
    'concurrent:dist',
    'useminPrepare',
    'concat',
    'autoprefixer:dist',
    'uncss',
    'cssmin',
    'uglify',
    'imagemin',
    'svgmin',
    'filerev',
    'usemin',
    'replace:dist',
    'htmlmin',
    'notify:dist'
    ]);

  grunt.registerTask('deploy', [
    'check',
    'test',
    'build',
    'buildcontrol'
    ]);

  grunt.registerTask('default', [
    'check',
    'test',
    'build'
  ]);
};
